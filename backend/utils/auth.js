const jwt = require('jsonwebtoken');

exports.generateToken = (payload, secret, options) => {
  return jwt.sign(payload, secret, options);
};

exports.verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};