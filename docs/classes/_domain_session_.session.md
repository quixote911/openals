**[openals](../README.md)**

> [Globals](../globals.md) / ["domain/session"](../modules/_domain_session_.md) / Session

# Class: Session\<M, SV, C, AS>

## Type parameters

Name |
------ |
`M` |
`SV` |
`C` |
`AS` |

## Hierarchy

* **Session**

## Index

### Constructors

* [constructor](_domain_session_.session.md#constructor)

### Properties

* [authProtocol](_domain_session_.session.md#authprotocol)
* [authProtocolSettings](_domain_session_.session.md#authprotocolsettings)
* [externalEmitter](_domain_session_.session.md#externalemitter)
* [selfCredentials](_domain_session_.session.md#selfcredentials)
* [sessionState](_domain_session_.session.md#sessionstate)
* [singletonEnsureActivePromise](_domain_session_.session.md#singletonensureactivepromise)

### Methods

* [ensureActive](_domain_session_.session.md#ensureactive)
* [on](_domain_session_.session.md#on)
* [processIncoming](_domain_session_.session.md#processincoming)
* [processOutgoing](_domain_session_.session.md#processoutgoing)
* [validateSessionInputs](_domain_session_.session.md#validatesessioninputs)

### Object literals

* [authProtocolEventHandlers](_domain_session_.session.md#authprotocoleventhandlers)

## Constructors

### constructor

\+ **new Session**(`sessionState`: [ISessionState](../interfaces/_domain_session_.isessionstate.md)\<SV>, `authProtocol`: [AuthProtocol](_domain_auth_protocol_.authprotocol.md)\<M, SV, C, AS>, `selfCredentials`: C, `authProtocolSettings`: AS): [Session](_domain_session_.session.md)

*Defined in [domain/session.ts:59](https://github.com/quixote911/openals/blob/01e958b/src/domain/session.ts#L59)*

#### Parameters:

Name | Type |
------ | ------ |
`sessionState` | [ISessionState](../interfaces/_domain_session_.isessionstate.md)\<SV> |
`authProtocol` | [AuthProtocol](_domain_auth_protocol_.authprotocol.md)\<M, SV, C, AS> |
`selfCredentials` | C |
`authProtocolSettings` | AS |

**Returns:** [Session](_domain_session_.session.md)

## Properties

### authProtocol

• `Readonly` **authProtocol**: [AuthProtocol](_domain_auth_protocol_.authprotocol.md)\<M, SV, C, AS>

*Defined in [domain/session.ts:35](https://github.com/quixote911/openals/blob/01e958b/src/domain/session.ts#L35)*

___

### authProtocolSettings

• `Private` `Readonly` **authProtocolSettings**: AS

*Defined in [domain/session.ts:57](https://github.com/quixote911/openals/blob/01e958b/src/domain/session.ts#L57)*

___

### externalEmitter

• `Private` **externalEmitter**: Emitter\<[ISessionEvents](../interfaces/_domain_session_.isessionevents.md)\<SV>>

*Defined in [domain/session.ts:58](https://github.com/quixote911/openals/blob/01e958b/src/domain/session.ts#L58)*

___

### selfCredentials

• `Readonly` **selfCredentials**: C

*Defined in [domain/session.ts:33](https://github.com/quixote911/openals/blob/01e958b/src/domain/session.ts#L33)*

___

### sessionState

• `Readonly` **sessionState**: [ISessionState](../interfaces/_domain_session_.isessionstate.md)\<SV>

*Defined in [domain/session.ts:34](https://github.com/quixote911/openals/blob/01e958b/src/domain/session.ts#L34)*

___

### singletonEnsureActivePromise

• `Private` **singletonEnsureActivePromise**: Promise\<void> \| undefined

*Defined in [domain/session.ts:59](https://github.com/quixote911/openals/blob/01e958b/src/domain/session.ts#L59)*

## Methods

### ensureActive

▸ **ensureActive**(): Promise\<void>

*Defined in [domain/session.ts:89](https://github.com/quixote911/openals/blob/01e958b/src/domain/session.ts#L89)*

**Returns:** Promise\<void>

___

### on

▸ **on**\<E>(`event`: E, `callback`: ISessionEvents\<SV>[E]): Unsubscribe

*Defined in [domain/session.ts:76](https://github.com/quixote911/openals/blob/01e958b/src/domain/session.ts#L76)*

#### Type parameters:

Name | Type |
------ | ------ |
`E` | keyof [ISessionEvents](../interfaces/_domain_session_.isessionevents.md)\<SV> |

#### Parameters:

Name | Type |
------ | ------ |
`event` | E |
`callback` | ISessionEvents\<SV>[E] |

**Returns:** Unsubscribe

___

### processIncoming

▸ **processIncoming**(`message`: M): Promise\<M>

*Defined in [domain/session.ts:80](https://github.com/quixote911/openals/blob/01e958b/src/domain/session.ts#L80)*

#### Parameters:

Name | Type |
------ | ------ |
`message` | M |

**Returns:** Promise\<M>

___

### processOutgoing

▸ **processOutgoing**(`message`: M): Promise\<M>

*Defined in [domain/session.ts:84](https://github.com/quixote911/openals/blob/01e958b/src/domain/session.ts#L84)*

#### Parameters:

Name | Type |
------ | ------ |
`message` | M |

**Returns:** Promise\<M>

___

### validateSessionInputs

▸ `Private`**validateSessionInputs**(`sessionState`: [ISessionState](../interfaces/_domain_session_.isessionstate.md)\<SV>, `authProtocol`: [AuthProtocol](_domain_auth_protocol_.authprotocol.md)\<M, SV, C, AS>, `selfCredentials`: C, `authProtocolSettings`: AS): void

*Defined in [domain/session.ts:97](https://github.com/quixote911/openals/blob/01e958b/src/domain/session.ts#L97)*

#### Parameters:

Name | Type |
------ | ------ |
`sessionState` | [ISessionState](../interfaces/_domain_session_.isessionstate.md)\<SV> |
`authProtocol` | [AuthProtocol](_domain_auth_protocol_.authprotocol.md)\<M, SV, C, AS> |
`selfCredentials` | C |
`authProtocolSettings` | AS |

**Returns:** void

## Object literals

### authProtocolEventHandlers

▪ `Private` `Readonly` **authProtocolEventHandlers**: object

*Defined in [domain/session.ts:36](https://github.com/quixote911/openals/blob/01e958b/src/domain/session.ts#L36)*

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`activated` | function | (newSessionVariables: SV) => void |
`blocked` | function | () => void |
`error` | function | (err: unknown) => void |
`expired` | function | () => Promise\<void> |
