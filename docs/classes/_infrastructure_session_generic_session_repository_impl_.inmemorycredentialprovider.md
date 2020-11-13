**[openals](../README.md)**

> [Globals](../globals.md) / ["infrastructure/session/generic-session-repository/impl"](../modules/_infrastructure_session_generic_session_repository_impl_.md) / InMemoryCredentialProvider

# Class: InMemoryCredentialProvider\<C>

## Type parameters

Name |
------ |
`C` |

## Hierarchy

* [GenericInMemoryProvider](_infrastructure_session_generic_session_repository_impl_.genericinmemoryprovider.md)\<C>

  ↳ **InMemoryCredentialProvider**

## Implements

* [ICredentialProvider](../interfaces/_infrastructure_session_generic_session_repository_repo_.icredentialprovider.md)\<C>

## Index

### Constructors

* [constructor](_infrastructure_session_generic_session_repository_impl_.inmemorycredentialprovider.md#constructor)

### Methods

* [get](_infrastructure_session_generic_session_repository_impl_.inmemorycredentialprovider.md#get)

## Constructors

### constructor

\+ **new InMemoryCredentialProvider**(`storeMapping`: Record\<[UniqueId](../modules/_domain_session_.md#uniqueid), C>): [InMemoryCredentialProvider](_infrastructure_session_generic_session_repository_impl_.inmemorycredentialprovider.md)

*Inherited from [GenericInMemoryProvider](_infrastructure_session_generic_session_repository_impl_.genericinmemoryprovider.md).[constructor](_infrastructure_session_generic_session_repository_impl_.genericinmemoryprovider.md#constructor)*

*Defined in [infrastructure/session/generic-session-repository/impl.ts:26](https://github.com/quixote911/openals/blob/01e958b/src/infrastructure/session/generic-session-repository/impl.ts#L26)*

#### Parameters:

Name | Type |
------ | ------ |
`storeMapping` | Record\<[UniqueId](../modules/_domain_session_.md#uniqueid), C> |

**Returns:** [InMemoryCredentialProvider](_infrastructure_session_generic_session_repository_impl_.inmemorycredentialprovider.md)

## Methods

### get

▸ **get**(`uniqueId`: [UniqueId](../modules/_domain_session_.md#uniqueid)): Promise\<C>

*Inherited from [GenericInMemoryProvider](_infrastructure_session_generic_session_repository_impl_.genericinmemoryprovider.md).[get](_infrastructure_session_generic_session_repository_impl_.genericinmemoryprovider.md#get)*

*Defined in [infrastructure/session/generic-session-repository/impl.ts:30](https://github.com/quixote911/openals/blob/01e958b/src/infrastructure/session/generic-session-repository/impl.ts#L30)*

#### Parameters:

Name | Type |
------ | ------ |
`uniqueId` | [UniqueId](../modules/_domain_session_.md#uniqueid) |

**Returns:** Promise\<C>
