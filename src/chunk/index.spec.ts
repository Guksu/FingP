import { describe, expect, it } from "vitest";
import chunk from "./index";

describe("chunk function", () => {
  it("splits an array into chunks of the given size", () => {
    expect(chunk([1, 2, 3, 4, 5, 6], 2)).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
    expect(chunk([1, 2, 3, 4, 5], 3)).toEqual([
      [1, 2, 3],
      [4, 5],
    ]);
  });

  it("returns single-element subarrays when size is 1", () => {
    expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
  });

  it("returns the entire array as a single chunk when size is greater than array length", () => {
    expect(chunk([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
  });

  it("returns an empty array when given an empty array", () => {
    expect(chunk([], 3)).toEqual([]);
  });

  it("throws an error when size is 0 or negative", () => {
    expect(() => chunk([1, 2, 3], 0)).toThrow("Size must be greater than zero");
    expect(() => chunk([1, 2, 3], -2)).toThrow(
      "Size must be greater than zero"
    );
  });
});
