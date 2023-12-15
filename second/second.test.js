const { findMin } = require("./second");

describe("findMin", () => {
  it("should return the minimum difference", () => {
    const nums = [3, 9, 7, 3];
    expect(findMin(nums)).toBe(2);
  });
  it("should return the minimum difference", () => {
    const nums = [2, -1, 0, 4, -2, -9];
    expect(findMin(nums)).toBe(0);
  });
  it("check for negative numbers", () => {
    const nums = [-36, 36];
    expect(findMin(nums)).toBe(72);
  });
});
