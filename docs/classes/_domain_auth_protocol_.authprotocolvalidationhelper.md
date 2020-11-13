**[openals](../README.md)**

> [Globals](../globals.md) / ["domain/auth-protocol"](../modules/_domain_auth_protocol_.md) / AuthProtocolValidationHelper

# Class: AuthProtocolValidationHelper

## Hierarchy

* **AuthProtocolValidationHelper**

## Index

### Methods

* [validateCredentials](_domain_auth_protocol_.authprotocolvalidationhelper.md#validatecredentials)
* [validateSessionVariables](_domain_auth_protocol_.authprotocolvalidationhelper.md#validatesessionvariables)
* [validateSettings](_domain_auth_protocol_.authprotocolvalidationhelper.md#validatesettings)

## Methods

### validateCredentials

▸ `Static`**validateCredentials**(`credentials`: unknown, `credentialSchema`: Schema): void

*Defined in [domain/auth-protocol.ts:126](https://github.com/quixote911/openals/blob/01e958b/src/domain/auth-protocol.ts#L126)*

#### Parameters:

Name | Type |
------ | ------ |
`credentials` | unknown |
`credentialSchema` | Schema |

**Returns:** void

___

### validateSessionVariables

▸ `Static`**validateSessionVariables**(`sessionVariables`: unknown, `sessionVariablesSchema?`: Schema): void

*Defined in [domain/auth-protocol.ts:154](https://github.com/quixote911/openals/blob/01e958b/src/domain/auth-protocol.ts#L154)*

#### Parameters:

Name | Type |
------ | ------ |
`sessionVariables` | unknown |
`sessionVariablesSchema?` | Schema |

**Returns:** void

___

### validateSettings

▸ `Static`**validateSettings**(`authProtocolSettings`: unknown, `settingsSchema?`: Schema): void

*Defined in [domain/auth-protocol.ts:141](https://github.com/quixote911/openals/blob/01e958b/src/domain/auth-protocol.ts#L141)*

#### Parameters:

Name | Type |
------ | ------ |
`authProtocolSettings` | unknown |
`settingsSchema?` | Schema |

**Returns:** void
