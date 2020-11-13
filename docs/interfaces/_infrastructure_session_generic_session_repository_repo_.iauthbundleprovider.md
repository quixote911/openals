**[openals](../README.md)**

> [Globals](../globals.md) / ["infrastructure/session/generic-session-repository/repo"](../modules/_infrastructure_session_generic_session_repository_repo_.md) / IAuthBundleProvider

# Interface: IAuthBundleProvider\<M, SV, C, AS>

## Type parameters

Name |
------ |
`M` |
`SV` |
`C` |
`AS` |

## Hierarchy

* **IAuthBundleProvider**

## Implemented by

* [InMemoryAuthBundleProvider](../classes/_infrastructure_session_generic_session_repository_impl_.inmemoryauthbundleprovider.md)

## Index

### Properties

* [get](_infrastructure_session_generic_session_repository_repo_.iauthbundleprovider.md#get)

## Properties

### get

•  **get**: (authType: [UniqueId](../modules/_domain_session_.md#uniqueid)) => Promise\<[IAuthProtocolBundle](_domain_auth_protocol_.iauthprotocolbundle.md)\<M, SV, C, AS>>

*Defined in [infrastructure/session/generic-session-repository/repo.ts:24](https://github.com/quixote911/openals/blob/01e958b/src/infrastructure/session/generic-session-repository/repo.ts#L24)*
