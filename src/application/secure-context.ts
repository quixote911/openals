import {ISessionRepository, Session, UniqueId} from "../domain/session";
import {
    GenericSessionRepository, IAuthBundleProvider,
    ICredentialProvider,
    ISecuritySchema, ISecuritySchemaProvider, ISessionStore
} from "../infrastructure/session/generic-session-repository/repo";
import {
    InMemoryAuthBundleProvider,
    InMemoryCredentialProvider,
    InMemorySecuritySchemaProvider,
    InMemorySessionStore
} from "../infrastructure/session/generic-session-repository/impl";
import {IAuthProtocolBundle} from "../domain/auth-protocol";


export abstract class AbstractSecureContext<M,SV,C,AS> {
    private sessionRepo: ISessionRepository<M,SV,C,AS>;
    protected constructor(sessionRepo: ISessionRepository<M,SV,C,AS>) {
        this.sessionRepo = sessionRepo;
    }
    public getSession = async (selfId: UniqueId, counterpartyId: UniqueId): Promise<Session<M,SV,C,AS>> => {
        return this.sessionRepo.getOrCreate(selfId, counterpartyId);
    }
    public processIncoming = async (selfId: UniqueId, senderId: UniqueId, message: M): Promise<M> => {
        const session = await this.getSession(selfId, senderId);
        return session.processIncoming(message);
    }
    public processOutgoing = async (selfId: UniqueId, recipientId: UniqueId, message: M): Promise<M> => {
        const session = await this.getSession(selfId, recipientId);
        return session.processOutgoing(message);
    }
}

export class MinimalSecureContext<M,SV,C,AS> extends AbstractSecureContext<M,SV,C,AS> {
    constructor(credentialMapping: Record<UniqueId, C>,
                authBundleMapping: Record<UniqueId, IAuthProtocolBundle<M,SV,C,AS>>,
                securitySchemaMapping: Record<UniqueId, ISecuritySchema<AS>>) {
        const sessionStore = new InMemorySessionStore();
        const credentialProvider = new InMemoryCredentialProvider(credentialMapping);
        const securitySchemaProvider = new InMemorySecuritySchemaProvider(securitySchemaMapping);
        const authBundleProvider = new InMemoryAuthBundleProvider(authBundleMapping)
        const sessionRepo = new GenericSessionRepository(credentialProvider, sessionStore, securitySchemaProvider, authBundleProvider);
        super(sessionRepo);
    }
}

export class GenericSecureContext<M,SV,C,AS> extends AbstractSecureContext<M,SV,C,AS> {
    constructor(credentialProvider: ICredentialProvider<C>,
                sessionStore: ISessionStore<SV>,
                securitySchemaProvider: ISecuritySchemaProvider<AS>,
                authBundleProvider: IAuthBundleProvider<M,SV,C,AS> ) {
        const sessionRepo = new GenericSessionRepository(credentialProvider, sessionStore, securitySchemaProvider, authBundleProvider);
        super(sessionRepo);
    }
}

