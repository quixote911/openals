import {Schema} from "jsonschema";
import {Emitter} from "nanoevents";
import {
    IAuthProtocolBundle,
    IAuthProtocolContext,
    IAuthProtocolLogic,
    ISessionStateChangeEvents
} from "../../domain/auth-protocol";

// TODO: Implement these types in this bundle
interface M {}
interface SV {}
interface C {}
interface AS {}
class ApiKeyAuthProtocolLogic implements IAuthProtocolLogic<M,SV,C,AS> {
    public ensureActiveSession = async (context: IAuthProtocolContext<SV,C,AS>, emitter: Emitter<ISessionStateChangeEvents<SV>>): Promise<void> => {
        return;
    }
    public processIncoming = async (message: M, context: IAuthProtocolContext<SV,C,AS>, emitter: Emitter<ISessionStateChangeEvents<SV>>): Promise<M> => {
        return message;
    }
    public processOutgoing = async (message: M, context: IAuthProtocolContext<SV,C,AS>, emitter: Emitter<ISessionStateChangeEvents<SV>>): Promise<M> => {
        message.apiKey = (context.selfCredentials as any).apiKey;
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
