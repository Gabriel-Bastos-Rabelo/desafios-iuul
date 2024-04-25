const {OperationStatus, OperationErrors} = require("../controller/operationError");
const Validacoes = require("../utils/Validacoes")
const input = require('readline-sync');

class AgendamentoConsultaView{
    process(status, errors) {
        if (status === OperationStatus.SUCCESS) {
            console.log('\nConsulta cadastrada com sucesso!');
        } else {
            console.log('\nErro no cadastramento da consulta:');
            errors.forEach((error) => {
                this.message(error)
            });
        }
    }

    message(erro){
        switch(erro){
            case OperationErrors.SCHEDULE_CONFLICT:
                console.log("Conflito no agendamento da consulta")
                break
            case OperationErrors.SCHEDULE_END_TIME_INCORRECT:
                console.log("hora final incorreta")
                break
            case OperationErrors.SCHEDULE_INITIAL_DATE_AFTER_END_DATE:
                console.log("A hora final tem que ser após a hora inicial")
                break
            case OperationErrors.SCHEDULE_INITIAL_TIME_INCORRECT:
                console.log("Hora inicial incorreta")
                break
            case OperationErrors.ALREADY_SCHEDULED:
                console.log("O paciente já possui uma consulta futura marcada")
                break
            
            case OperationErrors.PATIENT_NOT_REGISTERED:
                console.log("Paciente não registrado")
                break
            case OperationErrors.SCHEDULE_OUTSIDE_OPENING_HOURS:
                console.log("Agendamento fora do horário de funcionamento")
        }
    }

    async readData(validaCPFExiste){
        let cpf
        let data
        let horaInicial
        let horaFinal
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

            // if (Validacoes.possuiAgendamentoFuturo(cpf, this.#funcionalidades.agenda)) {
            //     console.log("\nErro: Paciente já possui uma consulta futura!\n");
            //     continue;
            // }

            break
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

        while (true) {
            horaFinal = input.question("Hora Final: ");
            if (!Validacoes.validarHora(horaFinal)) {
                console.log("\nErro: Hora final inválida!\n");
                continue;
            }

            break;

        }


        // if (parseInt(horaFinal) <= parseInt(horaInicial)) {
        //     console.log("\nErro: Hora final deve ser maior que hora inicial!\n");
        //     break;
        // }



        // if (parseInt(horaInicial) < 800 || parseInt(horaFinal) > 1900) {
        //     console.log("\nHorário de funcionamento do consultório é das 8h às 19h!\n");
        //     break;
        // }


        // if (Validacoes.existeAgendamentoSobreposto(data, horaInicial, horaFinal, this.#funcionalidades.agenda)) {
        //     console.log("\nErro: já existe uma consulta agendada nesse horário\n");
        //     break;
        // }

        // if(this.#funcionalidades.agendarConsulta(cpf, data, horaInicial, horaFinal)){
        //     console.log("\nAgendamento realizado com sucesso!\n");
        // }
        // else{
        //     console.log("\nErro: Falha no Agendamento!\n");
        // }

        return {cpf, data, horaInicial, horaFinal}


    }
}

module.exports = AgendamentoConsultaView