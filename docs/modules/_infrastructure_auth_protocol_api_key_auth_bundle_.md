**[openals](../README.md)**

> [Globals](../globals.md) / "infrastructure/auth-protocol/api-key-auth-bundle"

# Module: "infrastructure/auth-protocol/api-key-auth-bundle"

## Index

### Classes

* [ApiKeyAuthProtocolLogic](../classes/_infrastructure_auth_protocol_api_key_auth_bundle_.apikeyauthprotocollogic.md)

### Interfaces

* [AS](../interfaces/_infrastructure_auth_protocol_api_key_auth_bundle_.as.md)
* [C](../interfaces/_infrastructure_auth_protocol_api_key_auth_bundle_.c.md)

### Type aliases

* [M](_infrastructure_auth_protocol_api_key_auth_bundle_.md#m)
* [SV](_infrastructure_auth_protocol_api_key_auth_bundle_.md#sv)

### Object literals

* [bundle](_infrastructure_auth_protocol_api_key_auth_bundle_.md#bundle)
* [credentialSchema](_infrastructure_auth_protocol_api_key_auth_bundle_.md#credentialschema)

## Type aliases

### M

Ƭ  **M**: CoreOptions

*Defined in [infrastructure/auth-protocol/api-key-auth-bundle.ts:12](https://github.com/quixote911/openals/blob/01e958b/src/infrastructure/auth-protocol/api-key-auth-bundle.ts#L12)*

___

### SV

Ƭ  **SV**: void

*Defined in [infrastructure/auth-protocol/api-key-auth-bundle.ts:13](https://github.com/quixote911/openals/blob/01e958b/src/infrastructure/auth-protocol/api-key-auth-bundle.ts#L13)*

## Object literals

### bundle

▪ `Const` **bundle**: object

*Defined in [infrastructure/auth-protocol/api-key-auth-bundle.ts:51](https://github.com/quixote911/openals/blob/01e958b/src/infrastructure/auth-protocol/api-key-auth-bundle.ts#L51)*

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`authProtocolLogic` | [ApiKeyAuthProtocolLogic](../classes/_infrastructure_auth_protocol_api_key_auth_bundle_.apikeyauthprotocollogic.md) | new ApiKeyAuthProtocolLogic() |
`authProtocolSchema` | object | { credentialSchema: Schema  } |

___

### credentialSchema

▪ `Const` **credentialSchema**: object

*Defined in [infrastructure/auth-protocol/api-key-auth-bundle.ts:41](https://github.com/quixote911/openals/blob/01e958b/src/infrastructure/auth-protocol/api-key-auth-bundle.ts#L41)*

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`required` | string[] | ["apiKey"] |
`type` | string | "object" |
`properties` | object | { apiKey: { type: string = "string" }  } |
