/**
 * Formats value with "." and ","
 * @param {int} value
 */
export function currencyNumber(value) {
  const newValue = parseFloat(value)
    .toLocaleString(
      'en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )
  if (newValue == '-0.00')
    return '0.00'
  else
    return newValue
}
