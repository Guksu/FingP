import { describe, it, vi, expect } from "vitest";
import throttle from ".";

describe("throttle", () => {
  it("should call the function immediately on the first call", () => {
    const mockFn = vi.fn();
    const throttledFn = throttle(mockFn, 200);

    throttledFn();
    expect(mockFn).toBeCalledTimes(1);
  });

  it("should not call the function again before the limit", async () => {
    const mockFn = vi.fn();
    const throttledFn = throttle(mockFn, 200);

    throttledFn();
    throttledFn();
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(mockFn).toBeCalledTimes(1);
  });

  it("should call the function again after the limit", async () => {
    const mockFn = vi.fn();
    const throttledFn = throttle(mockFn, 200);

    throttledFn();
    await new Promise((resolve) => setTimeout(resolve, 250));
    throttledFn();
    expect(mockFn).toBeCalledTimes(2);
  });

  it("should handle multiple calls over time correctly", async () => {
    const mockFn = vi.fn();
    const throttledFn = throttle(mockFn, 200);

    throttledFn();
    await new Promise((resolve) => setTimeout(resolve, 250));
    throttledFn();
    await new Promise((resolve) => setTimeout(resolve, 250));
    throttledFn();

    expect(mockFn).toBeCalledTimes(3);
  });
});
