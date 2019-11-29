'use strict';

class  DoctorDAO {
  constructor(DoctorModel) {
    this.model = DoctorModel; 
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
  const DoctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cpf: { type: String, required: true },
    specialty: { type: String, required: true },
    crm: { type: Number, required: true },
    work: { type: String, required: true }, // Como não modelei o Schema Intitution, prefiri colocar como String
    consultValue: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() }
  });

  const DoctorModel = mongoose.model('Doctor', DoctorSchema);

  return new DoctorDAO(DoctorModel);
};
