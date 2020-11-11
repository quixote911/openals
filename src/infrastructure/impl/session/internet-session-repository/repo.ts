import {ISessionRepository, ISessionState, Session, SessionStatus} from "../../../../domain/session";
import {AuthProtocol, IAuthProtocolBundle} from "../../../../domain/auth-protocol";
import {v4 as uuidv4} from "uuid";

export interface ISecuritySchema {
    bundle: IAuthProtocolBundle;
    settings: unknown;
}

export interface ISessionStore {
    save: (counterpartyId: string, sessionState: ISessionState) => Promise<void>;
    getByCounterpartyId: (counterpartyId: string) => Promise<ISessionState>
}

export interface ISecuritySchemaProvider {
    get: (uniqueId: string) => Promise<ISecuritySchema>
}

export class InternetSessionRepository implements ISessionRepository {
    private selfCredentials: unknown;
    private sessionStore: ISessionStore;
    private securitySchemaStore: ISecuritySchemaProvider;

    constructor(selfCredentials: unknown, sessionStore: ISessionStore, securitySchemaStore: ISecuritySchemaProvider) {
        // TODO: Further abstract out the base data structures
        this.selfCredentials = selfCredentials;
        this.sessionStore = sessionStore;
        this.securitySchemaStore = securitySchemaStore;
    }

    public getOrCreate = async (uniqueId: string): Promise<Session> => {
        const sessionState = await this.sessionStore.getByCounterpartyId(uniqueId) || this.getInitialSessionState();
        const securitySchema: ISecuritySchema = await this.securitySchemaStore.get(uniqueId);
        const authProtocol = new AuthProtocol(securitySchema.bundle.authProtocolSchema, securitySchema.bundle.authProtocolLogic)
        return new Session(sessionState, authProtocol, this.selfCredentials, securitySchema.settings)
    };
    private getInitialSessionState = (): ISessionState => {
        return {
            sessionId: uuidv4(),
            status: SessionStatus.INIT
        }
    }

}