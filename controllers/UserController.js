// const debug = require('debug')('pocket_health:controller');
const Promise = require('bluebird');

class UserController {
  constructor(UserModel) { 
    this.model = Promise.promisifyAll(UserModel); 
  }

  getAll(req, res, next) {
    this.model.findAsync({})
      .then((data) => res.json(data))
      .catch(next);
  }

  getById(req, res, next) {
    const _id = req.params._id;
    this.model.findOneAsync(_id)
      .then(this._handleNotFound)
      .then(data =>res.json(data))
      .catch(next);
  }
  
  create(req, res, next) {
    const body = req.body;
    this.model.createAsync(body)
      .then((data, err) => res.json(data))
      .catch(next);
  }

  update(req, res, next) {
    const _id = req.params._id,
      body = req.body;
    this.model.updateAsync(_id, body)
      .then((data, err) => this.getById(req, res, next))
      .catch(next);
  }
  
  remove(req, res, next) {
    const _id = req.params._id;
    this.model.removeAsync(_id)
      .then((data, err) => res.json(data))
      .catch(next);
  }

  // Privates
  _handleNotFound(data) {
    if(!data) {
      const err = new Error('User Not Found');
      err.status = 404;
      throw err;
    }
    return data;
  }
}

module.exports = (UserModel) => new UserController(UserModel);
