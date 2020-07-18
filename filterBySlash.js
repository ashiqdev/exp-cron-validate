// 1. A function that will remove all special character (it will return object)
// it will handle only one element of the array (which includes /)

const { splitCronString } = require('./splitByLength');

const filterSpecialCharacters = (expression, option = {}) => {
  const splittedObj = splitCronString(expression, option);

  // filter special characters from object
  for (const property in splittedObj) {
    if (!splittedObj[property] || splittedObj[property].length < 3) {
      delete splittedObj[property];
    }
  }

  let value = Object.values(splittedObj).join('');
  const r = /\d+/;
  //   filter digit from the string
  value = value.match(r)[0];

  const key = Object.keys(splittedObj);
  return {
    [key]: Number(value),
  };
};

// at every 2 minute
let expression = '*/20 * * * *';

// every 2 hour
expression = '0 */20 * * *';

// evert 2 seconds
// expression = '*/2 * * * * *';

// const result = filterSpecialCharacters(expression);

module.exports = { filterSpecialCharacters };
