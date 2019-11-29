const express = require('express');
const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('config');

const router = express.Router();

router.post('/', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username);
  console.log(password);
  if(username === 'admin' && password === '123') {
    const expires = moment().add(1, 'days').valueOf();
    const token = jwt.encode({
      user: username,
      exp: expires
    }, config.get('jwtTokenSecret'));

    res.json({
      token: token
    });
  } else {
    const err = new Error('Unauthorized');
    err.status = 401;
    next(err);
  }
});

module.exports = router;