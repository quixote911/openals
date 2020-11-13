**[openals](../README.md)**

> [Globals](../globals.md) / ["infrastructure/session/generic-session-repository/impl"](../modules/_infrastructure_session_generic_session_repository_impl_.md) / GenericInMemoryProvider

# Class: GenericInMemoryProvider\<DataType>

## Type parameters

Name |
------ |
`DataType` |

## Hierarchy

* **GenericInMemoryProvider**

  ↳ [InMemoryCredentialProvider](_infrastructure_session_generic_session_repository_impl_.inmemorycredentialprovider.md)

  ↳ [InMemorySecuritySchemaProvider](_infrastructure_session_generic_session_repository_impl_.inmemorysecurityschemaprovider.md)

  ↳ [InMemoryAuthBundleProvider](_infrastructure_session_generic_session_repository_impl_.inmemoryauthbundleprovider.md)

## Index

### Constructors

* [constructor](_infrastructure_session_generic_session_repository_impl_.genericinmemoryprovider.md#constructor)

### Properties

* [storeMapping](_infrastructure_session_generic_session_repository_impl_.genericinmemoryprovider.md#storemapping)

### Methods

* [get](_infrastructure_session_generic_session_repository_impl_.genericinmemoryprovider.md#get)

## Constructors

### constructor

\+ **new GenericInMemoryProvider**(`storeMapping`: Record\<[UniqueId](../modules/_domain_session_.md#uniqueid), DataType>): [GenericInMemoryProvider](_infrastructure_session_generic_session_repository_impl_.genericinmemoryprovider.md)

*Defined in [infrastructure/session/generic-session-repository/impl.ts:26](https://github.com/quixote911/openals/blob/01e958b/src/infrastructure/session/generic-session-repository/impl.ts#L26)*

#### Parameters:

Name | Type |
------ | ------ |
`storeMapping` | Record\<[UniqueId](../modules/_domain_session_.md#uniqueid), DataType> |

**Returns:** [GenericInMemoryProvider](_infrastructure_session_generic_session_repository_impl_.genericinmemoryprovider.md)

## Properties

### storeMapping

• `Private` `Readonly` **storeMapping**: Record\<[UniqueId](../modules/_domain_session_.md#uniqueid), DataType>

*Defined in [infrastructure/session/generic-session-repository/impl.ts:26](https://github.com/quixote911/openals/blob/01e958b/src/infrastructure/session/generic-session-repository/impl.ts#L26)*

## Methods

### get

▸ **get**(`uniqueId`: [UniqueId](../modules/_domain_session_.md#uniqueid)): Promise\<DataType>

*Defined in [infrastructure/session/generic-session-repository/impl.ts:30](https://github.com/quixote911/openals/blob/01e958b/src/infrastructure/session/generic-session-repository/impl.ts#L30)*

#### Parameters:

Name | Type |
------ | ------ |
`uniqueId` | [UniqueId](../modules/_domain_session_.md#uniqueid) |

**Returns:** Promise\<DataType>
