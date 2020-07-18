// 1.useSeconds and useYears means length should be 7
// 2.useSeconds but not useYears and vice versa means length should be 6
// 3.no useSeconds and useYears means length should be 5

// split the expression into separte parts. this is first task.

const splitCronString = (cronExpression, options) => {
  const splittedString = cronExpression.trim().split(' ');

  if (options.useSeconds && options.useYears && splittedString.length !== 7) {
    //   1
    throw new Error(`Expected 7 values, but got ${splittedString.length}`);
  }

  //   2
  if (
    ((options.useSeconds && !options.useYears) ||
      (options.useYears && !options.useSeconds)) &&
    splittedString.length !== 6
  ) {
    throw new Error(`Expected 6 values, but got ${splittedString.length}.`);
  }

  // 3
  if (!options.useSeconds && !options.useYears && splittedString.length !== 5) {
    return err(`Expected 5 values, but got ${splittedString.length}.`);
  }
  const cronData = {
    seconds: options.useSeconds ? splittedString[0] : undefined,
    minutes: splittedString[options.useSeconds ? 1 : 0],
    hours: splittedString[options.useSeconds ? 2 : 1],
    daysOfMonth: splittedString[options.useSeconds ? 3 : 2],
    months: splittedString[options.useSeconds ? 4 : 3],
    daysOfWeek: splittedString[options.useSeconds ? 5 : 4],

    years: options.useYears
      ? splittedString[options.useSeconds ? 6 : 5]
      : undefined,
  };

  return cronData;
};

module.exports = { splitCronString };
