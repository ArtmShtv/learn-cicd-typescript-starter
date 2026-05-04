import { describe, it, expect } from "vitest";
import { getAPIKey } from "../api/auth";

describe("getAPIKey", () => {
  it("returns null when authorization header is missing", () => {
    expect(getAPIKey({})).toBeNull();
  });

  it("returns null when authorization header is empty string", () => {
    expect(getAPIKey({ authorization: "" })).toBeNull();
  });

  it("returns null when scheme is not 'ApiKey'", () => {
    expect(getAPIKey({ authorization: "Bearer sometoken" })).toBeNull();
    expect(getAPIKey({ authorization: "Basic sometoken" })).toBeNull();
  });

  it("returns null when header has no token after scheme", () => {
    expect(getAPIKey({ authorization: "ApiKey" })).toBeNull();
  });

  it("returns the API key when header is valid", () => {
    expect(getAPIKey({ authorization: "ApiKey my-secret-key" })).toBe(
      "my-secret-key",
    );
  });

  it("returns only the first token when multiple values are present", () => {
    expect(getAPIKey({ authorization: "ApiKey token extra" })).toBe("token");
  });
});
