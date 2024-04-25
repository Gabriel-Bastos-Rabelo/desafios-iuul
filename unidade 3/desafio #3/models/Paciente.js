const {OperationErrors, OperationStatus} = require("../controller/operationError");
const Validacoes = require("../utils/Validacoes");


class Paciente {

    #cpf
    #nome
    #dataNascimento
    constructor(cpf, nome, dataNascimento) {
        this.#cpf = cpf;
        this.#nome = nome;
        this.#dataNascimento = dataNascimento;
    }

    static create(cpf, nome, dataNascimento){
        const errors = []

        if(!Validacoes.validarCPF(cpf)){
            errors.push(OperationErrors.INVALID_PATIENT_DOCUMENT);
        }
        
        /*
        if (this.pacientes.find((paciente) => paciente.cpf === cpf)) {
            errors.push(OperationErrors.PATIENT_ALREADY_REGISTERED)
        }
        */

        if (nome.length < 5) {
            errors.push(OperationErrors.INVALID_PATIENT_NAME)
        }

        if (!Validacoes.validarData(dataNascimento)) {
            errors.push(OperationErrors.INVALID_PATIENT_BIRTHDATE)
        }

        if (!Validacoes.validarIdadeMinima(dataNascimento)) {
            errors.push(OperationErrors.INVALID_PATIENT_BIRTHDATE)
        }

        return errors.length === 0
        ? { success: new Paciente(cpf, nome, dataNascimento) }
        : { failure: errors };
    }

    get cpf() {
        return this.#cpf;
    }

    get nome() {
        return this.#nome;
    }

    get dataNascimento() {
        return this.#dataNascimento;
    }

    get Idade(){
        const hoje = new Date();
        const nascimento = new Date(this.#dataNascimento.split('/').reverse().join('/'));
        const idade = hoje.getFullYear() - nascimento.getFullYear();
        const m = hoje.getMonth() - nascimento.getMonth();
        if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
            return idade - 1;
        }
        return idade;
    }


}


module.exports = Paciente


