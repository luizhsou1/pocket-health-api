const chai = require('chai');
const { validateCpf } = require('../../utils/validator');

describe('Teste de validação de cpf', () => {

    it('Deve barrar um cpf que não é válido', () => {
        const cpf = "11111111111"

        chai.expect(validateCpf(cpf)).to.false;
    });

    it('Deve validar um cpf válido', () => {
        const cpf = "46869109001";

        chai.expect(validateCpf(cpf)).to.true;
    });
});