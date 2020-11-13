import {ISessionEvents, ISessionRepository, ISessionState, Session, UniqueId} from "../domain/session";
import {
    GenericSessionRepository, IAuthBundleProvider,
    ICredentialProvider,
    ISecuritySchema, ISecuritySchemaProvider, ISessionStore,
} from "../infrastructure/session/generic-session-repository/repo";
import {
    InMemoryAuthBundleProvider,
    InMemoryCredentialProvider,
    InMemorySecuritySchemaProvider,
    InMemorySessionStore,
} from "../infrastructure/session/generic-session-repository/impl";
import {IAuthProtocolBundle} from "../domain/auth-protocol";
import {createNanoEvents, Emitter, Unsubscribe} from "nanoevents";


export abstract class AbstractSecureContext<M,SV,C,AS> {
    private sessionRepo: ISessionRepository<M,SV,C,AS>;
    private externalEmitter: Emitter<ISessionEvents<SV>>; //TODO: Define separate event interface for securecontext
    protected constructor(sessionRepo: ISessionRepository<M,SV,C,AS>) {
        this.sessionRepo = sessionRepo;
        this.externalEmitter = createNanoEvents<ISessionEvents<SV>>();
    }
    private getSession = async (selfId: UniqueId, counterpartyId: UniqueId): Promise<Session<M,SV,C,AS>> => {
        const session = await this.sessionRepo.getOrCreate(selfId, counterpartyId);
        this.addEventHandlers(session);
        return session;
    }
    private addEventHandlers = (session: Session<M,SV,C,AS>) => {
        // TODO: Understand behavior if same session object is returned. will we get 1 more handler every time this is fetched?
        session.on("stateChanged", async (state: ISessionState<SV>)=> {
            await this.sessionRepo.save(session);
            // TODO: Catch error while saving repository. Event interface should be different.
            this.externalEmitter.emit("stateChanged", state);
        })
        session.on("error", (err: unknown)=> {
            this.externalEmitter.emit("error", err);
        })
    }
    public on = <E extends keyof ISessionEvents<SV>>(event: E, callback: ISessionEvents<SV>[E]): Unsubscribe => {
        return this.externalEmitter.on(event, callback);
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
        const sessionStore = new InMemorySessionStore<SV>();
        const credentialProvider = new InMemoryCredentialProvider<C>(credentialMapping);
        const securitySchemaProvider = new InMemorySecuritySchemaProvider<AS>(securitySchemaMapping);
        const authBundleProvider: IAuthBundleProvider<M,SV,C,AS> = new InMemoryAuthBundleProvider(authBundleMapping)
        const sessionRepo = new GenericSessionRepository<M,SV,C,AS>(credentialProvider, sessionStore, securitySchemaProvider, authBundleProvider);
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

