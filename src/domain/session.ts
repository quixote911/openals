import {AuthProtocol, IAuthProtocolEvents} from "./auth-protocol";
import {createNanoEvents, Emitter, Unsubscribe} from "nanoevents";

export type UniqueId = string

export interface ISessionRepository<M,SV,C,AS> {
    save: (session: Session<M,SV,C,AS>) => Promise<void>;
    get: (selfUniqueId: UniqueId, counterPartyUniqueId: UniqueId) => Promise<Session<M,SV,C,AS>>;
    // deleteById: (sessionId: unknown) => Promise<void>;
    // getById: (sessionId: unknown) => Promise<Session>;
}

export enum SessionStatus {
    INIT = "INIT",
    ACTIVE = "ACTIVE",
    EXPIRED = "EXPIRED",
    BLOCKED = "BLOCKED",
}

export interface ISessionState<SV> {
    sessionId: string;
    status: SessionStatus;
    sessionVariables?: SV;
}

export interface ISessionEvents<SV> {
    stateChanged: (newState: ISessionState<SV>) => void;
    error: (error: unknown) => void;
}

export class Session<M,SV,C,AS> {
    // TODO: [Long term] Right now this works only for client. What about server?
    public readonly selfCredentials: C;
    public readonly sessionState: ISessionState<SV>;
    public readonly authProtocol: AuthProtocol<M,SV,C,AS>;
    private readonly authProtocolEventHandlers: IAuthProtocolEvents<SV> = {
        activated: (newSessionVariables: SV) => {
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
    private readonly authProtocolSettings: AS;
    private externalEmitter: Emitter<ISessionEvents<SV>>;
    private singletonEnsureActivePromise: Promise<void> | undefined;

    // TODO: is unknown the right type to use here?
    constructor(sessionState: ISessionState<SV>, authProtocol: AuthProtocol<M,SV,C,AS> , selfCredentials: C, authProtocolSettings: AS) {
        this.validateSessionInputs(sessionState, authProtocol, selfCredentials, authProtocolSettings);
        this.externalEmitter = createNanoEvents<ISessionEvents<SV>>();
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

    public on = <E extends keyof ISessionEvents<SV>>(event: E, callback: ISessionEvents<SV>[E]): Unsubscribe => {
        return this.externalEmitter.on(event, callback);
    }

    public processIncoming = async (message: M): Promise<M> => {
        await this.ensureActive();
        return this.authProtocol.processIncoming(message, this.sessionState.sessionVariables, this.selfCredentials, this.authProtocolSettings);
    }
    public processOutgoing = async (message: M): Promise<M> => {
        // TODO: Should this return message or modify message in-place? MAKE IT CONSISTENT
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
    private validateSessionInputs = (sessionState: ISessionState<SV>, authProtocol: AuthProtocol<M,SV,C,AS>, selfCredentials: C, authProtocolSettings: AS) => {
        if (!Object.values(SessionStatus).includes(sessionState.status)) {
            throw Error("Invalid status in sessionState");
        }
        authProtocol.validateSessionVariables(sessionState.sessionVariables);
        authProtocol.validateCredentials(selfCredentials);
        authProtocol.validateSettings(authProtocolSettings);
    }
}
