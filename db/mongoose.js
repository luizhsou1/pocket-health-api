'use strict';

const mongoose = require('mongoose');
// const debug = require('debug')('livro_nodejs:db');
const config = require('config');

function _connection() {
  const username  = config.get('mongo.username'),
    password  = config.get('mongo.password'),
    server    = config.get('mongo.server'),
    port      = config.get('mongo.port'),
    database  = config.get('mongo.database'),
    auth = username ? username + ':' + password + '@' : '';
  return 'mongodb://' + auth + server + ':' + port + '/' + database;
}

mongoose.connect(_connection(), { 
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
// db.on('error', (err) => console.log(err));
// db.once('open', () => console.log('Connected to mongodb'));

module.exports = mongoose;
