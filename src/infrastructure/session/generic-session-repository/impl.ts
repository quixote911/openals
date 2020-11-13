import {
    IAuthBundleProvider,
    ICredentialProvider,
    ISecuritySchema,
    ISecuritySchemaProvider,
    ISessionStore
} from "./repo";
import {ISessionState, UniqueId} from "../../../domain/session";
import {IAuthProtocolBundle} from "../../../domain/auth-protocol";


export class InMemorySessionStore implements ISessionStore {
    private readonly store: Record<UniqueId, ISessionState<unknown>>;
    constructor() {
        this.store = {};
    }
    public save = async <SV>(sessionState: ISessionState<SV>): Promise<void> => {
        this.store[sessionState.sessionId] = sessionState;
    }
    public getBySessionId = async <SV>(sessionId: UniqueId): Promise<ISessionState<SV>> => {
        return this.store[sessionId] as ISessionState<SV>;
    };
}

abstract class GenericInMemoryProvider {
    private readonly storeMapping: Record<UniqueId, unknown>;
    constructor(storeMapping: Record<UniqueId, unknown>) {
        this.storeMapping = storeMapping;
    }
    public get = async <C> (uniqueId: UniqueId): Promise<C> => {
        return this.storeMapping[uniqueId] as C;
    };
}

// TODO: Are generics really in the right place? Credentials can be any type actually. only while getting the credentials we know what type they will be.
export class InMemoryCredentialProvider extends GenericInMemoryProvider implements ICredentialProvider{
}

export class InMemorySecuritySchemaProvider extends GenericInMemoryProvider implements ISecuritySchemaProvider{
}

export class InMemoryAuthBundleProvider extends GenericInMemoryProvider implements IAuthBundleProvider{
}

