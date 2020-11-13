import {ISessionRepository, ISessionState, Session, SessionStatus, UniqueId} from "../../../domain/session";
import {AuthProtocol, IAuthProtocolBundle} from "../../../domain/auth-protocol";
import { v4 as uuidv4} from "uuid";

export interface ISecuritySchema<AS> {
    authType: UniqueId;
    settings: AS;
}

export interface ISessionStore {
    save: <SV>(sessionState: ISessionState<SV>) => Promise<void>;
    getBySessionId: <SV>(sessionId: UniqueId) => Promise<ISessionState<SV>>
}

export interface ISecuritySchemaProvider {
    get: <AS> (uniqueId: UniqueId) => Promise<ISecuritySchema<AS>>
}

export interface ICredentialProvider {
    get:<C> (uniqueId: UniqueId) => Promise<C>
}

export interface IAuthBundleProvider {
    get: <M,SV,C,AS> (authType: UniqueId) => Promise<IAuthProtocolBundle<M,SV,C,AS>>
}



export class GenericSessionRepository<M> implements ISessionRepository<M> {
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
    public save = async <SV,C,AS> (session: Session<M,SV,C,AS>): Promise<void> => {
        return this.sessionStore.save<SV>(session.sessionState)
    }
    public get = async <SV,C,AS> (selfUniqueId: UniqueId, counterPartyUniqueId: UniqueId): Promise<Session<M,SV,C,AS>> => {
        const credentials = await this.credentialProvider.get<C>(selfUniqueId);
        if (!credentials) {
            throw new Error("Cannot find credentials for provided selfUniqueId")
        }
        const securitySchema = await this.securitySchemaStore.get<AS>(counterPartyUniqueId);
        if (!securitySchema) {
            throw new Error("Cannot find securitySchema for provided counterPartyUniqueId")
        }
        const authBundle = await this.authBundleProvider.get<M,SV,C,AS>(securitySchema.authType);
        if (!authBundle) {
            throw new Error("Cannot find authbundle for authtype specified in securityschema")
        }
        // const sessionState = await this.sessionStore.getByCounterpartyId(counterPartyUniqueId) || this.getInitialSessionState();
        const existingSessionState = await this.sessionStore.getBySessionId<SV>(this.getSessionId(selfUniqueId, counterPartyUniqueId));
        const sessionState = existingSessionState ? existingSessionState : this.getInitialSessionState<SV>(selfUniqueId, counterPartyUniqueId)
        // TODO: Write test cases and fix code for proper state recovery from serialized session
        const authProtocol = new AuthProtocol(authBundle.authProtocolSchema, authBundle.authProtocolLogic)
        return new Session(sessionState, authProtocol, credentials, securitySchema.settings)
    };
    private getSessionId = (selfUniqueId: UniqueId, counterpartyUniqueId: UniqueId): UniqueId => {
        return selfUniqueId+counterpartyUniqueId;
    }
    private getInitialSessionState = <SV> (selfUniqueId: UniqueId, counterpartyUniqueId: UniqueId): ISessionState<SV> => {
        // TODO: Add AuthType to sessionstate so that entire session state can be recovered
        return {
            sessionId: this.getSessionId(selfUniqueId, counterpartyUniqueId),
            status: SessionStatus.INIT,
        }
    }

}