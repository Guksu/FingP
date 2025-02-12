/**
 * Splits an array into chunks of the specified size and returns a two-dimensional array.
 * This function works the same as Lodash's `chunk` function.
 *
 * @template T - The type of elements in the array.
 * @param {readonly T[]} array - The input array to be split. Marked as `readonly` to prevent modifications.
 * @param {number} size - The size of each chunk (must be greater than 0).
 * @returns {T[][]} - A two-dimensional array where each sub-array has up to `size` elements.
 * @throws {Error} - Throws an error if `size` is less than or equal to 0.
 *
 * @example
 * ```ts
 * chunk([1, 2, 3, 4, 5, 6], 2); // [[1, 2], [3, 4], [5, 6]]
 * chunk(['a', 'b', 'c', 'd'], 3); // [['a', 'b', 'c'], ['d']]
 * ```
 */
const chunk = <T>(array: readonly T[], size: number): T[][] => {
  if (size <= 0) {
    throw new Error("Size must be greater than zero");
  }

  const result: T[][] = [];

  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }

  return result;
};

export default chunk;
