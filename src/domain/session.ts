import {AuthProtocol, IAuthProtocolEvents} from "./auth-protocol";
import {createNanoEvents, Emitter, Unsubscribe} from "nanoevents";

export interface ISessionRepository {
    // save: (session: Session) => Promise<void>;
    getOrCreate: (selfUniqueId: string, counterPartyUniqueId: string) => Promise<Session>;
    // deleteById: (sessionId: unknown) => Promise<void>;
    // getById: (sessionId: unknown) => Promise<Session>;
}

export enum SessionStatus {
    INIT = "INIT",
    ACTIVE = "ACTIVE",
    EXPIRED = "EXPIRED",
    BLOCKED = "BLOCKED",
}

export interface ISessionState {
    sessionId: string;
    status: SessionStatus;
    sessionVariables?: unknown;
}

interface ISessionEvents {
    stateChanged: (newState: ISessionState) => void;
    error: (error: unknown) => void;
}

export class Session {
    // TODO: [Long term] Right now this works only for client. What about server?
    public readonly selfCredentials: unknown;
    public readonly sessionState: ISessionState;
    public readonly authProtocol: AuthProtocol;
    private readonly authProtocolEventHandlers: IAuthProtocolEvents = {
        activated: (newSessionVariables: unknown) => {
            this.sessionState.sessionVariables = newSessionVariables;
            this.sessionState.status = SessionStatus.ACTIVE;
            this.externalEmitter.emit("stateChanged", this.sessionState);
        },
        blocked: () => {
            this.sessionState.status = SessionStatus.BLOCKED;
            this.externalEmitter.emit("stateChanged", this.sessionState);
        },
        expired: async () => {
            this.sessionState.status = SessionStatus.EXPIRED;
            this.externalEmitter.emit("stateChanged", this.sessionState);
            await this.ensureActive();
        },
        // tslint:disable-next-line:object-literal-sort-keys
        error: (err: unknown) => {
            // TODO: Define errors properly
            this.externalEmitter.emit("error", err);
        },
    };
    private readonly authProtocolSettings: unknown;
    private externalEmitter: Emitter<ISessionEvents>;
    private singletonEnsureActivePromise: Promise<void> | undefined;

    // TODO: unknown vs object as type here?
    constructor(sessionState: ISessionState, authProtocol: AuthProtocol, selfCredentials: unknown, authProtocolSettings?: unknown) {
        this.validateSessionInputs(sessionState, authProtocol, selfCredentials, authProtocolSettings);
        this.externalEmitter = createNanoEvents<ISessionEvents>();
        this.sessionState = sessionState;
        this.selfCredentials = selfCredentials;
        this.authProtocolSettings = authProtocolSettings;
        this.authProtocol = authProtocol;
        this.singletonEnsureActivePromise = undefined;
        this.authProtocol.on("activated", this.authProtocolEventHandlers.activated);
        this.authProtocol.on("blocked", this.authProtocolEventHandlers.blocked);
        this.authProtocol.on("expired", this.authProtocolEventHandlers.expired);
        this.externalEmitter.emit("stateChanged", this.sessionState);
    }

    public on = <E extends keyof ISessionEvents>(event: E, callback: ISessionEvents[E]): Unsubscribe => {
        return this.externalEmitter.on(event, callback);
    }

    public processIncoming = async (message: unknown): Promise<unknown> => {
        await this.ensureActive();
        return this.authProtocol.processIncoming(message, this.sessionState.sessionVariables, this.selfCredentials, this.authProtocolSettings);
    }
    public processOutgoing = async (message: unknown): Promise<unknown> => {
        // TODO: Should this return message or modify message in-place?
        await this.ensureActive();
        return this.authProtocol.processOutgoing(message, this.sessionState.sessionVariables, this.selfCredentials, this.authProtocolSettings);
    }
    public ensureActive = async (): Promise<void> => {
        if (this.singletonEnsureActivePromise) {
            return this.singletonEnsureActivePromise;
        } else {
            this.singletonEnsureActivePromise = this.authProtocol.ensureActiveSession(this.sessionState.sessionVariables, this.selfCredentials, this.authProtocolSettings);
            return this.singletonEnsureActivePromise;
        }
    }
    private validateSessionInputs = (sessionState: ISessionState, authProtocol: AuthProtocol, selfCredentials: unknown, authProtocolSettings?: unknown) => {
        if (!Object.values(SessionStatus).includes(sessionState.status)) {
            throw Error("Invalid status in sessionState");
        }
        authProtocol.validateSessionVariables(sessionState.sessionVariables);
        authProtocol.validateCredentials(selfCredentials);
        authProtocol.validateSettings(authProtocolSettings);
    }
}
