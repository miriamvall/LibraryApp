var winston = require('winston');


exports.db = 'mongodb://localhost:27017/meanUser';

exports.winston_options = {
  transports: [
    new winston.transports.Console({
      colorize: true
    })
  ],
  meta: false,
  msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
  colorStatus: true
};

exports.jwt_secret = "MIIEvQIBADANBgkqhkiG9w0BAQEFAAS";