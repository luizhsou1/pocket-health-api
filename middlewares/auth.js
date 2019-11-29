const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('config');

module.exports = (req, res, next) => {
  const token = req.query.token || req.headers['x-access-token'];
  if(!token) {
    const err = new Error('Forbidden, token is required!');
    err.status = 403;
    return next(err);
  }
  try {
    const decoded = jwt.decode(token, config.get('jwtTokenSecret'));
    const isExpired = moment(decoded.exp).isBefore(new Date());
    if(isExpired) {
      const err = new Error('Unauthorized');
      err.status = 401;
      return next(err);
    } else {
      req.user = decoded.user;
      next();
    }
  } catch(err) {
    return next(err);
  }
};