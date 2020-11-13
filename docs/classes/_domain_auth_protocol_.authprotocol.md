**[openals](../README.md)**

> [Globals](../globals.md) / ["domain/auth-protocol"](../modules/_domain_auth_protocol_.md) / AuthProtocol

# Class: AuthProtocol\<M, SV, C, AS>

To create an AuthProtocol you need 3 things
1. authProtocolSchema
     defines settingsSchema: schema for which authProtocolSettings does this authProtocolLogic need for it to run
     defines sessionVariableSchema: schema for sessionVariables its capable of producing
2. authProtocolLogic:
     defines function which run which run hooks like processIncoming, processOutgoing, ensureActive
3. authProtocolSettings

## Type parameters

Name |
------ |
`M` |
`SV` |
`C` |
`AS` |

## Hierarchy

* **AuthProtocol**

## Index

### Constructors

* [constructor](_domain_auth_protocol_.authprotocol.md#constructor)

### Properties

* [authProtocolLogic](_domain_auth_protocol_.authprotocol.md#authprotocollogic)
* [authProtocolSchema](_domain_auth_protocol_.authprotocol.md#authprotocolschema)
* [externalEmitter](_domain_auth_protocol_.authprotocol.md#externalemitter)
* [internalEmitter](_domain_auth_protocol_.authprotocol.md#internalemitter)

### Methods

* [ensureActiveSession](_domain_auth_protocol_.authprotocol.md#ensureactivesession)
* [getContext](_domain_auth_protocol_.authprotocol.md#getcontext)
* [on](_domain_auth_protocol_.authprotocol.md#on)
* [processIncoming](_domain_auth_protocol_.authprotocol.md#processincoming)
* [processOutgoing](_domain_auth_protocol_.authprotocol.md#processoutgoing)
* [validateAuthProtocolInputs](_domain_auth_protocol_.authprotocol.md#validateauthprotocolinputs)
* [validateCredentials](_domain_auth_protocol_.authprotocol.md#validatecredentials)
* [validateSessionVariables](_domain_auth_protocol_.authprotocol.md#validatesessionvariables)
* [validateSettings](_domain_auth_protocol_.authprotocol.md#validatesettings)

### Object literals

* [stateChangeEventHandlers](_domain_auth_protocol_.authprotocol.md#statechangeeventhandlers)

## Constructors

### constructor

\+ **new AuthProtocol**(`authProtocolSchema`: [IAuthProtocolSchema](../interfaces/_domain_auth_protocol_.iauthprotocolschema.md), `authProtocolLogic`: [IAuthProtocolLogic](../interfaces/_domain_auth_protocol_.iauthprotocollogic.md)\<M, SV, C, AS>): [AuthProtocol](_domain_auth_protocol_.authprotocol.md)

*Defined in [domain/auth-protocol.ts:67](https://github.com/quixote911/openals/blob/01e958b/src/domain/auth-protocol.ts#L67)*

#### Parameters:

Name | Type |
------ | ------ |
`authProtocolSchema` | [IAuthProtocolSchema](../interfaces/_domain_auth_protocol_.iauthprotocolschema.md) |
`authProtocolLogic` | [IAuthProtocolLogic](../interfaces/_domain_auth_protocol_.iauthprotocollogic.md)\<M, SV, C, AS> |

**Returns:** [AuthProtocol](_domain_auth_protocol_.authprotocol.md)

## Properties

### authProtocolLogic

• `Readonly` **authProtocolLogic**: [IAuthProtocolLogic](../interfaces/_domain_auth_protocol_.iauthprotocollogic.md)\<M, SV, C, AS>

*Defined in [domain/auth-protocol.ts:49](https://github.com/quixote911/openals/blob/01e958b/src/domain/auth-protocol.ts#L49)*

___

### authProtocolSchema

• `Readonly` **authProtocolSchema**: [IAuthProtocolSchema](../interfaces/_domain_auth_protocol_.iauthprotocolschema.md)

*Defined in [domain/auth-protocol.ts:48](https://github.com/quixote911/openals/blob/01e958b/src/domain/auth-protocol.ts#L48)*

___

### externalEmitter

• `Private` `Readonly` **externalEmitter**: Emitter\<[IAuthProtocolEvents](../interfaces/_domain_auth_protocol_.iauthprotocolevents.md)\<SV>>

*Defined in [domain/auth-protocol.ts:51](https://github.com/quixote911/openals/blob/01e958b/src/domain/auth-protocol.ts#L51)*

___

### internalEmitter

• `Private` `Readonly` **internalEmitter**: Emitter\<[ISessionStateChangeEvents](../interfaces/_domain_auth_protocol_.isessionstatechangeevents.md)\<SV>>

*Defined in [domain/auth-protocol.ts:50](https://github.com/quixote911/openals/blob/01e958b/src/domain/auth-protocol.ts#L50)*

## Methods

### ensureActiveSession

▸ **ensureActiveSession**(`sessionVariables`: SV \| undefined, `selfCredentials`: C, `authProtocolSettings?`: AS): Promise\<void>

*Defined in [domain/auth-protocol.ts:78](https://github.com/quixote911/openals/blob/01e958b/src/domain/auth-protocol.ts#L78)*

#### Parameters:

Name | Type |
------ | ------ |
`sessionVariables` | SV \| undefined |
`selfCredentials` | C |
`authProtocolSettings?` | AS |

**Returns:** Promise\<void>

___

### getContext

▸ `Private`**getContext**(`selfCredentials`: C, `sessionVariables`: SV \| undefined, `authProtocolSettings?`: AS): [IAuthProtocolContext](../interfaces/_domain_auth_protocol_.iauthprotocolcontext.md)\<SV, C, AS>

*Defined in [domain/auth-protocol.ts:111](https://github.com/quixote911/openals/blob/01e958b/src/domain/auth-protocol.ts#L111)*

#### Parameters:

Name | Type |
------ | ------ |
`selfCredentials` | C |
`sessionVariables` | SV \| undefined |
`authProtocolSettings?` | AS |

**Returns:** [IAuthProtocolContext](../interfaces/_domain_auth_protocol_.iauthprotocolcontext.md)\<SV, C, AS>

___

### on

▸ **on**\<E>(`event`: E, `callback`: IAuthProtocolEvents\<SV>[E]): Unsubscribe

*Defined in [domain/auth-protocol.ts:98](https://github.com/quixote911/openals/blob/01e958b/src/domain/auth-protocol.ts#L98)*

#### Type parameters:

Name | Type |
------ | ------ |
`E` | keyof [IAuthProtocolEvents](../interfaces/_domain_auth_protocol_.iauthprotocolevents.md)\<SV> |

#### Parameters:

Name | Type |
------ | ------ |
`event` | E |
`callback` | IAuthProtocolEvents\<SV>[E] |

**Returns:** Unsubscribe

___

### processIncoming

▸ **processIncoming**(`message`: M, `sessionVariables`: SV \| undefined, `selfCredentials`: C, `authProtocolSettings`: AS): Promise\<M>

*Defined in [domain/auth-protocol.ts:84](https://github.com/quixote911/openals/blob/01e958b/src/domain/auth-protocol.ts#L84)*

#### Parameters:

Name | Type |
------ | ------ |
`message` | M |
`sessionVariables` | SV \| undefined |
`selfCredentials` | C |
`authProtocolSettings` | AS |

**Returns:** Promise\<M>

___

### processOutgoing

▸ **processOutgoing**(`message`: M, `sessionVariables`: SV \| undefined, `selfCredentials`: C, `authProtocolSettings`: AS): Promise\<M>

*Defined in [domain/auth-protocol.ts:91](https://github.com/quixote911/openals/blob/01e958b/src/domain/auth-protocol.ts#L91)*

#### Parameters:

Name | Type |
------ | ------ |
`message` | M |
`sessionVariables` | SV \| undefined |
`selfCredentials` | C |
`authProtocolSettings` | AS |

**Returns:** Promise\<M>

___

### validateAuthProtocolInputs

▸ `Private`**validateAuthProtocolInputs**(`authProtocolSchema`: [IAuthProtocolSchema](../interfaces/_domain_auth_protocol_.iauthprotocolschema.md), `authProtocolLogic`: [IAuthProtocolLogic](../interfaces/_domain_auth_protocol_.iauthprotocollogic.md)\<M, SV, C, AS>): void

*Defined in [domain/auth-protocol.ts:118](https://github.com/quixote911/openals/blob/01e958b/src/domain/auth-protocol.ts#L118)*

#### Parameters:

Name | Type |
------ | ------ |
`authProtocolSchema` | [IAuthProtocolSchema](../interfaces/_domain_auth_protocol_.iauthprotocolschema.md) |
`authProtocolLogic` | [IAuthProtocolLogic](../interfaces/_domain_auth_protocol_.iauthprotocollogic.md)\<M, SV, C, AS> |

**Returns:** void

___

### validateCredentials

▸ **validateCredentials**(`credentials`: C): void

*Defined in [domain/auth-protocol.ts:102](https://github.com/quixote911/openals/blob/01e958b/src/domain/auth-protocol.ts#L102)*

#### Parameters:

Name | Type |
------ | ------ |
`credentials` | C |

**Returns:** void

___

### validateSessionVariables

▸ **validateSessionVariables**(`sessionVariables`: SV \| undefined): void

*Defined in [domain/auth-protocol.ts:108](https://github.com/quixote911/openals/blob/01e958b/src/domain/auth-protocol.ts#L108)*

#### Parameters:

Name | Type |
------ | ------ |
`sessionVariables` | SV \| undefined |

**Returns:** void

___

### validateSettings

▸ **validateSettings**(`authProtocolSettings?`: AS): void

*Defined in [domain/auth-protocol.ts:105](https://github.com/quixote911/openals/blob/01e958b/src/domain/auth-protocol.ts#L105)*

#### Parameters:

Name | Type |
------ | ------ |
`authProtocolSettings?` | AS |

**Returns:** void

## Object literals

### stateChangeEventHandlers

▪ `Private` `Readonly` **stateChangeEventHandlers**: object

*Defined in [domain/auth-protocol.ts:52](https://github.com/quixote911/openals/blob/01e958b/src/domain/auth-protocol.ts#L52)*

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`activated` | function | (newSessionVariables: SV) => void |
`blocked` | function | () => void |
`expired` | function | () => void |
