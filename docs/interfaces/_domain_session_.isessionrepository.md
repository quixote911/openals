**[openals](../README.md)**

> [Globals](../globals.md) / ["domain/session"](../modules/_domain_session_.md) / ISessionRepository

# Interface: ISessionRepository\<M, SV, C, AS>

## Type parameters

Name |
------ |
`M` |
`SV` |
`C` |
`AS` |

## Hierarchy

* **ISessionRepository**

## Implemented by

* [GenericSessionRepository](../classes/_infrastructure_session_generic_session_repository_repo_.genericsessionrepository.md)

## Index

### Properties

* [get](_domain_session_.isessionrepository.md#get)
* [save](_domain_session_.isessionrepository.md#save)

## Properties

### get

•  **get**: (selfUniqueId: [UniqueId](../modules/_domain_session_.md#uniqueid), counterPartyUniqueId: [UniqueId](../modules/_domain_session_.md#uniqueid)) => Promise\<[Session](../classes/_domain_session_.session.md)\<M, SV, C, AS>>

*Defined in [domain/session.ts:8](https://github.com/quixote911/openals/blob/01e958b/src/domain/session.ts#L8)*

___

### save

•  **save**: (session: [Session](../classes/_domain_session_.session.md)\<M, SV, C, AS>) => Promise\<void>

*Defined in [domain/session.ts:7](https://github.com/quixote911/openals/blob/01e958b/src/domain/session.ts#L7)*
