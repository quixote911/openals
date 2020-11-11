import {ISessionRepository, Session} from "../domain/session";
import apiKeyAuthTypeBundle from "../infrastructure/impl/auth-protocol/api-key-auth-bundle"
import {
    InternetSessionRepository, ISecuritySchema, ISecuritySchemaProvider,
    ISessionStore
} from "../infrastructure/impl/session/internet-session-repository/repo";
import {
    InMemorySecuritySchemaProvider,
    InMemorySessionStore
} from "../infrastructure/impl/session/internet-session-repository/impl";


enum OAIAuthTypes {
    apiKey = "apiKey",
}

const bundleByOAIAuthType = {
    [OAIAuthTypes.apiKey]: apiKeyAuthTypeBundle,
};
type ISecuritySchemaRawData = {[uniqueId: string]: ISecuritySchema}
const securitySchemaData: ISecuritySchemaRawData = {
    "coinswitch.co": {
        bundle: bundleByOAIAuthType[OAIAuthTypes.apiKey],
        settings: {
            "name": "x-api-key",
            "in": "header",
        }
    }
}

export class SecureContext {
    private sessionRepo: ISessionRepository;
    constructor(selfCredentials: unknown, sessionStore?: ISessionStore, securitySchemaProvider?: ISecuritySchemaProvider) {
        sessionStore = sessionStore || new InMemorySessionStore();
        securitySchemaProvider = securitySchemaProvider || new InMemorySecuritySchemaProvider(securitySchemaData);
        this.sessionRepo = new InternetSessionRepository(selfCredentials, sessionStore, securitySchemaProvider);
    }
    public getSession = async (counterpartyId: string): Promise<Session> => {
        return this.sessionRepo.getOrCreate(counterpartyId);
    }
    public processIncoming = async (senderId: string, message: unknown): Promise<unknown> => {
        const session: Session = await this.sessionRepo.getOrCreate(senderId)
        return session.processIncoming(message);
    }
    public processOutgoing = async (recipientId: string, message: unknown): Promise<unknown> => {
        const session: Session = await this.sessionRepo.getOrCreate(recipientId)
        return session.processOutgoing(message);
    }

}




