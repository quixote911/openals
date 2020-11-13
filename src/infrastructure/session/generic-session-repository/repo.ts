import {ISessionRepository, ISessionState, Session, SessionStatus, UniqueId} from "../../../domain/session";
import {AuthProtocol, IAuthProtocolBundle} from "../../../domain/auth-protocol";
import { v4 as uuidv4} from "uuid";

export interface ISecuritySchema<AS> {
    authType: UniqueId;
    settings: AS;
}

export interface ISessionStore<SV> {
    save: (sessionState: ISessionState<SV>) => Promise<void>;
    getBySessionId: (sessionId: UniqueId) => Promise<ISessionState<SV>>
}

export interface ISecuritySchemaProvider<AS> {
    get: (uniqueId: UniqueId) => Promise<ISecuritySchema<AS>>
}

export interface ICredentialProvider<C> {
    get: (uniqueId: UniqueId) => Promise<C>
}

export interface IAuthBundleProvider<M,SV,C,AS> {
    get: (authType: UniqueId) => Promise<IAuthProtocolBundle<M,SV,C,AS>>
}



export class GenericSessionRepository<M,SV,C,AS> implements ISessionRepository<M,SV,C,AS> {
    private sessionStore: ISessionStore<SV>;
    private securitySchemaStore: ISecuritySchemaProvider<AS>;
    private credentialProvider: ICredentialProvider<C>;
    private authBundleProvider: IAuthBundleProvider<M,SV,C,AS>;

    constructor(credentialProvider: ICredentialProvider<C>, sessionStore: ISessionStore<SV>,
                securitySchemaStore: ISecuritySchemaProvider<AS>, authBundleProvider: IAuthBundleProvider<M,SV,C,AS>) {
        this.credentialProvider = credentialProvider;
        this.sessionStore = sessionStore;
        this.securitySchemaStore = securitySchemaStore;
        this.authBundleProvider = authBundleProvider;
    }
    public save = async (session: Session<M,SV,C,AS>): Promise<void> => {
        return this.sessionStore.save(session.sessionState)
    }
    public get = async (selfUniqueId: UniqueId, counterPartyUniqueId: UniqueId): Promise<Session<M,SV,C,AS>> => {
        const credentials: C = await this.credentialProvider.get(selfUniqueId);
        if (!credentials) {
            throw new Error("Cannot find credentials for provided selfUniqueId")
        }
        const securitySchema: ISecuritySchema<AS> = await this.securitySchemaStore.get(counterPartyUniqueId);
        if (!securitySchema) {
            throw new Error("Cannot find securitySchema for provided counterPartyUniqueId")
        }
        const authBundle: IAuthProtocolBundle<M,SV,C,AS> = await this.authBundleProvider.get(securitySchema.authType);
        if (!authBundle) {
            throw new Error("Cannot find authbundle for authtype specified in securityschema")
        }
        // const sessionState = await this.sessionStore.getByCounterpartyId(counterPartyUniqueId) || this.getInitialSessionState();
        const existingSessionState = await this.sessionStore.getBySessionId(this.getSessionId(selfUniqueId, counterPartyUniqueId));
        const sessionState = existingSessionState ? existingSessionState : this.getInitialSessionState(selfUniqueId, counterPartyUniqueId)
        // TODO: Write test cases and fix code for proper state recovery from serialized session
        const authProtocol = new AuthProtocol(authBundle.authProtocolSchema, authBundle.authProtocolLogic)
        return new Session(sessionState, authProtocol, credentials, securitySchema.settings)
    };
    private getSessionId = (selfUniqueId: UniqueId, counterpartyUniqueId: UniqueId): UniqueId => {
        return selfUniqueId+counterpartyUniqueId;
    }
    private getInitialSessionState = (selfUniqueId: UniqueId, counterpartyUniqueId: UniqueId): ISessionState<SV> => {
        // TODO: Add AuthType to sessionstate so that entire session state can be recovered
        return {
            sessionId: this.getSessionId(selfUniqueId, counterpartyUniqueId),
            status: SessionStatus.INIT,
        }
        // TODO: shouldn't need to cast this!
    }

}