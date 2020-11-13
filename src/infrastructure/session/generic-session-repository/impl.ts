import {
    IAuthBundleProvider,
    ICredentialProvider,
    ISecuritySchema,
    ISecuritySchemaProvider,
    ISessionStore
} from "./repo";
import {ISessionState, UniqueId} from "../../../domain/session";
import {IAuthProtocolBundle} from "../../../domain/auth-protocol";


export class InMemorySessionStore<SV> implements ISessionStore<SV> {
    private readonly store: Record<UniqueId, ISessionState<SV>>;
    constructor() {
        this.store = {};
    }
    public save = async (sessionState: ISessionState<SV>): Promise<void> => {
        this.store[sessionState.sessionId] = sessionState;
    }
    public getBySessionId = async (sessionId: UniqueId): Promise<ISessionState<SV>> => {
        return this.store[sessionId];
    };
}

abstract class GenericInMemoryProvider<DataType> {
    private readonly storeMapping: Record<UniqueId, DataType>;
    constructor(storeMapping: Record<UniqueId, DataType>) {
        this.storeMapping = storeMapping;
    }
    public get = async (uniqueId: UniqueId): Promise<DataType> => {
        return this.storeMapping[uniqueId];
    };
}


export class InMemoryCredentialProvider<C> extends GenericInMemoryProvider<C> implements ICredentialProvider<C>{
}

export class InMemorySecuritySchemaProvider<AS> extends GenericInMemoryProvider<ISecuritySchema<AS>> implements ISecuritySchemaProvider<AS>{
}

export class InMemoryAuthBundleProvider<M,SV,C,AS> extends GenericInMemoryProvider<IAuthProtocolBundle<M,SV,C,AS>> implements IAuthBundleProvider<M,SV,C,AS>{
}

