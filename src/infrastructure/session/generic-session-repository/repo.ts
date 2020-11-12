import {ISessionRepository, ISessionState, Session, SessionStatus} from "../../../domain/session";
import {AuthProtocol, IAuthProtocolBundle} from "../../../domain/auth-protocol";
import {v4 as uuidv4} from "uuid";

export interface ISecuritySchema {
    authType: string;
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

export interface IAuthBundleProvider {
    get: (uniqueId: string) => Promise<IAuthProtocolBundle>
}

export class GenericSessionRepository implements ISessionRepository {
    private sessionStore: ISessionStore;
    private securitySchemaStore: ISecuritySchemaProvider;
    private credentialProvider: ICredentialProvider;
    private authBundleProvider: IAuthBundleProvider;

    constructor(credentialProvider: ICredentialProvider, sessionStore: ISessionStore,
                securitySchemaStore: ISecuritySchemaProvider, authBundleProvider: IAuthBundleProvider) {
        this.credentialProvider = credentialProvider;
        this.sessionStore = sessionStore;
        this.securitySchemaStore = securitySchemaStore;
        this.authBundleProvider = authBundleProvider;
    }
    public getOrCreate = async (selfUniqueId: string, counterPartyUniqueId: string): Promise<Session> => {
        const credentials = this.credentialProvider.get(selfUniqueId);
        const sessionState = await this.sessionStore.getByCounterpartyId(counterPartyUniqueId) || this.getInitialSessionState();
        const securitySchema: ISecuritySchema = await this.securitySchemaStore.get(counterPartyUniqueId);
        const authBundle: IAuthProtocolBundle = await this.authBundleProvider.get(securitySchema.authType);
        const authProtocol = new AuthProtocol(authBundle.authProtocolSchema, authBundle.authProtocolLogic)
        return new Session(sessionState, authProtocol, credentials, securitySchema.settings)
    };
    private getInitialSessionState = (): ISessionState => {
        return {
            sessionId: uuidv4(),
            status: SessionStatus.INIT
        }
    }

}