import {Schema, Validator} from "jsonschema";
import {createNanoEvents, Emitter} from "nanoevents";
import {ISessionState} from "./session";

export interface ISessionStateChangeEvents {
    activated: (newSessionData: unknown) => void;
    expired: () => void;
    blocked: () => void;
}

export interface IAuthProtocolEvents extends ISessionStateChangeEvents {
    error: (err: unknown) => void;
}
// TODO: Do we need 2 event interfaces really?

export interface IAuthProtocolContext {
    authProtocolSettings?: unknown;
    selfCredentials: unknown;
    sessionVariables: unknown;
}

export interface IAuthProtocolLogic {
    ensureActiveSession: (context: IAuthProtocolContext, emitter: Emitter<ISessionStateChangeEvents>) => Promise<void>;
    processIncoming: (message: unknown, context: IAuthProtocolContext, emitter: Emitter<ISessionStateChangeEvents>) => Promise<void>;
    processOutgoing: (message: unknown, context: IAuthProtocolContext, emitter: Emitter<ISessionStateChangeEvents>) => Promise<void>;
}

export interface IAuthProtocolSchema {
    settingsSchema?: Schema;
    sessionVariablesSchema?: Schema;
    credentialSchema: Schema;
    // TODO: Credentials also have some expected format
}

export interface IAuthProtocolBundle {
    authProtocolLogic: IAuthProtocolLogic;
    authProtocolSchema: IAuthProtocolSchema;
}

/**
 * To create an AuthProtocol you need 3 things
 * 1. authProtocolSchema
 *      defines settingsSchema: schema for which authProtocolSettings does this authProtocolLogic need for it to run
 *      defines sessionVariableSchema: schema for sessionVariables its capable of producing
 * 2. authProtocolLogic:
 *      defines function which run which run hooks like processIncoming, processOutgoing, ensureActive
 * 3. authProtocolSettings
 */
export class AuthProtocol {
    public readonly authProtocolSchema: IAuthProtocolSchema;
    public readonly authProtocolLogic: IAuthProtocolLogic;
    public readonly authProtocolSettings: unknown;
    private readonly internalEmitter: Emitter<ISessionStateChangeEvents>;
    private readonly externalEmitter: Emitter<IAuthProtocolEvents>;
    private readonly stateChangeEventHandlers: ISessionStateChangeEvents = {
        activated: (newSessionVariables: any) => {
            try {
                this.validateSessionVariables(newSessionVariables);
                this.externalEmitter.emit("activated", newSessionVariables);
            } catch (e) {
                this.externalEmitter.emit("error", e);
            }
        },
        blocked: () => {
            this.externalEmitter.emit("blocked");
        },
        expired: () => {
            this.externalEmitter.emit("expired");
        },
    };
    constructor(authProtocolSchema: IAuthProtocolSchema, authProtocolLogic: IAuthProtocolLogic) {
        this.authProtocolLogic = authProtocolLogic;
        this.authProtocolSchema = authProtocolSchema;
        this.externalEmitter = createNanoEvents<IAuthProtocolEvents>();
        this.internalEmitter = createNanoEvents<ISessionStateChangeEvents>();
        this.internalEmitter.on("activated", this.stateChangeEventHandlers.activated);
        this.internalEmitter.on("blocked", this.stateChangeEventHandlers.blocked);
        this.internalEmitter.on("expired", this.stateChangeEventHandlers.expired);
    }
    public ensureActiveSession = async (sessionVariables: unknown, selfCredentials: unknown, authProtocolSettings?: unknown): Promise<void> => {
        await this.authProtocolLogic.ensureActiveSession(
            this.getContext(selfCredentials, sessionVariables, authProtocolSettings),
            this.internalEmitter,
        );
    }
    public processIncoming = async (message: unknown, sessionVariables: unknown, selfCredentials: unknown, authProtocolSettings?: unknown): Promise<unknown> => {
        return this.authProtocolLogic.processIncoming(
            message,
            this.getContext(selfCredentials, sessionVariables, authProtocolSettings),
            this.internalEmitter,
        );
    }
    public processOutgoing = async (message: unknown, sessionVariables: unknown, selfCredentials: unknown, authProtocolSettings?: unknown): Promise<unknown> => {
        return this.authProtocolLogic.processOutgoing(
            message,
            this.getContext(selfCredentials, sessionVariables, authProtocolSettings),
            this.internalEmitter,
        );
    }
    public on = <E extends keyof IAuthProtocolEvents>(event: E, callback: IAuthProtocolEvents[E]) => {
        return this.externalEmitter.on(event, callback);
    }

    public validateCredentials = (credentials: unknown) => {
        const v = new Validator();
        if (!credentials) {
            throw Error("Credentials must be there");
        }

        if (this.authProtocolSchema.credentialSchema) {
            const result = v.validate(credentials, this.authProtocolSchema.credentialSchema);
            if (!result.valid) {
                throw new Error("credentials are invalid as per credentialSchema");
            }
        } else {
            throw new Error("No credentialSchema is input");
        }

    }
    public validateSettings = (authProtocolSettings: unknown) => {
        const v = new Validator();
        if (authProtocolSettings) {
            if (this.authProtocolSchema.settingsSchema) {
                const result = v.validate(authProtocolSettings, this.authProtocolSchema.settingsSchema);
                if (!result.valid) {
                    throw new Error("authProtocolSettings is invalid as per settingsSchema");
                }
            } else {
                throw new Error("authProtocolSettings is defined but no settingsSchema is input");
            }
        }
    }
    public validateSessionVariables = (sessionVariables: unknown) => {
        const v = new Validator();
        if (sessionVariables) {
            if (this.authProtocolSchema.sessionVariablesSchema) {
                const result = v.validate(sessionVariables, this.authProtocolSchema.sessionVariablesSchema);
                if (!result.valid) {
                    throw new Error("sessionVariables is invalid as per sessionVariablesSchema");
                }
            } else {
                throw new Error("sessionVariables is defined but no sessionVariablesSchema is defined");
            }
        }
    }
    private getContext = (selfCredentials: unknown, sessionVariables: unknown, authProtocolSettings: unknown): IAuthProtocolContext => {
        this.validateCredentials(selfCredentials);
        this.validateSettings(authProtocolSettings);
        this.validateSessionVariables(sessionVariables);
        return {
            authProtocolSettings: this.authProtocolSettings,
            selfCredentials,
            sessionVariables,
        };
    }
}
