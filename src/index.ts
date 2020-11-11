// import {MinimalSecureContext, GenericSecureContext, AbstractSecureContext} from "./application/secure-context";
// import {
//     ICredentialProvider,
//     ISecuritySchemaProvider,
//     ISessionStore
// } from "./infrastructure/session/generic-session-repository/repo";
// import * as impl from "./infrastructure/session/generic-session-repository/impl"
// export { SecureContext, ICredentialProvider, ISessionStore, ISecuritySchemaProvider, impl};


import {MinimalSecureContext} from "./application/secure-context";

const msc = new MinimalSecureContext({},{}, {})
msc.getSession("asd");