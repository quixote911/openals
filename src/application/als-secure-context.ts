import {ISessionRepository, Session} from "../domain/session";
import apiKeyAuthTypeBundle from "../infrastructure/auth-protocol/api-key-auth-bundle"
import {
    ICredentialProvider,
    InternetSessionRepository, ISecuritySchema, ISecuritySchemaProvider,
    ISessionStore
} from "../infrastructure/session/internet-session-repository/repo";
import {
    InMemorySecuritySchemaProvider,
    InMemorySessionStore
} from "../infrastructure/session/internet-session-repository/impl";


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
const sampleSecuritySchemaProvider = new InMemorySecuritySchemaProvider(securitySchemaData);

export class ALSSecureContext {
    private sessionRepo: ISessionRepository;
    constructor(credentialProvider: ICredentialProvider, sessionStore?: ISessionStore, securitySchemaProvider?: ISecuritySchemaProvider) {
        sessionStore = sessionStore || new InMemorySessionStore();
        securitySchemaProvider = securitySchemaProvider || sampleSecuritySchemaProvider;
        this.sessionRepo = new InternetSessionRepository(credentialProvider, sessionStore, securitySchemaProvider);
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




