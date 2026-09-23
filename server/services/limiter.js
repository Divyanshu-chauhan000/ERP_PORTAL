const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
  windowMs : 15 * 60 * 1000,
  max : 50,
  message : "Too many requests! Please try again after sometime "
})

module.exports = limiter;