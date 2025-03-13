// Initialize map with all roman numeral entries as seen here: https://en.wikipedia.org/wiki/Roman_numerals
// As you can notice, there are some values outside of the standard roman numeral, that we added for
// subtractive rules seen here: https://en.wikipedia.org/wiki/Sign-value_notation#Subtractive_notation
// which reduces the amount of characters needed for example:  IX instead of VIIII saves three extra symbols.
const romanNumeralMap = new Map<number, string>([
  [1, 'I'], [4, 'IV'], [5, 'V'], [9, 'IX'], [10, 'X'], [40, 'XL'], [50, 'L'], [90, 'XC'], [100, 'C'], [400, 'CD'], [500, 'D'], [900, 'CM'], [1000, 'M']
]);

// Create descending keys because the Map is not ordered and we need to ensure the largest value is used first
const descendingRomanNumeralKeys = Array.from(romanNumeralMap.keys()).sort((a, b) => b - a);

// Convert integer to roman numeral using the map and descending keys 
// to ensure the largest value is used first
export const convertIntegerToRomanNumeral = (value: number): string => {
  // We use an array over a string for concatting because strings are immutable.  Assuming the
  // compiler doesn't optimize this it would create a new object each time.
  const result = [];

  // iterate over all of the ordered keys
  for (const key of descendingRomanNumeralKeys) {
    // while the value provided is greater than the key we want to keep using the same one until we
    // reach the next set of values. Then we go to the next smallest number
    while (value >= key) {
      result.push(romanNumeralMap.get(key));
      value -= key;
    }
  }

  return result.join('');
}