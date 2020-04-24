/**
 * Rounds the number
 * @param value
 * @param decimals
 * @returns {number}
 */
export function roundNumber(value, decimals=5) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals)
}

/**
 * Rounds the number and returns fixed 2 decimal places
 * @param value
 * @param decimals
 * @returns {string}
 */
export function numberFilter(value, decimals=5) {
  // return roundNumber(parseFloat(value), decimals).toFixed(decimals).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return Number(roundNumber(parseFloat(value), decimals)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

/**
 * Checks if the number is numeric
 * @param value
 * @returns {boolean}
 */
export function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

/**
 * Only allow numbers from 0-9
 */
export function isNumber(evt) {
  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
    evt.preventDefault();
  } else {
    return true;
  }
}
