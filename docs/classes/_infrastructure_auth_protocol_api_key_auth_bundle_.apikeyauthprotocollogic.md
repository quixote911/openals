**[openals](../README.md)**

> [Globals](../globals.md) / ["infrastructure/auth-protocol/api-key-auth-bundle"](../modules/_infrastructure_auth_protocol_api_key_auth_bundle_.md) / ApiKeyAuthProtocolLogic

# Class: ApiKeyAuthProtocolLogic

## Hierarchy

* **ApiKeyAuthProtocolLogic**

## Implements

* [IAuthProtocolLogic](../interfaces/_domain_auth_protocol_.iauthprotocollogic.md)\<[M](../modules/_infrastructure_auth_protocol_api_key_auth_bundle_.md#m), [SV](../modules/_infrastructure_auth_protocol_api_key_auth_bundle_.md#sv), [C](../interfaces/_infrastructure_auth_protocol_api_key_auth_bundle_.c.md), [AS](../interfaces/_infrastructure_auth_protocol_api_key_auth_bundle_.as.md)>

## Index

### Methods

* [ensureActiveSession](_infrastructure_auth_protocol_api_key_auth_bundle_.apikeyauthprotocollogic.md#ensureactivesession)
* [processIncoming](_infrastructure_auth_protocol_api_key_auth_bundle_.apikeyauthprotocollogic.md#processincoming)
* [processOutgoing](_infrastructure_auth_protocol_api_key_auth_bundle_.apikeyauthprotocollogic.md#processoutgoing)

## Methods

### ensureActiveSession

▸ **ensureActiveSession**(`context`: [IAuthProtocolContext](../interfaces/_domain_auth_protocol_.iauthprotocolcontext.md)\<[SV](../modules/_infrastructure_auth_protocol_api_key_auth_bundle_.md#sv), [C](../interfaces/_infrastructure_auth_protocol_api_key_auth_bundle_.c.md), [AS](../interfaces/_infrastructure_auth_protocol_api_key_auth_bundle_.as.md)>, `emitter`: Emitter\<[ISessionStateChangeEvents](../interfaces/_domain_auth_protocol_.isessionstatechangeevents.md)\<[SV](../modules/_infrastructure_auth_protocol_api_key_auth_bundle_.md#sv)>>): Promise\<void>

*Defined in [infrastructure/auth-protocol/api-key-auth-bundle.ts:24](https://github.com/quixote911/openals/blob/01e958b/src/infrastructure/auth-protocol/api-key-auth-bundle.ts#L24)*

#### Parameters:

Name | Type |
------ | ------ |
`context` | [IAuthProtocolContext](../interfaces/_domain_auth_protocol_.iauthprotocolcontext.md)\<[SV](../modules/_infrastructure_auth_protocol_api_key_auth_bundle_.md#sv), [C](../interfaces/_infrastructure_auth_protocol_api_key_auth_bundle_.c.md), [AS](../interfaces/_infrastructure_auth_protocol_api_key_auth_bundle_.as.md)> |
`emitter` | Emitter\<[ISessionStateChangeEvents](../interfaces/_domain_auth_protocol_.isessionstatechangeevents.md)\<[SV](../modules/_infrastructure_auth_protocol_api_key_auth_bundle_.md#sv)>> |

**Returns:** Promise\<void>

___

### processIncoming

▸ **processIncoming**(`message`: [M](../modules/_infrastructure_auth_protocol_api_key_auth_bundle_.md#m), `context`: [IAuthProtocolContext](../interfaces/_domain_auth_protocol_.iauthprotocolcontext.md)\<[SV](../modules/_infrastructure_auth_protocol_api_key_auth_bundle_.md#sv), [C](../interfaces/_infrastructure_auth_protocol_api_key_auth_bundle_.c.md), [AS](../interfaces/_infrastructure_auth_protocol_api_key_auth_bundle_.as.md)>, `emitter`: Emitter\<[ISessionStateChangeEvents](../interfaces/_domain_auth_protocol_.isessionstatechangeevents.md)\<[SV](../modules/_infrastructure_auth_protocol_api_key_auth_bundle_.md#sv)>>): Promise\<[M](../modules/_infrastructure_auth_protocol_api_key_auth_bundle_.md#m)>

*Defined in [infrastructure/auth-protocol/api-key-auth-bundle.ts:28](https://github.com/quixote911/openals/blob/01e958b/src/infrastructure/auth-protocol/api-key-auth-bundle.ts#L28)*

#### Parameters:

Name | Type |
------ | ------ |
`message` | [M](../modules/_infrastructure_auth_protocol_api_key_auth_bundle_.md#m) |
`context` | [IAuthProtocolContext](../interfaces/_domain_auth_protocol_.iauthprotocolcontext.md)\<[SV](../modules/_infrastructure_auth_protocol_api_key_auth_bundle_.md#sv), [C](../interfaces/_infrastructure_auth_protocol_api_key_auth_bundle_.c.md), [AS](../interfaces/_infrastructure_auth_protocol_api_key_auth_bundle_.as.md)> |
`emitter` | Emitter\<[ISessionStateChangeEvents](../interfaces/_domain_auth_protocol_.isessionstatechangeevents.md)\<[SV](../modules/_infrastructure_auth_protocol_api_key_auth_bundle_.md#sv)>> |

**Returns:** Promise\<[M](../modules/_infrastructure_auth_protocol_api_key_auth_bundle_.md#m)>

___

### processOutgoing

▸ **processOutgoing**(`message`: [M](../modules/_infrastructure_auth_protocol_api_key_auth_bundle_.md#m), `context`: [IAuthProtocolContext](../interfaces/_domain_auth_protocol_.iauthprotocolcontext.md)\<[SV](../modules/_infrastructure_auth_protocol_api_key_auth_bundle_.md#sv), [C](../interfaces/_infrastructure_auth_protocol_api_key_auth_bundle_.c.md), [AS](../interfaces/_infrastructure_auth_protocol_api_key_auth_bundle_.as.md)>, `emitter`: Emitter\<[ISessionStateChangeEvents](../interfaces/_domain_auth_protocol_.isessionstatechangeevents.md)\<[SV](../modules/_infrastructure_auth_protocol_api_key_auth_bundle_.md#sv)>>): Promise\<[M](../modules/_infrastructure_auth_protocol_api_key_auth_bundle_.md#m)>

*Defined in [infrastructure/auth-protocol/api-key-auth-bundle.ts:31](https://github.com/quixote911/openals/blob/01e958b/src/infrastructure/auth-protocol/api-key-auth-bundle.ts#L31)*

#### Parameters:

Name | Type |
------ | ------ |
`message` | [M](../modules/_infrastructure_auth_protocol_api_key_auth_bundle_.md#m) |
`context` | [IAuthProtocolContext](../interfaces/_domain_auth_protocol_.iauthprotocolcontext.md)\<[SV](../modules/_infrastructure_auth_protocol_api_key_auth_bundle_.md#sv), [C](../interfaces/_infrastructure_auth_protocol_api_key_auth_bundle_.c.md), [AS](../interfaces/_infrastructure_auth_protocol_api_key_auth_bundle_.as.md)> |
`emitter` | Emitter\<[ISessionStateChangeEvents](../interfaces/_domain_auth_protocol_.isessionstatechangeevents.md)\<[SV](../modules/_infrastructure_auth_protocol_api_key_auth_bundle_.md#sv)>> |

**Returns:** Promise\<[M](../modules/_infrastructure_auth_protocol_api_key_auth_bundle_.md#m)>
