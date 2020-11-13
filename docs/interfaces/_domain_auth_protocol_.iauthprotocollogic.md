**[openals](../README.md)**

> [Globals](../globals.md) / ["domain/auth-protocol"](../modules/_domain_auth_protocol_.md) / IAuthProtocolLogic

# Interface: IAuthProtocolLogic\<MessageType, SessionVariablesType, CredentialsType, AuthSettingsType>

## Type parameters

Name |
------ |
`MessageType` |
`SessionVariablesType` |
`CredentialsType` |
`AuthSettingsType` |

## Hierarchy

* **IAuthProtocolLogic**

## Implemented by

* [ApiKeyAuthProtocolLogic](../classes/_infrastructure_auth_protocol_api_key_auth_bundle_.apikeyauthprotocollogic.md)

## Index

### Properties

* [ensureActiveSession](_domain_auth_protocol_.iauthprotocollogic.md#ensureactivesession)
* [processIncoming](_domain_auth_protocol_.iauthprotocollogic.md#processincoming)
* [processOutgoing](_domain_auth_protocol_.iauthprotocollogic.md#processoutgoing)

## Properties

### ensureActiveSession

•  **ensureActiveSession**: (context: [IAuthProtocolContext](_domain_auth_protocol_.iauthprotocolcontext.md)\<SessionVariablesType, CredentialsType, AuthSettingsType>, emitter: Emitter\<[ISessionStateChangeEvents](_domain_auth_protocol_.isessionstatechangeevents.md)\<SessionVariablesType>>) => Promise\<void>

*Defined in [domain/auth-protocol.ts:22](https://github.com/quixote911/openals/blob/01e958b/src/domain/auth-protocol.ts#L22)*

___

### processIncoming

•  **processIncoming**: (message: MessageType, context: [IAuthProtocolContext](_domain_auth_protocol_.iauthprotocolcontext.md)\<SessionVariablesType, CredentialsType, AuthSettingsType>, emitter: Emitter\<[ISessionStateChangeEvents](_domain_auth_protocol_.isessionstatechangeevents.md)\<SessionVariablesType>>) => Promise\<MessageType>

*Defined in [domain/auth-protocol.ts:23](https://github.com/quixote911/openals/blob/01e958b/src/domain/auth-protocol.ts#L23)*

___

### processOutgoing

•  **processOutgoing**: (message: MessageType, context: [IAuthProtocolContext](_domain_auth_protocol_.iauthprotocolcontext.md)\<SessionVariablesType, CredentialsType, AuthSettingsType>, emitter: Emitter\<[ISessionStateChangeEvents](_domain_auth_protocol_.isessionstatechangeevents.md)\<SessionVariablesType>>) => Promise\<MessageType>

*Defined in [domain/auth-protocol.ts:24](https://github.com/quixote911/openals/blob/01e958b/src/domain/auth-protocol.ts#L24)*
