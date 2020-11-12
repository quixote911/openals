import {ISessionRepository, ISessionState, Session, SessionStatus} from "../../../domain/session";
import {AuthProtocol, IAuthProtocolBundle} from "../../../domain/auth-protocol";
import { v4 as uuidv4} from "uuid";

export interface ISecuritySchema<ATID,AS> {
    authType: ATID;
    settings: AS;
}

export interface ISessionStore<ID,SV> {
    save: (counterpartyId: ID, sessionState: ISessionState<SV>) => Promise<void>;
    getByCounterpartyId: (counterpartyId: ID) => Promise<ISessionState<SV>>
}

export interface ISecuritySchemaProvider<ID,ATID,AS> {
    get: (uniqueId: ID) => Promise<ISecuritySchema<ATID,AS>>
}

export interface ICredentialProvider<ID,C> {
    get: (uniqueId: ID) => Promise<C>
}

export interface IAuthBundleProvider<M,SV,C,AS,ATID> {
    get: (authType: ATID) => Promise<IAuthProtocolBundle<M,SV,C,AS>>
}

export class GenericSessionRepository<ID,M,SV,C,AS,ATID> implements ISessionRepository<ID,M,SV,C,AS> {
    private sessionStore: ISessionStore<ID,SV>;
    private securitySchemaStore: ISecuritySchemaProvider<ID,ATID,AS>;
    private credentialProvider: ICredentialProvider<ID,C>;
    private authBundleProvider: IAuthBundleProvider<M,SV,C,AS,ATID>;

    constructor(credentialProvider: ICredentialProvider<ID,C>, sessionStore: ISessionStore<ID,SV>,
                securitySchemaStore: ISecuritySchemaProvider<ID,ATID,AS>, authBundleProvider: IAuthBundleProvider<M,SV,C,AS,ATID>) {
        this.credentialProvider = credentialProvider;
        this.sessionStore = sessionStore;
        this.securitySchemaStore = securitySchemaStore;
        this.authBundleProvider = authBundleProvider;
    }
    public getOrCreate = async (selfUniqueId: ID, counterPartyUniqueId: ID): Promise<Session<M,SV,C,AS>> => {
        const credentials: C = await this.credentialProvider.get(selfUniqueId);
        if (!credentials) {
            throw new Error("Cannot find credentials for provided selfUniqueId")
        }
        const securitySchema: ISecuritySchema<ATID,AS> = await this.securitySchemaStore.get(counterPartyUniqueId);
        if (!securitySchema) {
            throw new Error("Cannot find securitySchema for provided counterPartyUniqueId")
        }
        const authBundle: IAuthProtocolBundle<M,SV,C,AS> = await this.authBundleProvider.get(securitySchema.authType);
        if (!authBundle) {
            throw new Error("Cannot find authbundle for authtype specified in securityschema")
        }
        const sessionState = await this.sessionStore.getByCounterpartyId(counterPartyUniqueId) || this.getInitialSessionState();
        // TODO: Write test cases and fix code for proper state recovery from serialized session
        const authProtocol = new AuthProtocol(authBundle.authProtocolSchema, authBundle.authProtocolLogic)
        return new Session(sessionState, authProtocol, credentials, securitySchema.settings)
    };
    private getInitialSessionState = (): ISessionState<SV> => {
        // TODO: Add AuthType to sessionstate so that entire session state can be recovered
        return {
            sessionId: uuidv4(),
            status: SessionStatus.INIT
        } as ISessionState<SV>
    }

}