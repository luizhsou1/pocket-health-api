'use strict';

// TODO Me baseando no artigo https://scotch.io/@vigneshsithirai/basic-crud-operation-with-nodejs-express-and-mongodb
// Só que no meu UserModel, devolvo um DAO, que a união das camadas service e model dele 

class  UserDAO {
  constructor(UserModel) {
    this.model = UserModel; 
  }

  create(data, callback) {
    var model = new this.model(data);
    model.save(function(err, result) {
      callback(err, result);
    });
  }
  
  find(query, callback) {
    this.model.find(query).exec(callback);
  }
  
  findOne(_id, callback) {
    var query = { _id : _id };
    this.model.findOne(query).exec(callback);
  }
  
  update(_id, data, callback) {
    var query = { _id : _id };
    this.model.update(query, data).exec(function(err, result) {
      callback(err, result);
    });
  }
  
  remove(_id, callback) {
    var query = { _id : _id };
    this.model.remove(query).exec(function(err, result) {
      callback(err, result);
    });
  }
}



module.exports = function(mongoose) {
  const UserSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    type: String 
  });

  const UserModel = mongoose.model('User', UserSchema);

  return new UserDAO(UserModel);
};
