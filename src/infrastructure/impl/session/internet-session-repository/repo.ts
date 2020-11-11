import {ISessionRepository, ISessionState, Session, SessionStatus} from "../../../../domain/session";
import {AuthProtocol, IAuthProtocolBundle} from "../../../../domain/auth-protocol";
import {v4 as uuidv4} from "uuid";

export interface ISecuritySchema<MessageType> {
    // TODO: Doesn't make sense to have message type as a generic here
    bundle: IAuthProtocolBundle<MessageType>;
    settings: unknown;
}

export interface ISessionStore {
    save: (counterpartyId: string, sessionState: ISessionState) => Promise<void>;
    getByCounterpartyId: (counterpartyId: string) => Promise<ISessionState>
}

export interface ISecuritySchemaProvider<MessageType> {
    get: (uniqueId: string) => Promise<ISecuritySchema<MessageType>>
}

export interface ICredentialProvider {
    get: (uniqueId: string) => Promise<unknown>
}

export class InternetSessionRepository<MessageType> implements ISessionRepository<MessageType> {
    private sessionStore: ISessionStore;
    private securitySchemaStore: ISecuritySchemaProvider;
    private credentialProvider: ICredentialProvider;

    constructor(credentialProvider: ICredentialProvider, sessionStore: ISessionStore, securitySchemaStore: ISecuritySchemaProvider) {
        // TODO: Further abstract out the base data structures
        this.credentialProvider = credentialProvider;
        this.sessionStore = sessionStore;
        this.securitySchemaStore = securitySchemaStore;
    }

    public getOrCreate = async (uniqueId: string): Promise<Session<MessageType>> => {
        const sessionState = await this.sessionStore.getByCounterpartyId(uniqueId) || this.getInitialSessionState();
        const securitySchema: ISecuritySchema = await this.securitySchemaStore.get(uniqueId);
        const authProtocol = new AuthProtocol<MessageType>(securitySchema.bundle.authProtocolSchema, securitySchema.bundle.authProtocolLogic)
        const credentials = this.credentialProvider.get(uniqueId);
        return new Session<MessageType>(sessionState, authProtocol, credentials, securitySchema.settings)
    };
    private getInitialSessionState = (): ISessionState => {
        return {
            sessionId: uuidv4(),
            status: SessionStatus.INIT
        }
    }

}