import {GenericSecureContext, MinimalSecureContext} from "./secure-context";
import apiKeyAuthBundle from "./../infrastructure/auth-protocol/api-key-auth-bundle"
import {CoreOptions} from "request";
import {
    InMemoryAuthBundleProvider,
    InMemoryCredentialProvider, InMemorySecuritySchemaProvider,
    InMemorySessionStore
} from "../infrastructure/session/generic-session-repository/impl";
import {IAuthBundleProvider} from "../infrastructure/session/generic-session-repository/repo";
import {ISessionState} from "../domain/session";
import {Request} from "postman-collection";

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


            type SV = void;
            const sessionStore = new InMemorySessionStore<SV>();

            type C = {apiKey: string}
            const credentialProvider = new InMemoryCredentialProvider<C>(testCredentialMapping);


            type AS = {name: string, in: string}
            const securitySchemaProvider = new InMemorySecuritySchemaProvider<AS>(securitySchemaMapping);


            type M = Request
            const authBundleProvider: IAuthBundleProvider<M,SV,C,AS> = new InMemoryAuthBundleProvider(authBundleMapping)

            const secureContext = new GenericSecureContext<M,SV,C,AS>(
                credentialProvider,
                sessionStore,
                securitySchemaProvider,
                authBundleProvider
            );
            // const session = await secureContext.getSession("localhost", "coinswitch.co")
            // session.on("stateChanged", (sessionState: ISessionState) => {
            //     secureContext.
            // })
            // const newMessage = session.processOutgoing(message);
        });
    });
    describe("Testing Minimal Secure Context", () => {
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
        it("instantiates with valid inputs", () => {
            type M = Request
            type SV = void;
            type C = {apiKey: string}
            type AS = {name: string, in: string}
            const msc = new MinimalSecureContext<M,SV,C,AS>(testCredentialMapping, authBundleMapping, securitySchemaMapping);
        });
    });
});