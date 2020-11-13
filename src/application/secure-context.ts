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


export abstract class AbstractSecureContext<M> {
    private sessionRepo: ISessionRepository;
    private externalEmitter: Emitter<ISessionEvents<unknown>>; //TODO: Define separate event interface for securecontext
    protected constructor(sessionRepo: ISessionRepository) {
        this.sessionRepo = sessionRepo;
        this.externalEmitter = createNanoEvents<ISessionEvents<unknown>>();
    }
    private addEventHandlers = <SV,C,AS>(session: Session<M,SV,C,AS>) => {
        // TODO: Understand behavior if same session object is returned. will we get 1 more handler every time this is fetched?
        session.on("stateChanged", async (state: ISessionState<SV>)=> {
            await this.sessionRepo.save<M,SV,C,AS>(session);
            // TODO: Catch error while saving repository. Event interface should be different.
            this.externalEmitter.emit("stateChanged", state);
        })
        session.on("error", (err: unknown)=> {
            this.externalEmitter.emit("error", err);
        })
    }
    public on = <E extends keyof ISessionEvents<unknown>>(event: E, callback: ISessionEvents<unknown>[E]): Unsubscribe => {
        return this.externalEmitter.on(event, callback);
    }
    public getSession = async <SV,C,AS> (selfId: UniqueId, counterpartyId: UniqueId): Promise<Session<M,SV,C,AS>> => {
        const session = await this.sessionRepo.get<M,SV,C,AS>(selfId, counterpartyId);
        this.addEventHandlers(session);
        return session;
    }
    public processIncoming = async <SV,C,AS> (selfId: UniqueId, senderId: UniqueId, message: M): Promise<M> => {
        const session = await this.getSession<SV,C,AS> (selfId, senderId);
        return session.processIncoming(message);
    }
    public processOutgoing = async <SV,C,AS> (selfId: UniqueId, recipientId: UniqueId, message: M): Promise<M> => {
        const session = await this.getSession<SV,C,AS> (selfId, recipientId);
        return session.processOutgoing(message);
    }
}



export class GenericSecureContext<M> extends AbstractSecureContext<M> {
    constructor(credentialProvider: ICredentialProvider,
                sessionStore: ISessionStore,
                securitySchemaProvider: ISecuritySchemaProvider,
                authBundleProvider: IAuthBundleProvider ) {
        const sessionRepo = new GenericSessionRepository(credentialProvider, sessionStore, securitySchemaProvider, authBundleProvider);
        super(sessionRepo);
    }
}

