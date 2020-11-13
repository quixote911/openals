import {GenericSecureContext} from "./secure-context";
import apiKeyAuthBundle from "./../infrastructure/auth-protocol/api-key-auth-bundle"
import {
    InMemoryAuthBundleProvider,
    InMemoryCredentialProvider, InMemorySecuritySchemaProvider,
    InMemorySessionStore
} from "../infrastructure/session/generic-session-repository/impl";
import {IAuthBundleProvider} from "../infrastructure/session/generic-session-repository/repo";
import {Request} from "postman-collection";
import {ISessionState} from "../domain/session";

describe("Testing  Secure Context", () => {
    describe("Testing Generic Secure Context", () => {
        const testCredentialMapping = {
            "myCoinswitchApp1": {
                "apiKey": "fookey"
            }
        }
        const authBundleMapping = {
            "apiKey": apiKeyAuthBundle
        }
        const securitySchemaMapping = {
            "coinswitch.co": {
                authType: "apiKey",
                settings: {
                    "name": "x-api-key",
                    "in": "header",
                }
            }
        }
        it("instantiates with valid inputs", async () => {
            const sessionStore = new InMemorySessionStore();
            const credentialProvider = new InMemoryCredentialProvider(testCredentialMapping);
            const securitySchemaProvider = new InMemorySecuritySchemaProvider(securitySchemaMapping);
            const authBundleProvider: IAuthBundleProvider = new InMemoryAuthBundleProvider(authBundleMapping)

            const secureContext = new GenericSecureContext<Request>(
                credentialProvider,
                sessionStore,
                securitySchemaProvider,
                authBundleProvider
            );

            type AS = {name: string, in: string}
            type C = {apiKey: string}
            type SV = void;
            const session = await secureContext.getSession<SV,C,AS>("localhost", "coinswitch.co")
            session.on("stateChanged", (sessionState: ISessionState<SV>) => {
                console.log(sessionState);
            })
        });
    });
});