import {Schema} from "jsonschema";
import {Emitter} from "nanoevents";
import {
    IAuthProtocolBundle,
    IAuthProtocolContext,
    IAuthProtocolLogic,
    ISessionStateChangeEvents
} from "../../domain/auth-protocol";
import {CoreOptions, Headers} from "request";


type M = CoreOptions;
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
        // respect the settings specified by context.authProtocolSettings
        const headers: Headers = message.headers ? message.headers : {}
        headers.apiKey = context.selfCredentials.apiKey;
        message.headers = headers;
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
