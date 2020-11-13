**[openals](../README.md)**

> [Globals](../globals.md) / ["application/secure-context"](../modules/_application_secure_context_.md) / MinimalSecureContext

# Class: MinimalSecureContext\<M, SV, C, AS>

## Type parameters

Name |
------ |
`M` |
`SV` |
`C` |
`AS` |

## Hierarchy

* [AbstractSecureContext](_application_secure_context_.abstractsecurecontext.md)\<M, SV, C, AS>

  ↳ **MinimalSecureContext**

## Index

### Constructors

* [constructor](_application_secure_context_.minimalsecurecontext.md#constructor)

### Methods

* [on](_application_secure_context_.minimalsecurecontext.md#on)
* [processIncoming](_application_secure_context_.minimalsecurecontext.md#processincoming)
* [processOutgoing](_application_secure_context_.minimalsecurecontext.md#processoutgoing)

## Constructors

### constructor

\+ **new MinimalSecureContext**(`credentialMapping`: Record\<[UniqueId](../modules/_domain_session_.md#uniqueid), C>, `authBundleMapping`: Record\<[UniqueId](../modules/_domain_session_.md#uniqueid), [IAuthProtocolBundle](../interfaces/_domain_auth_protocol_.iauthprotocolbundle.md)\<M, SV, C, AS>>, `securitySchemaMapping`: Record\<[UniqueId](../modules/_domain_session_.md#uniqueid), [ISecuritySchema](../interfaces/_infrastructure_session_generic_session_repository_repo_.isecurityschema.md)\<AS>>): [MinimalSecureContext](_application_secure_context_.minimalsecurecontext.md)

*Overrides [AbstractSecureContext](_application_secure_context_.abstractsecurecontext.md).[constructor](_application_secure_context_.abstractsecurecontext.md#constructor)*

*Defined in [application/secure-context.ts:53](https://github.com/quixote911/openals/blob/01e958b/src/application/secure-context.ts#L53)*

#### Parameters:

Name | Type |
------ | ------ |
`credentialMapping` | Record\<[UniqueId](../modules/_domain_session_.md#uniqueid), C> |
`authBundleMapping` | Record\<[UniqueId](../modules/_domain_session_.md#uniqueid), [IAuthProtocolBundle](../interfaces/_domain_auth_protocol_.iauthprotocolbundle.md)\<M, SV, C, AS>> |
`securitySchemaMapping` | Record\<[UniqueId](../modules/_domain_session_.md#uniqueid), [ISecuritySchema](../interfaces/_infrastructure_session_generic_session_repository_repo_.isecurityschema.md)\<AS>> |

**Returns:** [MinimalSecureContext](_application_secure_context_.minimalsecurecontext.md)

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
