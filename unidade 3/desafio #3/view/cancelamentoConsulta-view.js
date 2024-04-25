const input = require('readline-sync');
const { OperationErrors, OperationStatus } = require('../controller/operationError');
const Validacoes = require("../utils/Validacoes");

class CancelamentoConsultaView{
    async readData(validaCPFExiste){

        
        let cpf
        let data
        let horaInicial
        while (true) {
            cpf = input.question('CPF: ');
            if (!Validacoes.validarCPF(cpf)) {
                console.log("\nErro: CPF inválido!\n");
                continue;
            }

            const hasPacient = await validaCPFExiste(cpf)
    
            if(hasPacient.status == OperationStatus.FAILURE){
                console.log("\nErro: paciente não cadastrado\n");
                continue;
            }

            break;
        }

        while (true) {
            data = input.question('Data da consulta (DD/MM/AAAA): ');
            if (!Validacoes.validarData(data)) {
                console.log("\nErro: Data da consulta inválida!\n");
                continue;
            }

            break;

        }

        while (true) {
            horaInicial = input.question("Hora inicial: ");
            if (!Validacoes.validarHora(horaInicial)) {
                console.log("\nErro: Hora inicial inválida!\n");
                continue;
            }

            break;
        }

        
        return {cpf, data, horaInicial}



    }

    process(status, errors){
        if(status == OperationStatus.SUCCESS){
            console.log("Consulta deletada com sucesso!")
        }
        else{
            for(let error of errors){
                this.message(error)
            }
        }

    }

    message(error){
        switch(error){
            case OperationErrors.SCHEDULE_NOT_REGISTERED:
                console.log("Não foi achado nenhuma consulta para essa data!")
                break
            case OperationErrors.PATIENT_NOT_REGISTERED:
                console.log("Paciente não registrado!")
                break

            default:
                break
        }   

    }
}

module.exports = CancelamentoConsultaView