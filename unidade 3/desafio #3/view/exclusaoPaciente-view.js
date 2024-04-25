const Validacoes = require("../utils/Validacoes");
const {OperationErrors, OperationStatus} = require("../controller/operationError");
const input = require('readline-sync');

class ExclusaoPacienteView{
    async readData(validaCPFExiste){
        while (true) {
            const cpf = input.question('CPF: ');
            if (!Validacoes.validarCPF(cpf)) {
                console.log("\nErro: CPF inválido!\n");
                continue;
            }
            const validaCpf = await validaCPFExiste(cpf)
            if(validaCpf.status === OperationStatus.FAILURE){
                console.log("\nErro: paciente não cadastrado\n");
                continue
            }

        
            // if (Validacoes.possuiAgendamentoFuturo(cpf, this.#funcionalidades.agenda)) {
            //     console.error("\nErro: paciente está agendado.\n");
            //     continue;
            // }

            // if(this.#funcionalidades.excluirPaciente(cpf)){
            //     console.log("\nPaciente excluído com sucesso!\n");
            // }
            // else{
            //     console.log("\nFalha na exclusão do paciente!\n");
            // }
            
            return {cpf}


        }
    }

    process(status, errors){
        if(status == OperationStatus.SUCCESS){
            console.log("Paciente deletado com sucesso!")
        }
        else{
            for(let error of errors){
                this.message(error)
            }
        }

    }

    message(error){
        switch(error){
            case OperationErrors.INVALID_PATIENT_DOCUMENT:
                console.log("Cpf inválido")
                break
            case OperationErrors.PATIENT_NOT_REGISTERED:
                console.log("Paciente não cadastrado");
                break
            
            case OperationErrors.ALREADY_SCHEDULED:
                console.log("Paciente possui uma consulta agendada")
                break

            default:
                break
        }
    }
}


module.exports = ExclusaoPacienteView