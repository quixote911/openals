**[openals](../README.md)**

> [Globals](../globals.md) / ["application/secure-context"](../modules/_application_secure_context_.md) / AbstractSecureContext

# Class: AbstractSecureContext\<M, SV, C, AS>

## Type parameters

Name |
------ |
`M` |
`SV` |
`C` |
`AS` |

## Hierarchy

* **AbstractSecureContext**

  ↳ [MinimalSecureContext](_application_secure_context_.minimalsecurecontext.md)

  ↳ [GenericSecureContext](_application_secure_context_.genericsecurecontext.md)

## Index

### Constructors

* [constructor](_application_secure_context_.abstractsecurecontext.md#constructor)

### Properties

* [externalEmitter](_application_secure_context_.abstractsecurecontext.md#externalemitter)
* [sessionRepo](_application_secure_context_.abstractsecurecontext.md#sessionrepo)

### Methods

* [addEventHandlers](_application_secure_context_.abstractsecurecontext.md#addeventhandlers)
* [getSession](_application_secure_context_.abstractsecurecontext.md#getsession)
* [on](_application_secure_context_.abstractsecurecontext.md#on)
* [processIncoming](_application_secure_context_.abstractsecurecontext.md#processincoming)
* [processOutgoing](_application_secure_context_.abstractsecurecontext.md#processoutgoing)

## Constructors

### constructor

\+ `Protected`**new AbstractSecureContext**(`sessionRepo`: [ISessionRepository](../interfaces/_domain_session_.isessionrepository.md)\<M, SV, C, AS>): [AbstractSecureContext](_application_secure_context_.abstractsecurecontext.md)

*Defined in [application/secure-context.ts:19](https://github.com/quixote911/openals/blob/01e958b/src/application/secure-context.ts#L19)*

#### Parameters:

Name | Type |
------ | ------ |
`sessionRepo` | [ISessionRepository](../interfaces/_domain_session_.isessionrepository.md)\<M, SV, C, AS> |

**Returns:** [AbstractSecureContext](_application_secure_context_.abstractsecurecontext.md)

## Properties

### externalEmitter

• `Private` **externalEmitter**: Emitter\<[ISessionEvents](../interfaces/_domain_session_.isessionevents.md)\<SV>>

*Defined in [application/secure-context.ts:19](https://github.com/quixote911/openals/blob/01e958b/src/application/secure-context.ts#L19)*

___

### sessionRepo

• `Private` **sessionRepo**: [ISessionRepository](../interfaces/_domain_session_.isessionrepository.md)\<M, SV, C, AS>

*Defined in [application/secure-context.ts:18](https://github.com/quixote911/openals/blob/01e958b/src/application/secure-context.ts#L18)*

## Methods

### addEventHandlers

▸ `Private`**addEventHandlers**(`session`: [Session](_domain_session_.session.md)\<M, SV, C, AS>): void

*Defined in [application/secure-context.ts:29](https://github.com/quixote911/openals/blob/01e958b/src/application/secure-context.ts#L29)*

#### Parameters:

Name | Type |
------ | ------ |
`session` | [Session](_domain_session_.session.md)\<M, SV, C, AS> |

**Returns:** void

___

### getSession

▸ `Private`**getSession**(`selfId`: [UniqueId](../modules/_domain_session_.md#uniqueid), `counterpartyId`: [UniqueId](../modules/_domain_session_.md#uniqueid)): Promise\<[Session](_domain_session_.session.md)\<M, SV, C, AS>>

*Defined in [application/secure-context.ts:24](https://github.com/quixote911/openals/blob/01e958b/src/application/secure-context.ts#L24)*

#### Parameters:

Name | Type |
------ | ------ |
`selfId` | [UniqueId](../modules/_domain_session_.md#uniqueid) |
`counterpartyId` | [UniqueId](../modules/_domain_session_.md#uniqueid) |

**Returns:** Promise\<[Session](_domain_session_.session.md)\<M, SV, C, AS>>

___

### on

▸ **on**\<E>(`event`: E, `callback`: ISessionEvents\<SV>[E]): Unsubscribe

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

*Defined in [application/secure-context.ts:47](https://github.com/quixote911/openals/blob/01e958b/src/application/secure-context.ts#L47)*

#### Parameters:

Name | Type |
------ | ------ |
`selfId` | [UniqueId](../modules/_domain_session_.md#uniqueid) |
`recipientId` | [UniqueId](../modules/_domain_session_.md#uniqueid) |
`message` | M |

**Returns:** Promise\<M>
