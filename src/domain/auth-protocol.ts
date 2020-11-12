import {Schema, Validator} from "jsonschema";
import {createNanoEvents, Emitter, Unsubscribe} from "nanoevents";

export interface ISessionStateChangeEvents<SessionVariablesType> {
    activated: (sessionVariables: SessionVariablesType) => void;
    expired: () => void;
    blocked: () => void;
}

export interface IAuthProtocolEvents<SessionVariablesType> extends ISessionStateChangeEvents<SessionVariablesType> {
    error: (err: unknown) => void;
}

export interface IAuthProtocolContext<SessionVariablesType, CredentialsType, AuthSettingsType> {
    // TODO: Deal with these optional variables in the right way
    authProtocolSettings?: AuthSettingsType;
    selfCredentials: CredentialsType;
    sessionVariables: SessionVariablesType;
}

export interface IAuthProtocolLogic<MessageType,SessionVariablesType,CredentialsType,AuthSettingsType> {
    ensureActiveSession: (context: IAuthProtocolContext<SessionVariablesType, CredentialsType, AuthSettingsType>, emitter: Emitter<ISessionStateChangeEvents<SessionVariablesType>>) => Promise<void>;
    processIncoming: (message: MessageType, context: IAuthProtocolContext<SessionVariablesType, CredentialsType, AuthSettingsType>, emitter: Emitter<ISessionStateChangeEvents<SessionVariablesType>>) => Promise<MessageType>;
    processOutgoing: (message: MessageType, context: IAuthProtocolContext<SessionVariablesType, CredentialsType, AuthSettingsType>, emitter: Emitter<ISessionStateChangeEvents<SessionVariablesType>>) => Promise<MessageType>;
}

export interface IAuthProtocolSchema {
    settingsSchema?: Schema;
    sessionVariablesSchema?: Schema;
    credentialSchema: Schema;
}

export interface IAuthProtocolBundle<MessageType,SessionVariablesType,CredentialsType,AuthSettingsType> {
    authProtocolLogic: IAuthProtocolLogic<MessageType,SessionVariablesType,CredentialsType,AuthSettingsType>;
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
export class AuthProtocol<M,SV,C,AS> {
    public readonly authProtocolSchema: IAuthProtocolSchema;
    public readonly authProtocolLogic: IAuthProtocolLogic<M,SV,C,AS>;
    private readonly internalEmitter: Emitter<ISessionStateChangeEvents<SV>>;
    private readonly externalEmitter: Emitter<IAuthProtocolEvents<SV>>;
    private readonly stateChangeEventHandlers: ISessionStateChangeEvents<SV> = {
        activated: (newSessionVariables: SV) => {
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
    constructor(authProtocolSchema: IAuthProtocolSchema, authProtocolLogic: IAuthProtocolLogic<M,SV,C,AS>) {
        this.validateAuthProtocolInputs(authProtocolSchema, authProtocolLogic);
        this.authProtocolLogic = authProtocolLogic;
        this.authProtocolSchema = authProtocolSchema;
        this.externalEmitter = createNanoEvents<IAuthProtocolEvents<SV>>();
        this.internalEmitter = createNanoEvents<ISessionStateChangeEvents<SV>>();
        this.internalEmitter.on("activated", this.stateChangeEventHandlers.activated);
        this.internalEmitter.on("blocked", this.stateChangeEventHandlers.blocked);
        this.internalEmitter.on("expired", this.stateChangeEventHandlers.expired);
    }
    public ensureActiveSession = async (sessionVariables: SV, selfCredentials: C, authProtocolSettings?: AS): Promise<void> => {
        await this.authProtocolLogic.ensureActiveSession(
            this.getContext(selfCredentials, sessionVariables, authProtocolSettings),
            this.internalEmitter,
        );
    }
    public processIncoming = async (message: M, sessionVariables: SV, selfCredentials: C, authProtocolSettings: AS): Promise<M> => {
        return this.authProtocolLogic.processIncoming(
            message,
            this.getContext(selfCredentials, sessionVariables, authProtocolSettings),
            this.internalEmitter,
        );
    }
    public processOutgoing = async (message: M, sessionVariables: SV, selfCredentials: C, authProtocolSettings: AS): Promise<M> => {
        return this.authProtocolLogic.processOutgoing(
            message,
            this.getContext(selfCredentials, sessionVariables, authProtocolSettings),
            this.internalEmitter,
        );
    }
    public on = <E extends keyof IAuthProtocolEvents<SV>>(event: E, callback: IAuthProtocolEvents<SV>[E]): Unsubscribe => {
        return this.externalEmitter.on(event, callback);
    }

    public validateCredentials = (credentials: C): void => {
        AuthProtocolValidationHelper.validateCredentials(credentials, this.authProtocolSchema.credentialSchema);
    }
    public validateSettings = (authProtocolSettings?: AS): void => {
        AuthProtocolValidationHelper.validateSettings(authProtocolSettings, this.authProtocolSchema.settingsSchema);
    }
    public validateSessionVariables = (sessionVariables: SV): void => {
        AuthProtocolValidationHelper.validateSessionVariables(sessionVariables, this.authProtocolSchema.sessionVariablesSchema);
    }
    private getContext = (selfCredentials: C, sessionVariables: SV, authProtocolSettings?: AS): IAuthProtocolContext<SV,C,AS> => {
        this.validateCredentials(selfCredentials);
        this.validateSettings(authProtocolSettings);
        this.validateSessionVariables(sessionVariables);
        return { authProtocolSettings, selfCredentials, sessionVariables };
    }

    private validateAuthProtocolInputs = (authProtocolSchema: IAuthProtocolSchema, authProtocolLogic: IAuthProtocolLogic<M,SV,C,AS>) => {
        // TODO: Add some kind of validation
        return;
    }
}


class AuthProtocolValidationHelper {
    public static validateCredentials = (credentials: unknown, credentialSchema: Schema) => {
        const v = new Validator();
        if (!credentials) {
            throw Error("Credentials must be there");
        }

        if (credentialSchema) {
            const result = v.validate(credentials, credentialSchema);
            if (!result.valid) {
                throw new Error("credentials are invalid as per credentialSchema");
            }
        } else {
            throw new Error("No credentialSchema is input");
        }
    }
    public static validateSettings = (authProtocolSettings: unknown, settingsSchema?: Schema) => {
        const v = new Validator();
        if (authProtocolSettings) {
            if (settingsSchema) {
                const result = v.validate(authProtocolSettings, settingsSchema);
                if (!result.valid) {
                    throw new Error("authProtocolSettings is invalid as per settingsSchema");
                }
            } else {
                throw new Error("authProtocolSettings is defined but no settingsSchema is input");
            }
        }
    }
    public static validateSessionVariables = (sessionVariables: unknown, sessionVariablesSchema?: Schema) => {
        const v = new Validator();
        if (sessionVariables) {
            if (sessionVariablesSchema) {
                const result = v.validate(sessionVariables, sessionVariablesSchema);
                if (!result.valid) {
                    throw new Error("sessionVariables is invalid as per sessionVariablesSchema");
                }
            } else {
                throw new Error("sessionVariables is defined but no sessionVariablesSchema is defined");
            }
        }
    }
}




