const { filterSpecialCharacters } = require('./filterBySlash');

const compareWithLimit = (expression, limit, option = {}) => {
  const object = filterSpecialCharacters(expression, option);

  const type = Object.keys(object).join('');

  let expressionInMs;

  switch (type) {
    case 'minutes':
      const { minutes } = object;
      console.log({ minutes });
      //convert into ms
      expressionInMs = minutes * 60000;
      break;

    case 'hours':
      const { hours } = object;
      console.log({ hours });
      //convert into ms
      expressionInMs = hours * 3600000;
      break;

    case 'seconds':
      const { seconds } = object;
      console.log({ seconds });
      //convert into ms
      expressionInMs = seconds * 1000;

    default:
      break;
  }

  if (expressionInMs < limit) {
    console.error('Limit in ms is bigger than your given expression');
  } else {
    console.log('OKAY...');
  }
};

module.exports = { compareWithLimit };
