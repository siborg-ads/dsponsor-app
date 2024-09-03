/**
 * Formats and rounds a numeric value to an appropriate number of decimal places.
 * The rounding precision is determined based on the magnitude of the input value.
 *
 * @param {number | string} value - The numeric value to be formatted and rounded. It can be either a number or a string that represents a number.
 * @returns {number} - The formatted and rounded number. The number is rounded to a maximum of 18 decimal places based on its magnitude.
 *
 * @description
 * - Values greater than 1 are rounded to 2 decimal places.
 * - Values between 0.1 and 1 are rounded to 3 decimal places.
 * - Values between 0.01 and 0.1 are rounded to 4 decimal places.
 * - etc
 *
 * @example
 * // Example usage:
 * const price1 = formatAndRoundPrice(123.456789); // 123.46
 * const price2 = formatAndRoundPrice(0.123456);  // 0.123
 * const price3 = formatAndRoundPrice(0.00001234); // 0.00001234
 * const price4 = formatAndRoundPrice("0.000000123"); // 0.000000123
 *
 * // The function will also handle cases where the input is 0:
 * const price5 = formatAndRoundPrice(0); // 0
 *
 * // If the input is not a valid number, it will be converted to NaN.
 */
const formatAndRoundPrice = (value: string | number) => {
  let num = parseFloat(value as string);

  if (num === 0) {
    return 0;
  }

  if (num > 1) {
    return parseFloat(num.toFixed(2));
  } else if (num > 0.1) {
    return parseFloat(num.toFixed(3));
  } else if (num > 0.01) {
    return parseFloat(num.toFixed(4));
  } else if (num > 0.001) {
    return parseFloat(num.toFixed(5));
  } else if (num > 0.0001) {
    return parseFloat(num.toFixed(6));
  } else if (num > 0.00001) {
    return parseFloat(num.toFixed(7));
  } else if (num > 0.000001) {
    return parseFloat(num.toFixed(8));
  } else if (num > 0.0000001) {
    return parseFloat(num.toFixed(9));
  } else if (num > 0.00000001) {
    return parseFloat(num.toFixed(10));
  } else if (num > 0.000000001) {
    return parseFloat(num.toFixed(11));
  } else if (num > 0.0000000001) {
    return parseFloat(num.toFixed(12));
  } else if (num > 0.00000000001) {
    return parseFloat(num.toFixed(13));
  } else if (num > 0.000000000001) {
    return parseFloat(num.toFixed(14));
  } else if (num > 0.0000000000001) {
    return parseFloat(num.toFixed(15));
  } else if (num > 0.00000000000001) {
    return parseFloat(num.toFixed(16));
  } else if (num > 0.000000000000001) {
    return parseFloat(num.toFixed(17));
  } else if (num > 0.0000000000000001) {
    return parseFloat(num.toFixed(18));
  } else {
    return num;
  }
};

export default formatAndRoundPrice;
