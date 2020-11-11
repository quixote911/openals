import {AuthProtocol, IAuthProtocolEvents} from "./auth-protocol";

export interface ISessionRepository {
    get: (sessionId: any) => Promise<Session>;
    update: (session: Session) => Promise<void>;
    create: (counterpartyUniqueId: string) => Promise<Session>;
    delete: (sessionId: any) => Promise<void>;
}

// export interface ICredentialManager {
//     getCredentials: () => object;
// }

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

export class Session {
    // TODO: [Long term] Right now this works only for client. What about server?
    public readonly selfCredentials: unknown;
    public readonly sessionState: ISessionState;
    public readonly authProtocol: AuthProtocol;
    private readonly authProtocolEventHandlers: IAuthProtocolEvents = {
        activated: (newSessionVariables: any) => {
            this.sessionState.sessionVariables = newSessionVariables;
            this.sessionState.status = SessionStatus.ACTIVE;
        },
        blocked: () => {
            this.sessionState.status = SessionStatus.BLOCKED;
        },
        expired: () => {
            this.sessionState.status = SessionStatus.EXPIRED;
        },
        // tslint:disable-next-line:object-literal-sort-keys
        error: (err: unknown) => {
            // TODO: Define errors properly
            console.log(err);
        },
    };
    private readonly authProtocolSettings: unknown;

    // TODO: unknown vs object as type here?
    constructor(sessionState: ISessionState, authProtocol: AuthProtocol, selfCredentials: unknown, authProtocolSettings?: unknown) {
        this.validateSessionState(sessionState);
        authProtocol.validateCredentials(selfCredentials);
        authProtocol.validateSettings(authProtocolSettings);
        this.sessionState = sessionState;
        this.selfCredentials = selfCredentials;
        this.authProtocolSettings = authProtocolSettings;
        this.authProtocol = authProtocol;
        this.authProtocol.on("activated", this.authProtocolEventHandlers.activated);
        this.authProtocol.on("blocked", this.authProtocolEventHandlers.blocked);
        this.authProtocol.on("expired", this.authProtocolEventHandlers.expired);
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
    // tslint:disable-next-line:no-empty
    private validateSessionState = (sessionState: ISessionState) => {
        // @ts-ignore
        if (!Object.values(SessionStatus).includes(sessionState.status)) {
            throw Error("Invalid status in sessionState");
        }
        this.authProtocol.validateSessionVariables(sessionState.sessionVariables);
    }
}
