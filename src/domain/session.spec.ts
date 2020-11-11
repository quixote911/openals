import { AuthProtocol } from "./auth-protocol";

describe("Testing Session", () => {
  describe("Testing instantiation of Session", () => {
    it("does not instantiate with invalid inputs", () => {
        throw Error("To be implemented")
    });
    it("instantiates valid inputs", () => {
      throw Error("To be implemented")
    });
  });
  describe("Testing behavior of Session", () => {
    it("activates session when explicitly demanded to", () => {
      throw Error("To be implemented")
    });
    it("can handle multiple parallel session activate requests gracefully", () => {
      throw Error("To be implemented")
    });
    it("activates session implicitly when processIncoming is called", () => {
      throw Error("To be implemented")
    });
    it("activates session automatically when it finds out that session is expired", () => {
      throw Error("To be implemented")
    });
  });
});
