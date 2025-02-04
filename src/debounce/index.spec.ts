import { describe, it, vi, expect } from "vitest";
import { debounce } from "./index";

describe("debounce", () => {
  it("should call the function after the specified delay", async () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 200);

    debouncedFn();
    expect(mockFn).not.toBeCalled();

    await new Promise((resolve) => setTimeout(resolve, 250));
    expect(mockFn).toBeCalledTimes(1);
  });

  it("should handle multiple rapid calls correctly", async () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 200);

    for (let i = 0; i < 5; i++) {
      debouncedFn();
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
    expect(mockFn).toBeCalledTimes(1);
  });

  it("should work with asynchronous functions", async () => {
    const asyncMockFn = vi.fn(async () => {
      return new Promise((resolve) => setTimeout(resolve, 100));
    });
    const debouncedFn = debounce(asyncMockFn, 200);

    debouncedFn();
    await new Promise((resolve) => setTimeout(resolve, 250));
    expect(asyncMockFn).toBeCalledTimes(1);
  });

  it("should not call the function if not enough time has passed", async () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 200);

    debouncedFn();
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(mockFn).not.toBeCalled();
  });

  it("should handle multiple instances independently", async () => {
    const mockFn1 = vi.fn();
    const mockFn2 = vi.fn();
    const debouncedFn1 = debounce(mockFn1, 200);
    const debouncedFn2 = debounce(mockFn2, 200);

    debouncedFn1();
    debouncedFn2();
    await new Promise((resolve) => setTimeout(resolve, 250));
    expect(mockFn1).toBeCalledTimes(1);
    expect(mockFn2).toBeCalledTimes(1);
  });
});
