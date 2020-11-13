**[openals](../README.md)**

> [Globals](../globals.md) / ["infrastructure/session/generic-session-repository/repo"](../modules/_infrastructure_session_generic_session_repository_repo_.md) / ISessionStore

# Interface: ISessionStore\<SV>

## Type parameters

Name |
------ |
`SV` |

## Hierarchy

* **ISessionStore**

## Implemented by

* [InMemorySessionStore](../classes/_infrastructure_session_generic_session_repository_impl_.inmemorysessionstore.md)

## Index

### Properties

* [getBySessionId](_infrastructure_session_generic_session_repository_repo_.isessionstore.md#getbysessionid)
* [save](_infrastructure_session_generic_session_repository_repo_.isessionstore.md#save)

## Properties

### getBySessionId

•  **getBySessionId**: (sessionId: [UniqueId](../modules/_domain_session_.md#uniqueid)) => Promise\<[ISessionState](_domain_session_.isessionstate.md)\<SV>>

*Defined in [infrastructure/session/generic-session-repository/repo.ts:12](https://github.com/quixote911/openals/blob/01e958b/src/infrastructure/session/generic-session-repository/repo.ts#L12)*

___

### save

•  **save**: (sessionState: [ISessionState](_domain_session_.isessionstate.md)\<SV>) => Promise\<void>

*Defined in [infrastructure/session/generic-session-repository/repo.ts:11](https://github.com/quixote911/openals/blob/01e958b/src/infrastructure/session/generic-session-repository/repo.ts#L11)*
