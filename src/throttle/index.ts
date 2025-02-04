/**
 * Creates a throttled function that ensures the provided function is executed at most once within the specified time limit.
 *
 * @param fn - The function to throttle.
 * @param delay - The number of milliseconds to wait before allowing the function to be called again.
 * @returns A throttled version of the provided function.
 */
const throttle = <T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;

  return (...args: Parameters<T>) => {
    const now = Date.now();

    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
};

export default throttle;
