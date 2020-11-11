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

export interface ICredentialProvider {
    get: (uniqueId: string) => Promise<unknown>
}

export class InternetSessionRepository implements ISessionRepository {
    private sessionStore: ISessionStore;
    private securitySchemaStore: ISecuritySchemaProvider;
    private credentialProvider: ICredentialProvider;

    constructor(credentialProvider: ICredentialProvider, sessionStore: ISessionStore, securitySchemaStore: ISecuritySchemaProvider) {
        // TODO: Further abstract out the base data structures
        this.credentialProvider = credentialProvider;
        this.sessionStore = sessionStore;
        this.securitySchemaStore = securitySchemaStore;
    }

    public getOrCreate = async (uniqueId: string): Promise<Session> => {
        const sessionState = await this.sessionStore.getByCounterpartyId(uniqueId) || this.getInitialSessionState();
        const securitySchema: ISecuritySchema = await this.securitySchemaStore.get(uniqueId);
        const authProtocol = new AuthProtocol(securitySchema.bundle.authProtocolSchema, securitySchema.bundle.authProtocolLogic)
        const credentials = this.credentialProvider.get(uniqueId);
        return new Session(sessionState, authProtocol, credentials, securitySchema.settings)
    };
    private getInitialSessionState = (): ISessionState => {
        return {
            sessionId: uuidv4(),
            status: SessionStatus.INIT
        }
    }

}