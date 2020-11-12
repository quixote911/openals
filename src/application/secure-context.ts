import {ISessionRepository, Session} from "../domain/session";
import {
    ICredentialProvider,
    GenericSessionRepository, ISecuritySchemaProvider,
    ISessionStore, IAuthBundleProvider, ISecuritySchema
} from "../infrastructure/session/generic-session-repository/repo";
import {
    InMemoryAuthBundleProvider,
    InMemoryCredentialProvider, InMemorySecuritySchemaProvider,
    InMemorySessionStore
} from "../infrastructure/session/generic-session-repository/impl";
import {IAuthProtocolBundle} from "../domain/auth-protocol";


export abstract class AbstractSecureContext {
    private sessionRepo: ISessionRepository;
    protected constructor(sessionRepo: ISessionRepository) {
        this.sessionRepo = sessionRepo;
    }
    public getSession = async (selfId: string, counterpartyId: string): Promise<Session> => {
        return this.sessionRepo.getOrCreate(selfId, counterpartyId);
    }
    public processIncoming = async (selfId: string, senderId: string, message: unknown): Promise<unknown> => {
        const session: Session = await this.getSession(selfId, senderId);
        return session.processIncoming(message);
    }
    public processOutgoing = async (selfId: string, recipientId: string, message: unknown): Promise<unknown> => {
        const session: Session = await this.getSession(selfId, recipientId);
        return session.processOutgoing(message);
    }
}

export class MinimalSecureContext extends AbstractSecureContext {
    constructor(credentialMapping: Record<string, unknown>,
                authBundleMapping: Record<string, IAuthProtocolBundle>,
                securitySchemaMapping: Record<string, ISecuritySchema>) {
        const sessionStore = new InMemorySessionStore();
        const credentialProvider = new InMemoryCredentialProvider(credentialMapping);
        const securitySchemaProvider = new InMemorySecuritySchemaProvider(securitySchemaMapping);
        const authBundleProvider = new InMemoryAuthBundleProvider(authBundleMapping)
        const sessionRepo = new GenericSessionRepository(credentialProvider, sessionStore, securitySchemaProvider, authBundleProvider);
        super(sessionRepo);
    }
}

export class GenericSecureContext extends AbstractSecureContext {
    constructor(credentialProvider: ICredentialProvider,
                sessionStore: ISessionStore,
                securitySchemaProvider: ISecuritySchemaProvider,
                authBundleProvider: IAuthBundleProvider) {
        const sessionRepo = new GenericSessionRepository(credentialProvider, sessionStore, securitySchemaProvider, authBundleProvider);
        super(sessionRepo);
    }
}

