import {MinimalSecureContext} from "./secure-context";
import apiKeyAuthBundle from "./../infrastructure/auth-protocol/api-key-auth-bundle"
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
        const msc = new MinimalSecureContext(testCredentialMapping, authBundleMapping, securitySchemaMapping);
    });
});
