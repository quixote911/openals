// import {
//   AuthProtocol,
//   IAuthProtocolContext,
//   IAuthProtocolLogic,
//   IAuthProtocolSchema,
//   ISessionStateChangeEvents
// } from "./auth-protocol";
// import {Emitter} from "nanoevents";
//
// describe("Testing AuthProtocol", () => {
//   describe("Testing instantiation of AuthProtocol", () => {
//
//     it("does not instantiate with invalid inputs", () => {
//       throw Error("To be implemented")
//     });
//     it("instantiates valid inputs", () => {
//       const schema: IAuthProtocolSchema = {
//
//       }
//       const ap = new AuthProtocol(schema, logic)
//     });
//   });
//   describe("Testing behavior of AuthProtocol", () => {
//     it("refuses to process message if inputs do not obey schema", () => {
//       throw Error("To be implemented")
//     });
//     it("emits 'activated' event if session is activated within ensureActive", () => {
//       throw Error("To be implemented")
//     });
//     it("emits 'expired' event if expired session is detected within processOutgoing", () => {
//       throw Error("To be implemented")
//     });
//     it("emits 'error' event if session is activated within ensureActive, but incorrect sessionVariables are provided", () => {
//       throw Error("To be implemented")
//     });
//     it("emits 'blocked' event if some unrecoverable blocked state is encountered", () => {
//       throw Error("To be implemented")
//     });
//   });
// });
