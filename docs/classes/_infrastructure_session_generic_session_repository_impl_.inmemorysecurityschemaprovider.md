**[openals](../README.md)**

> [Globals](../globals.md) / ["infrastructure/session/generic-session-repository/impl"](../modules/_infrastructure_session_generic_session_repository_impl_.md) / InMemorySecuritySchemaProvider

# Class: InMemorySecuritySchemaProvider\<AS>

## Type parameters

Name |
------ |
`AS` |

## Hierarchy

* [GenericInMemoryProvider](_infrastructure_session_generic_session_repository_impl_.genericinmemoryprovider.md)\<[ISecuritySchema](../interfaces/_infrastructure_session_generic_session_repository_repo_.isecurityschema.md)\<AS>>

  ↳ **InMemorySecuritySchemaProvider**

## Implements

* [ISecuritySchemaProvider](../interfaces/_infrastructure_session_generic_session_repository_repo_.isecurityschemaprovider.md)\<AS>

## Index

### Constructors

* [constructor](_infrastructure_session_generic_session_repository_impl_.inmemorysecurityschemaprovider.md#constructor)

### Methods

* [get](_infrastructure_session_generic_session_repository_impl_.inmemorysecurityschemaprovider.md#get)

## Constructors

### constructor

\+ **new InMemorySecuritySchemaProvider**(`storeMapping`: Record\<[UniqueId](../modules/_domain_session_.md#uniqueid), [ISecuritySchema](../interfaces/_infrastructure_session_generic_session_repository_repo_.isecurityschema.md)\<AS>>): [InMemorySecuritySchemaProvider](_infrastructure_session_generic_session_repository_impl_.inmemorysecurityschemaprovider.md)

*Inherited from [GenericInMemoryProvider](_infrastructure_session_generic_session_repository_impl_.genericinmemoryprovider.md).[constructor](_infrastructure_session_generic_session_repository_impl_.genericinmemoryprovider.md#constructor)*

*Defined in [infrastructure/session/generic-session-repository/impl.ts:26](https://github.com/quixote911/openals/blob/01e958b/src/infrastructure/session/generic-session-repository/impl.ts#L26)*

#### Parameters:

Name | Type |
------ | ------ |
`storeMapping` | Record\<[UniqueId](../modules/_domain_session_.md#uniqueid), [ISecuritySchema](../interfaces/_infrastructure_session_generic_session_repository_repo_.isecurityschema.md)\<AS>> |

**Returns:** [InMemorySecuritySchemaProvider](_infrastructure_session_generic_session_repository_impl_.inmemorysecurityschemaprovider.md)

## Methods

### get

▸ **get**(`uniqueId`: [UniqueId](../modules/_domain_session_.md#uniqueid)): Promise\<[ISecuritySchema](../interfaces/_infrastructure_session_generic_session_repository_repo_.isecurityschema.md)\<AS>>

*Inherited from [GenericInMemoryProvider](_infrastructure_session_generic_session_repository_impl_.genericinmemoryprovider.md).[get](_infrastructure_session_generic_session_repository_impl_.genericinmemoryprovider.md#get)*

*Defined in [infrastructure/session/generic-session-repository/impl.ts:30](https://github.com/quixote911/openals/blob/01e958b/src/infrastructure/session/generic-session-repository/impl.ts#L30)*

#### Parameters:

Name | Type |
------ | ------ |
`uniqueId` | [UniqueId](../modules/_domain_session_.md#uniqueid) |

**Returns:** Promise\<[ISecuritySchema](../interfaces/_infrastructure_session_generic_session_repository_repo_.isecurityschema.md)\<AS>>
