**[openals](../README.md)**

> [Globals](../globals.md) / ["infrastructure/session/generic-session-repository/repo"](../modules/_infrastructure_session_generic_session_repository_repo_.md) / GenericSessionRepository

# Class: GenericSessionRepository\<M, SV, C, AS>

## Type parameters

Name |
------ |
`M` |
`SV` |
`C` |
`AS` |

## Hierarchy

* **GenericSessionRepository**

## Implements

* [ISessionRepository](../interfaces/_domain_session_.isessionrepository.md)\<M, SV, C, AS>

## Index

### Constructors

* [constructor](_infrastructure_session_generic_session_repository_repo_.genericsessionrepository.md#constructor)

### Properties

* [authBundleProvider](_infrastructure_session_generic_session_repository_repo_.genericsessionrepository.md#authbundleprovider)
* [credentialProvider](_infrastructure_session_generic_session_repository_repo_.genericsessionrepository.md#credentialprovider)
* [securitySchemaStore](_infrastructure_session_generic_session_repository_repo_.genericsessionrepository.md#securityschemastore)
* [sessionStore](_infrastructure_session_generic_session_repository_repo_.genericsessionrepository.md#sessionstore)

### Methods

* [get](_infrastructure_session_generic_session_repository_repo_.genericsessionrepository.md#get)
* [getInitialSessionState](_infrastructure_session_generic_session_repository_repo_.genericsessionrepository.md#getinitialsessionstate)
* [getSessionId](_infrastructure_session_generic_session_repository_repo_.genericsessionrepository.md#getsessionid)
* [save](_infrastructure_session_generic_session_repository_repo_.genericsessionrepository.md#save)

## Constructors

### constructor

\+ **new GenericSessionRepository**(`credentialProvider`: [ICredentialProvider](../interfaces/_infrastructure_session_generic_session_repository_repo_.icredentialprovider.md)\<C>, `sessionStore`: [ISessionStore](../interfaces/_infrastructure_session_generic_session_repository_repo_.isessionstore.md)\<SV>, `securitySchemaStore`: [ISecuritySchemaProvider](../interfaces/_infrastructure_session_generic_session_repository_repo_.isecurityschemaprovider.md)\<AS>, `authBundleProvider`: [IAuthBundleProvider](../interfaces/_infrastructure_session_generic_session_repository_repo_.iauthbundleprovider.md)\<M, SV, C, AS>): [GenericSessionRepository](_infrastructure_session_generic_session_repository_repo_.genericsessionrepository.md)

*Defined in [infrastructure/session/generic-session-repository/repo.ts:33](https://github.com/quixote911/openals/blob/01e958b/src/infrastructure/session/generic-session-repository/repo.ts#L33)*

#### Parameters:

Name | Type |
------ | ------ |
`credentialProvider` | [ICredentialProvider](../interfaces/_infrastructure_session_generic_session_repository_repo_.icredentialprovider.md)\<C> |
`sessionStore` | [ISessionStore](../interfaces/_infrastructure_session_generic_session_repository_repo_.isessionstore.md)\<SV> |
`securitySchemaStore` | [ISecuritySchemaProvider](../interfaces/_infrastructure_session_generic_session_repository_repo_.isecurityschemaprovider.md)\<AS> |
`authBundleProvider` | [IAuthBundleProvider](../interfaces/_infrastructure_session_generic_session_repository_repo_.iauthbundleprovider.md)\<M, SV, C, AS> |

**Returns:** [GenericSessionRepository](_infrastructure_session_generic_session_repository_repo_.genericsessionrepository.md)

## Properties

### authBundleProvider

• `Private` **authBundleProvider**: [IAuthBundleProvider](../interfaces/_infrastructure_session_generic_session_repository_repo_.iauthbundleprovider.md)\<M, SV, C, AS>

*Defined in [infrastructure/session/generic-session-repository/repo.ts:33](https://github.com/quixote911/openals/blob/01e958b/src/infrastructure/session/generic-session-repository/repo.ts#L33)*

___

### credentialProvider

• `Private` **credentialProvider**: [ICredentialProvider](../interfaces/_infrastructure_session_generic_session_repository_repo_.icredentialprovider.md)\<C>

*Defined in [infrastructure/session/generic-session-repository/repo.ts:32](https://github.com/quixote911/openals/blob/01e958b/src/infrastructure/session/generic-session-repository/repo.ts#L32)*

___

### securitySchemaStore

• `Private` **securitySchemaStore**: [ISecuritySchemaProvider](../interfaces/_infrastructure_session_generic_session_repository_repo_.isecurityschemaprovider.md)\<AS>

*Defined in [infrastructure/session/generic-session-repository/repo.ts:31](https://github.com/quixote911/openals/blob/01e958b/src/infrastructure/session/generic-session-repository/repo.ts#L31)*

___

### sessionStore

• `Private` **sessionStore**: [ISessionStore](../interfaces/_infrastructure_session_generic_session_repository_repo_.isessionstore.md)\<SV>

*Defined in [infrastructure/session/generic-session-repository/repo.ts:30](https://github.com/quixote911/openals/blob/01e958b/src/infrastructure/session/generic-session-repository/repo.ts#L30)*

## Methods

### get

▸ **get**(`selfUniqueId`: [UniqueId](../modules/_domain_session_.md#uniqueid), `counterPartyUniqueId`: [UniqueId](../modules/_domain_session_.md#uniqueid)): Promise\<[Session](_domain_session_.session.md)\<M, SV, C, AS>>

*Defined in [infrastructure/session/generic-session-repository/repo.ts:45](https://github.com/quixote911/openals/blob/01e958b/src/infrastructure/session/generic-session-repository/repo.ts#L45)*

#### Parameters:

Name | Type |
------ | ------ |
`selfUniqueId` | [UniqueId](../modules/_domain_session_.md#uniqueid) |
`counterPartyUniqueId` | [UniqueId](../modules/_domain_session_.md#uniqueid) |

**Returns:** Promise\<[Session](_domain_session_.session.md)\<M, SV, C, AS>>

___

### getInitialSessionState

▸ `Private`**getInitialSessionState**(`selfUniqueId`: [UniqueId](../modules/_domain_session_.md#uniqueid), `counterpartyUniqueId`: [UniqueId](../modules/_domain_session_.md#uniqueid)): [ISessionState](../interfaces/_domain_session_.isessionstate.md)\<SV>

*Defined in [infrastructure/session/generic-session-repository/repo.ts:68](https://github.com/quixote911/openals/blob/01e958b/src/infrastructure/session/generic-session-repository/repo.ts#L68)*

#### Parameters:

Name | Type |
------ | ------ |
`selfUniqueId` | [UniqueId](../modules/_domain_session_.md#uniqueid) |
`counterpartyUniqueId` | [UniqueId](../modules/_domain_session_.md#uniqueid) |

**Returns:** [ISessionState](../interfaces/_domain_session_.isessionstate.md)\<SV>

___

### getSessionId

▸ `Private`**getSessionId**(`selfUniqueId`: [UniqueId](../modules/_domain_session_.md#uniqueid), `counterpartyUniqueId`: [UniqueId](../modules/_domain_session_.md#uniqueid)): [UniqueId](../modules/_domain_session_.md#uniqueid)

*Defined in [infrastructure/session/generic-session-repository/repo.ts:65](https://github.com/quixote911/openals/blob/01e958b/src/infrastructure/session/generic-session-repository/repo.ts#L65)*

#### Parameters:

Name | Type |
------ | ------ |
`selfUniqueId` | [UniqueId](../modules/_domain_session_.md#uniqueid) |
`counterpartyUniqueId` | [UniqueId](../modules/_domain_session_.md#uniqueid) |

**Returns:** [UniqueId](../modules/_domain_session_.md#uniqueid)

___

### save

▸ **save**(`session`: [Session](_domain_session_.session.md)\<M, SV, C, AS>): Promise\<void>

*Defined in [infrastructure/session/generic-session-repository/repo.ts:42](https://github.com/quixote911/openals/blob/01e958b/src/infrastructure/session/generic-session-repository/repo.ts#L42)*

#### Parameters:

Name | Type |
------ | ------ |
`session` | [Session](_domain_session_.session.md)\<M, SV, C, AS> |

**Returns:** Promise\<void>
