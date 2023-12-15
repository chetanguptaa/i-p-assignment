const strongPasswordChecker = require("./index");

// Unit tests using Jest
describe("strongPasswordChecker", () => {
  it("should return the minimum number of steps to make the password strong", () => {
    expect(strongPasswordChecker("a")).toBe(5);
    expect(strongPasswordChecker("aA1")).toBe(3);
    expect(strongPasswordChecker("1337C0d3")).toBe(0);
  });

  it("should return 0 if the password is already strong", () => {
    expect(strongPasswordChecker("Strong123")).toBe(0);
  });
});
