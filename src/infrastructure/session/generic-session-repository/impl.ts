import {
    IAuthBundleProvider,
    ICredentialProvider,
    ISecuritySchema,
    ISecuritySchemaProvider,
    ISessionStore
} from "./repo";
import {ISessionState} from "../../../domain/session";
import {IAuthProtocolBundle} from "../../../domain/auth-protocol";


export class InMemorySessionStore implements ISessionStore {
    private readonly store: Record<string, ISessionState>;
    constructor() {
        this.store = {}
    }
    public getByCounterpartyId = async (counterpartyId: string): Promise<ISessionState> => {
        return this.store[counterpartyId];
    };
    public save = async (uniqueId: string, sessionState: ISessionState): Promise<void> => {
        this.store[uniqueId] = sessionState;
    }
}

abstract class GenericInMemoryProvider<DataType> {
    private readonly storeMapping: Record<string, DataType>;
    constructor(storeMapping: Record<string, DataType>) {
        this.storeMapping = storeMapping;
    }
    public get = async (uniqueId: string): Promise<DataType> => {
        return this.storeMapping[uniqueId];
    };
}


export class InMemoryCredentialProvider extends GenericInMemoryProvider<unknown> {
}

export class InMemorySecuritySchemaProvider extends GenericInMemoryProvider<ISecuritySchema> {
}

export class InMemoryAuthBundleProvider extends GenericInMemoryProvider<IAuthProtocolBundle> {
}

