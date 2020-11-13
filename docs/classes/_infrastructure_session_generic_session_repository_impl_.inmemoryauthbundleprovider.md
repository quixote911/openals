**[openals](../README.md)**

> [Globals](../globals.md) / ["infrastructure/session/generic-session-repository/impl"](../modules/_infrastructure_session_generic_session_repository_impl_.md) / InMemoryAuthBundleProvider

# Class: InMemoryAuthBundleProvider\<M, SV, C, AS>

## Type parameters

Name |
------ |
`M` |
`SV` |
`C` |
`AS` |

## Hierarchy

* [GenericInMemoryProvider](_infrastructure_session_generic_session_repository_impl_.genericinmemoryprovider.md)\<[IAuthProtocolBundle](../interfaces/_domain_auth_protocol_.iauthprotocolbundle.md)\<M, SV, C, AS>>

  ↳ **InMemoryAuthBundleProvider**

## Implements

* [IAuthBundleProvider](../interfaces/_infrastructure_session_generic_session_repository_repo_.iauthbundleprovider.md)\<M, SV, C, AS>

## Index

### Constructors

* [constructor](_infrastructure_session_generic_session_repository_impl_.inmemoryauthbundleprovider.md#constructor)

### Methods

* [get](_infrastructure_session_generic_session_repository_impl_.inmemoryauthbundleprovider.md#get)

## Constructors

### constructor

\+ **new InMemoryAuthBundleProvider**(`storeMapping`: Record\<[UniqueId](../modules/_domain_session_.md#uniqueid), [IAuthProtocolBundle](../interfaces/_domain_auth_protocol_.iauthprotocolbundle.md)\<M, SV, C, AS>>): [InMemoryAuthBundleProvider](_infrastructure_session_generic_session_repository_impl_.inmemoryauthbundleprovider.md)

*Inherited from [GenericInMemoryProvider](_infrastructure_session_generic_session_repository_impl_.genericinmemoryprovider.md).[constructor](_infrastructure_session_generic_session_repository_impl_.genericinmemoryprovider.md#constructor)*

*Defined in [infrastructure/session/generic-session-repository/impl.ts:26](https://github.com/quixote911/openals/blob/01e958b/src/infrastructure/session/generic-session-repository/impl.ts#L26)*

#### Parameters:

Name | Type |
------ | ------ |
`storeMapping` | Record\<[UniqueId](../modules/_domain_session_.md#uniqueid), [IAuthProtocolBundle](../interfaces/_domain_auth_protocol_.iauthprotocolbundle.md)\<M, SV, C, AS>> |

**Returns:** [InMemoryAuthBundleProvider](_infrastructure_session_generic_session_repository_impl_.inmemoryauthbundleprovider.md)

## Methods

### get

▸ **get**(`uniqueId`: [UniqueId](../modules/_domain_session_.md#uniqueid)): Promise\<[IAuthProtocolBundle](../interfaces/_domain_auth_protocol_.iauthprotocolbundle.md)\<M, SV, C, AS>>

*Inherited from [GenericInMemoryProvider](_infrastructure_session_generic_session_repository_impl_.genericinmemoryprovider.md).[get](_infrastructure_session_generic_session_repository_impl_.genericinmemoryprovider.md#get)*

*Defined in [infrastructure/session/generic-session-repository/impl.ts:30](https://github.com/quixote911/openals/blob/01e958b/src/infrastructure/session/generic-session-repository/impl.ts#L30)*

#### Parameters:

Name | Type |
------ | ------ |
`uniqueId` | [UniqueId](../modules/_domain_session_.md#uniqueid) |

**Returns:** Promise\<[IAuthProtocolBundle](../interfaces/_domain_auth_protocol_.iauthprotocolbundle.md)\<M, SV, C, AS>>
