import {Schema} from "jsonschema";
import {Emitter} from "nanoevents";
import {
    IAuthProtocolBundle,
    IAuthProtocolContext,
    IAuthProtocolLogic,
    ISessionStateChangeEvents
} from "../../domain/auth-protocol";

class ApiKeyAuthProtocolLogic implements IAuthProtocolLogic {
    public ensureActiveSession = async (context: IAuthProtocolContext, emitter: Emitter<ISessionStateChangeEvents>): Promise<void> => {
        return;
    }
    public processIncoming = async (message: unknown, context: IAuthProtocolContext, emitter: Emitter<ISessionStateChangeEvents>): Promise<void> => {
        return;
    }
    public processOutgoing = async (message: unknown, context: IAuthProtocolContext, emitter: Emitter<ISessionStateChangeEvents>): Promise<void> => {
        (message as any).apiKey = (context.selfCredentials as any).apiKey;
        return;
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

const bundle: IAuthProtocolBundle = {
    authProtocolLogic: new ApiKeyAuthProtocolLogic(),
    authProtocolSchema: { credentialSchema },
};

export default bundle;
