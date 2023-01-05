const { logger } = require('../helpers/loggers.helpers');

function logResponseBody(req, res, next) {
  // ! don't remove it will create a top line
  console.log('-'.repeat(process.stdout.columns));

  const oldWrite = res.write;
  const oldEnd = res.end;
  const oldStatus = res.status;

  const chunks = {
    status: 200,
    res: {},
  };

  res.write = function (chunk) {
    chunks.push(chunk);

    // eslint-disable-next-line prefer-rest-params
    return oldWrite.apply(res, arguments);
  };

  res.end = function (chunk) {
    if (chunk) {
      if (Buffer.isBuffer(chunk) === false) {
        chunks.res = Buffer.from(chunk, 'utf8').toString('utf8');
      } else {
        chunks.res = chunk.toString('utf8');
      }
    }

    if (chunks.status < 299) {
      logger.info(
        `${chunks.res.message || 'Success'} -- ${chunks.status} -- ${req.path}`
      );
    }

    console.log('-'.repeat(process.stdout.columns));

    // eslint-disable-next-line prefer-rest-params
    return oldEnd.apply(res, arguments);
  };
  res.status = function (status) {
    chunks.status = status;
    // eslint-disable-next-line prefer-rest-params
    return oldStatus.apply(res, arguments);
  };

  next();
}

module.exports = logResponseBody;
