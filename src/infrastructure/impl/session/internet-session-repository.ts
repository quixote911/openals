import {ISessionRepository, ISessionState, Session, SessionStatus} from "../../../domain/session";
import {AuthProtocol, IAuthProtocolBundle} from "../../../domain/auth-protocol";
import apiKeyAuthTypeBundle from "../auth-protocol/api-key-auth-bundle";
import {v4 as uuidv4} from "uuid";

interface ISecuritySchema {
    bundle: IAuthProtocolBundle;
    settings: unknown;
}



export enum OAIAuthTypes {
    apiKey= "apiKey",
}

type SessionMap = { [uniqueId: string]: Session }
type SchemaSecurityMap = { [uniqueId: string]: ISecuritySchema }
type BundleMap = { [uniqueId: string]: IAuthProtocolBundle }

export class InternetSessionRepository implements ISessionRepository {
    private selfCredentials: unknown;
    private storedSessions: SessionMap;
    private bundleByOAIAuthType: BundleMap;
    private securitySchemaStore: SchemaSecurityMap;

    constructor(selfCredentials: unknown) {
        // TODO: Further abstract out the base data structures
        this.selfCredentials = selfCredentials;
        this.storedSessions = {};
        this.bundleByOAIAuthType = {
            [OAIAuthTypes.apiKey]: apiKeyAuthTypeBundle,
        };
        this.securitySchemaStore = {
            "coinswitch.co": {
                bundle: this.bundleByOAIAuthType[OAIAuthTypes.apiKey],
                settings: {
                    "name": "x-api-key",
                    "in": "header",
                }
            }
        }
    }

    public getOrCreate = async (uniqueId: string): Promise<Session> => {
        let session;
        session = this.storedSessions[uniqueId];
        if (!session) {
            const securitySchema: ISecuritySchema = this.securitySchemaStore[uniqueId]
            const authProtocol = new AuthProtocol(securitySchema.bundle.authProtocolSchema, securitySchema.bundle.authProtocolLogic)
            session = new Session(this.getInitialSessionState(), authProtocol, this.selfCredentials, securitySchema.settings)
        }
        return session;
    };
    private getInitialSessionState = (): ISessionState => {
        return {
            sessionId: uuidv4(),
            status: SessionStatus.INIT
        }
    }

}