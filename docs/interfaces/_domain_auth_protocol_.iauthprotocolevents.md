**[openals](../README.md)**

> [Globals](../globals.md) / ["domain/auth-protocol"](../modules/_domain_auth_protocol_.md) / IAuthProtocolEvents

# Interface: IAuthProtocolEvents\<SessionVariablesType>

## Type parameters

Name |
------ |
`SessionVariablesType` |

## Hierarchy

* [ISessionStateChangeEvents](_domain_auth_protocol_.isessionstatechangeevents.md)\<SessionVariablesType>

  ↳ **IAuthProtocolEvents**

## Index

### Properties

* [activated](_domain_auth_protocol_.iauthprotocolevents.md#activated)
* [blocked](_domain_auth_protocol_.iauthprotocolevents.md#blocked)
* [error](_domain_auth_protocol_.iauthprotocolevents.md#error)
* [expired](_domain_auth_protocol_.iauthprotocolevents.md#expired)

## Properties

### activated

•  **activated**: (sessionVariables: SessionVariablesType) => void

*Inherited from [ISessionStateChangeEvents](_domain_auth_protocol_.isessionstatechangeevents.md).[activated](_domain_auth_protocol_.isessionstatechangeevents.md#activated)*

*Defined in [domain/auth-protocol.ts:5](https://github.com/quixote911/openals/blob/01e958b/src/domain/auth-protocol.ts#L5)*

___

### blocked

•  **blocked**: () => void

*Inherited from [ISessionStateChangeEvents](_domain_auth_protocol_.isessionstatechangeevents.md).[blocked](_domain_auth_protocol_.isessionstatechangeevents.md#blocked)*

*Defined in [domain/auth-protocol.ts:7](https://github.com/quixote911/openals/blob/01e958b/src/domain/auth-protocol.ts#L7)*

___

### error

•  **error**: (err: unknown) => void

*Defined in [domain/auth-protocol.ts:11](https://github.com/quixote911/openals/blob/01e958b/src/domain/auth-protocol.ts#L11)*

___

### expired

•  **expired**: () => void

*Inherited from [ISessionStateChangeEvents](_domain_auth_protocol_.isessionstatechangeevents.md).[expired](_domain_auth_protocol_.isessionstatechangeevents.md#expired)*

*Defined in [domain/auth-protocol.ts:6](https://github.com/quixote911/openals/blob/01e958b/src/domain/auth-protocol.ts#L6)*
