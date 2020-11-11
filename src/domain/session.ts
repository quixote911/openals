import {AuthProtocol, IAuthProtocolEvents} from "./auth-protocol";
import {createNanoEvents, Emitter} from "nanoevents";

export interface ISessionRepository {
    save: (session: Session) => Promise<void>;
    createSessionWith: (counterpartyUniqueId: string) => Promise<Session>;
    delete: (sessionId: any) => Promise<void>;
    get: (sessionId: any) => Promise<Session>;
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
    sessionVariables: unknown;
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
        activated: (newSessionVariables: any) => {
            this.sessionState.sessionVariables = newSessionVariables;
            this.sessionState.status = SessionStatus.ACTIVE;
            this.externalEmitter.emit("stateChanged", this.sessionState);
        },
        blocked: () => {
            this.sessionState.status = SessionStatus.BLOCKED;
            this.externalEmitter.emit("stateChanged", this.sessionState);
        },
        expired: () => {
            this.sessionState.status = SessionStatus.EXPIRED;
            this.externalEmitter.emit("stateChanged", this.sessionState);
        },
        // tslint:disable-next-line:object-literal-sort-keys
        error: (err: unknown) => {
            // TODO: Define errors properly
            this.externalEmitter.emit("error", err);
        },
    };
    private readonly authProtocolSettings: unknown;
    private externalEmitter: Emitter<ISessionEvents>;

    // TODO: unknown vs object as type here?
    constructor(sessionState: ISessionState, authProtocol: AuthProtocol, selfCredentials: unknown, authProtocolSettings?: unknown) {
        this.validateSessionInputs(sessionState, authProtocol, selfCredentials, authProtocolSettings);
        this.externalEmitter = createNanoEvents<ISessionEvents>();
        this.sessionState = sessionState;
        this.selfCredentials = selfCredentials;
        this.authProtocolSettings = authProtocolSettings;
        this.authProtocol = authProtocol;
        this.authProtocol.on("activated", this.authProtocolEventHandlers.activated);
        this.authProtocol.on("blocked", this.authProtocolEventHandlers.blocked);
        this.authProtocol.on("expired", this.authProtocolEventHandlers.expired);
        this.externalEmitter.emit("stateChanged", this.sessionState);
    }

    public on = <E extends keyof ISessionEvents>(event: E, callback: ISessionEvents[E]) => {
        return this.externalEmitter.on(event, callback);
    }

    public processIncoming = async (message: any) => {
        await this.ensureActive();
        return this.authProtocol.processIncoming(message, this.sessionState.sessionVariables, this.selfCredentials, this.authProtocolSettings);
    }
    public processOutgoing = async (message: any) => {
        await this.ensureActive();
        return this.authProtocol.processOutgoing(message, this.sessionState.sessionVariables, this.selfCredentials, this.authProtocolSettings);
    }
    public ensureActive = async () => {
        await this.authProtocol.ensureActiveSession(this.sessionState.sessionVariables, this.selfCredentials, this.authProtocolSettings);
    }
    private validateSessionInputs = (sessionState: ISessionState, authProtocol: AuthProtocol, selfCredentials: unknown, authProtocolSettings?: unknown) => {
        // @ts-ignore
        if (!Object.values(SessionStatus).includes(sessionState.status)) {
            throw Error("Invalid status in sessionState");
        }
        this.authProtocol.validateSessionVariables(sessionState.sessionVariables);
        authProtocol.validateCredentials(selfCredentials);
        authProtocol.validateSettings(authProtocolSettings);
    }
}
