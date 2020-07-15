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
  
  const validator = (expression, limit, options = {}) => {
    const filteredResult = splitCronString(expression, options);
    const {
      seconds,
      minutes,
      hours,
      daysOfMonth,
      months,
      daysOfWeek,
      years,
    } = filteredResult;
  
    if (daysOfMonth === '*' && months === '*' && daysOfWeek === '*') {
      if (hours && minutes === '0') {
        // handle hours intervals
        const splittedHour = hours.trim().split('');
        if (splittedHour[1] === '/') {
          const expressionInMs = Number(splittedHour[2]) * 3600000;
          if (expressionInMs < limit) {
            console.error('You are not valid');
          }
        }
      } else if (hours && Number(minutes) > 0) {
        // handle hour with minute intervals
        // that means minutes is also given along with hours
        console.log({ hours, minutes });
        const splittedHour = hours.trim().split('');
        if (splittedHour[1] === '/') {
          const hoursInMs = Number(splittedHour[2]) * 3600000;
          const minutesinMs = Number(minutes * 60000);
          const totalTimeINMs = hoursInMs + minutesinMs;
          if (totalTimeINMs < limit) {
            console.log('Limit is bigger than expression');
          }
        }
      } else if (hours === '*' && minutes.trim().split('')[1] === '/') {
        // handle only minute intervals
        const spliitedMinutes = Number(minutes.trim().split('')[2]);
        const minutesInMs = Number(spliitedMinutes * 60000);
        if (minutesInMs < limit) {
          console.log('Limit is bigger than expression');
        }
      } else if (seconds && minutes === '*' && hours === '*') {
        // handle second inervals
        const splittedSeconds = seconds.trim().split('');
        if (splittedSeconds[1] === '/') {
          secondsInMs = Number(splittedSeconds[2] * 1000);
          if (secondsInMs < limit) {
            // console.error('You are not valid seconds');
            console.log('Limit is bigger than expression');
          }
        }
      }
    }
  };
  
  // at every minute
  // * * * * *
  
  // at every 2 minute
  let expression = '*/2 * * * *';
  
  // at every 2 hour and 30 minute
  expression = '30 */2 * * *';
  
  //  at every 2 seconds
  expression = '*/2 * * * * *';
  
  validator(expression, 4000, { useSeconds: true });
  