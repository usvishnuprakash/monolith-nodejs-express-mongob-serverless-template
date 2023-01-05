const {
  format: { timestamp, combine, printf, errors, colorize, label },
  createLogger,
  transports,
} = require('winston');

const logFormat = printf(
  (d) =>
    `${d.timestamp} [${d.level}] -- ${d.status || d.message} -- ${
      d.apiPath || ''
    }  \n \n ${d.stack ? d.stack : ''} \n \n ${
      d.data ? `data :  ${JSON.stringify(d.data, null, 2)}` : ''
    }`
);

const logConfiguration = {
  format: combine(
    colorize({
      all: true,
    }),
    label({ label: '[LOGGER]' }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    logFormat
  ),
  transports: [new transports.Console()],
};
exports.logger = createLogger(logConfiguration);
