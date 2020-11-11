import {ICredentialProvider, ISecuritySchema, ISecuritySchemaProvider, ISessionStore} from "./repo";
import {ISessionState} from "../../../../domain/session";


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
export class InMemoryCredentialProvider implements ICredentialProvider {
    private readonly storeMapping: Record<string, unknown>;
    constructor(storeMapping: Record<string, unknown>) {
        this.storeMapping = storeMapping;
    }
    public get = async (uniqueId: string): Promise<unknown> => {
        return this.storeMapping[uniqueId];
    };
}

export class InMemorySecuritySchemaProvider implements ISecuritySchemaProvider {
    private readonly storeMapping: Record<string, ISecuritySchema>;
    constructor(storeMapping: Record<string, ISecuritySchema>) {
        this.storeMapping = storeMapping;
    }
    public get = async (uniqueId: string): Promise<ISecuritySchema> => {
        return this.storeMapping[uniqueId];
    };
}