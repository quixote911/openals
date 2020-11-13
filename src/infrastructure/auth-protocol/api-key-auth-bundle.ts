import {Schema} from "jsonschema";
import {Emitter} from "nanoevents";
import {
    IAuthProtocolBundle,
    IAuthProtocolContext,
    IAuthProtocolLogic,
    ISessionStateChangeEvents
} from "../../domain/auth-protocol";
import {Headers} from "request";
import {Header, Request as PostmanCollectionRequest} from "postman-collection"


type M = PostmanCollectionRequest;
type SV = void;
interface C {
    apiKey: string;
}
interface AS {
    name: string;
    in: string;
}

class ApiKeyAuthProtocolLogic implements IAuthProtocolLogic<M,SV,C,AS> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public ensureActiveSession = async (context: IAuthProtocolContext<SV,C,AS>, emitter: Emitter<ISessionStateChangeEvents<SV>>): Promise<void> => {
        return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public processIncoming = async (message: M, context: IAuthProtocolContext<SV,C,AS>, emitter: Emitter<ISessionStateChangeEvents<SV>>): Promise<M> => {
        return message;
    }
    public processOutgoing = async (message: M, context: IAuthProtocolContext<SV,C,AS>, emitter: Emitter<ISessionStateChangeEvents<SV>>): Promise<M> => {
        if (!context.authProtocolSettings) {
            throw Error("Settings must be there");
        }
        switch(context.authProtocolSettings.in) {
            case "header": {
                const headers: Headers = message.headers ? message.headers : {}
                headers.apiKey = context.selfCredentials.apiKey;
                message.addHeader(new Header({key: context.authProtocolSettings.name, value: context.selfCredentials.apiKey}))
                break;
            }
            default: {
                throw Error("Invalid setting for in");
            }
        }
        return message;
    }

}

const credentialSchema: Schema = {
    type: "object",
    required: ["apiKey"],
    properties: {
        apiKey: {
            type: "string",
        },
    },
};

const bundle: IAuthProtocolBundle<M,SV,C,AS> = {
    authProtocolLogic: new ApiKeyAuthProtocolLogic(),
    authProtocolSchema: { credentialSchema },
};

export default bundle;
