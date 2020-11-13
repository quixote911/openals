**[openals](../README.md)**

> [Globals](../globals.md) / ["infrastructure/session/generic-session-repository/impl"](../modules/_infrastructure_session_generic_session_repository_impl_.md) / InMemorySessionStore

# Class: InMemorySessionStore\<SV>

## Type parameters

Name |
------ |
`SV` |

## Hierarchy

* **InMemorySessionStore**

## Implements

* [ISessionStore](../interfaces/_infrastructure_session_generic_session_repository_repo_.isessionstore.md)\<SV>

## Index

### Constructors

* [constructor](_infrastructure_session_generic_session_repository_impl_.inmemorysessionstore.md#constructor)

### Properties

* [store](_infrastructure_session_generic_session_repository_impl_.inmemorysessionstore.md#store)

### Methods

* [getBySessionId](_infrastructure_session_generic_session_repository_impl_.inmemorysessionstore.md#getbysessionid)
* [save](_infrastructure_session_generic_session_repository_impl_.inmemorysessionstore.md#save)

## Constructors

### constructor

\+ **new InMemorySessionStore**(): [InMemorySessionStore](_infrastructure_session_generic_session_repository_impl_.inmemorysessionstore.md)

*Defined in [infrastructure/session/generic-session-repository/impl.ts:13](https://github.com/quixote911/openals/blob/01e958b/src/infrastructure/session/generic-session-repository/impl.ts#L13)*

**Returns:** [InMemorySessionStore](_infrastructure_session_generic_session_repository_impl_.inmemorysessionstore.md)

## Properties

### store

• `Private` `Readonly` **store**: Record\<[UniqueId](../modules/_domain_session_.md#uniqueid), [ISessionState](../interfaces/_domain_session_.isessionstate.md)\<SV>>

*Defined in [infrastructure/session/generic-session-repository/impl.ts:13](https://github.com/quixote911/openals/blob/01e958b/src/infrastructure/session/generic-session-repository/impl.ts#L13)*

## Methods

### getBySessionId

▸ **getBySessionId**(`sessionId`: [UniqueId](../modules/_domain_session_.md#uniqueid)): Promise\<[ISessionState](../interfaces/_domain_session_.isessionstate.md)\<SV>>

*Defined in [infrastructure/session/generic-session-repository/impl.ts:20](https://github.com/quixote911/openals/blob/01e958b/src/infrastructure/session/generic-session-repository/impl.ts#L20)*

#### Parameters:

Name | Type |
------ | ------ |
`sessionId` | [UniqueId](../modules/_domain_session_.md#uniqueid) |

**Returns:** Promise\<[ISessionState](../interfaces/_domain_session_.isessionstate.md)\<SV>>

___

### save

▸ **save**(`sessionState`: [ISessionState](../interfaces/_domain_session_.isessionstate.md)\<SV>): Promise\<void>

*Defined in [infrastructure/session/generic-session-repository/impl.ts:17](https://github.com/quixote911/openals/blob/01e958b/src/infrastructure/session/generic-session-repository/impl.ts#L17)*

#### Parameters:

Name | Type |
------ | ------ |
`sessionState` | [ISessionState](../interfaces/_domain_session_.isessionstate.md)\<SV> |

**Returns:** Promise\<void>
