**[openals](../README.md)**

> [Globals](../globals.md) / ["application/secure-context"](../modules/_application_secure_context_.md) / GenericSecureContext

# Class: GenericSecureContext\<M, SV, C, AS>

## Type parameters

Name |
------ |
`M` |
`SV` |
`C` |
`AS` |

## Hierarchy

* [AbstractSecureContext](_application_secure_context_.abstractsecurecontext.md)\<M, SV, C, AS>

  ↳ **GenericSecureContext**

## Index

### Constructors

* [constructor](_application_secure_context_.genericsecurecontext.md#constructor)

### Methods

* [on](_application_secure_context_.genericsecurecontext.md#on)
* [processIncoming](_application_secure_context_.genericsecurecontext.md#processincoming)
* [processOutgoing](_application_secure_context_.genericsecurecontext.md#processoutgoing)

## Constructors

### constructor

\+ **new GenericSecureContext**(`credentialProvider`: [ICredentialProvider](../interfaces/_infrastructure_session_generic_session_repository_repo_.icredentialprovider.md)\<C>, `sessionStore`: [ISessionStore](../interfaces/_infrastructure_session_generic_session_repository_repo_.isessionstore.md)\<SV>, `securitySchemaProvider`: [ISecuritySchemaProvider](../interfaces/_infrastructure_session_generic_session_repository_repo_.isecurityschemaprovider.md)\<AS>, `authBundleProvider`: [IAuthBundleProvider](../interfaces/_infrastructure_session_generic_session_repository_repo_.iauthbundleprovider.md)\<M, SV, C, AS>): [GenericSecureContext](_application_secure_context_.genericsecurecontext.md)

*Overrides [AbstractSecureContext](_application_secure_context_.abstractsecurecontext.md).[constructor](_application_secure_context_.abstractsecurecontext.md#constructor)*

*Defined in [application/secure-context.ts:66](https://github.com/quixote911/openals/blob/01e958b/src/application/secure-context.ts#L66)*

#### Parameters:

Name | Type |
------ | ------ |
`credentialProvider` | [ICredentialProvider](../interfaces/_infrastructure_session_generic_session_repository_repo_.icredentialprovider.md)\<C> |
`sessionStore` | [ISessionStore](../interfaces/_infrastructure_session_generic_session_repository_repo_.isessionstore.md)\<SV> |
`securitySchemaProvider` | [ISecuritySchemaProvider](../interfaces/_infrastructure_session_generic_session_repository_repo_.isecurityschemaprovider.md)\<AS> |
`authBundleProvider` | [IAuthBundleProvider](../interfaces/_infrastructure_session_generic_session_repository_repo_.iauthbundleprovider.md)\<M, SV, C, AS> |

**Returns:** [GenericSecureContext](_application_secure_context_.genericsecurecontext.md)

## Methods

### on

▸ **on**\<E>(`event`: E, `callback`: ISessionEvents\<SV>[E]): Unsubscribe

*Inherited from [AbstractSecureContext](_application_secure_context_.abstractsecurecontext.md).[on](_application_secure_context_.abstractsecurecontext.md#on)*

*Defined in [application/secure-context.ts:40](https://github.com/quixote911/openals/blob/01e958b/src/application/secure-context.ts#L40)*

#### Type parameters:

Name | Type |
------ | ------ |
`E` | keyof [ISessionEvents](../interfaces/_domain_session_.isessionevents.md)\<SV> |

#### Parameters:

Name | Type |
------ | ------ |
`event` | E |
`callback` | ISessionEvents\<SV>[E] |

**Returns:** Unsubscribe

___

### processIncoming

▸ **processIncoming**(`selfId`: [UniqueId](../modules/_domain_session_.md#uniqueid), `senderId`: [UniqueId](../modules/_domain_session_.md#uniqueid), `message`: M): Promise\<M>

*Inherited from [AbstractSecureContext](_application_secure_context_.abstractsecurecontext.md).[processIncoming](_application_secure_context_.abstractsecurecontext.md#processincoming)*

*Defined in [application/secure-context.ts:43](https://github.com/quixote911/openals/blob/01e958b/src/application/secure-context.ts#L43)*

#### Parameters:

Name | Type |
------ | ------ |
`selfId` | [UniqueId](../modules/_domain_session_.md#uniqueid) |
`senderId` | [UniqueId](../modules/_domain_session_.md#uniqueid) |
`message` | M |

**Returns:** Promise\<M>

___

### processOutgoing

▸ **processOutgoing**(`selfId`: [UniqueId](../modules/_domain_session_.md#uniqueid), `recipientId`: [UniqueId](../modules/_domain_session_.md#uniqueid), `message`: M): Promise\<M>

*Inherited from [AbstractSecureContext](_application_secure_context_.abstractsecurecontext.md).[processOutgoing](_application_secure_context_.abstractsecurecontext.md#processoutgoing)*

*Defined in [application/secure-context.ts:47](https://github.com/quixote911/openals/blob/01e958b/src/application/secure-context.ts#L47)*

#### Parameters:

Name | Type |
------ | ------ |
`selfId` | [UniqueId](../modules/_domain_session_.md#uniqueid) |
`recipientId` | [UniqueId](../modules/_domain_session_.md#uniqueid) |
`message` | M |

**Returns:** Promise\<M>
