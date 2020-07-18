const { compareWithLimit } = require('./compareLimit');

// at every 2 minute
let expression = '*/2 * * * *';

// every 2 hour
expression = '0 */2 * * *';

// evert 2 seconds
expression = '*/3 * * * * *';


const limit = 3000;

// If cron expression contains seconds give this optional parameter {useSeconds: true} 
compareWithLimit(expression, limit, { useSeconds: true });

// otherwise no need of this. (minutes, hours)
compareWithLimit(expression, limit);

