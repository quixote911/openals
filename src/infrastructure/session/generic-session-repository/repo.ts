import {ISessionRepository, ISessionState, Session, SessionStatus} from "../../../domain/session";
import {AuthProtocol, IAuthProtocolBundle} from "../../../domain/auth-protocol";
import {stringify, v4 as uuidv4} from "uuid";

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
    get: (authType: string) => Promise<IAuthProtocolBundle>
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
        if (!credentials) {
            throw new Error("Cannot find credentials for provided selfUniqueId")
        }
        const securitySchema: ISecuritySchema = await this.securitySchemaStore.get(counterPartyUniqueId);
        if (!securitySchema) {
            throw new Error("Cannot find securitySchema for provided counterPartyUniqueId")
        }
        const authBundle: IAuthProtocolBundle = await this.authBundleProvider.get(securitySchema.authType);
        if (!authBundle) {
            throw new Error("Cannot find authbundle for authtype specified in securityschema")
        }
        const sessionState = await this.sessionStore.getByCounterpartyId(counterPartyUniqueId) || this.getInitialSessionState();
        // TODO: Write test cases and fix code for proper state recovery from serialized session
        const authProtocol = new AuthProtocol(authBundle.authProtocolSchema, authBundle.authProtocolLogic)
        return new Session(sessionState, authProtocol, credentials, securitySchema.settings)
    };
    private getInitialSessionState = (): ISessionState => {
        // TODO: Add AuthType to sessionstate so that entire session state can be recovered
        return {
            sessionId: uuidv4(),
            status: SessionStatus.INIT
        }
    }

}