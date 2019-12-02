const CPF = require('cpf');

const validateCpf = (cpf) => {
   const response =  CPF.isValid(cpf) ? true : false;

   return response;
}

module.exports = {
    validateCpf
}