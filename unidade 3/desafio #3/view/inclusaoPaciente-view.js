const input = require('readline-sync');
const { OperationErrors, OperationStatus } = require('../controller/operationError');
const Validacoes = require("../utils/Validacoes");

class InclusaoPacienteView{
    

    async readData(validaCPFExiste){
        let cpf
        let nome
        let dataNascimento
        while (true) {
            cpf = input.question('CPF: ');
            if (!Validacoes.validarCPF(cpf)) {
                console.log("\nErro: CPF inválido!\n");
                continue;
            }

            const validaCPF = await validaCPFExiste(cpf)
            if (validaCPF.status === OperationStatus.FAILURE) {
                console.log("\nErro: CPF já cadastrado\n");
                continue;
            }

            break;
        }

        while (true) {
            nome = input.question("Nome: ");

            if (nome.length < 5) {
                console.log("\nErro: Nome deve ter pelo menos 5 caracteres!\n");
                continue;
            }

            break;

        }

        while (true) {

            dataNascimento = input.question("Data de nascimento (DD/MM/AAAA): ");
            if (!Validacoes.validarData(dataNascimento)) {
                console.log("\nErro: Data de nascimento inválida!\n");
                continue;
            }

            if (!Validacoes.validarIdadeMinima(dataNascimento)) {
                console.log("\nErro: paciente deve ter pelo menos 13 anos.\n");
                continue;
            }

            break;
        }

        return {cpf, nome, dataNascimento}


    }

    process(status, errors) {
        if (status === OperationStatus.SUCCESS) {
            console.log('\nPaciente cadastrado com sucesso!');
        } else {
            console.log('\nErro no cadastramento:');
            errors.forEach((error) => {
                this.message(error)
            });
        }
    }

    message(error){
        switch(error){
            case OperationErrors.PATIENT_ALREADY_REGISTERED:
                console.log("Paciente já cadastrado")
                break
            
            case OperationErrors.INVALID_PATIENT_BIRTHDATE:
                console.log("Data de nascimento inválida")
                break
            
            case OperationErrors.INVALID_PATIENT_NAME:
                console.log("Nome do paciente inválido")
                break

            case OperationErrors.INVALID_PATIENT_DOCUMENT:
                console.log("CPF inválido")
                break

            default:
                break
            
            
        }
    }
}

module.exports = InclusaoPacienteView