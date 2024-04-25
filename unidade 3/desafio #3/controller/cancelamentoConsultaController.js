const session = require("../session/session");
const {OperationErrors, OperationStatus} = require("./operationError");
const Agenda = require("../models/Agenda");
const FormateDate = require("../utils/FormateDate");

class CancelamentoConsultaController{
    
    async canCancelarAgendamento(cpf){
        if(await session.Consultorio.hasPaciente(cpf)){
            return { status: OperationStatus.SUCCESS }
        }

        return {
            status: OperationStatus.FAILURE,
            errors: [OperationErrors.PATIENT_NOT_REGISTERED],
        };
    }

    async cancelarAgendamento(cpf, dataConsulta, horaInicial){
        const hasPacient = await this.canCancelarAgendamento(cpf)

        if(hasPacient.status == OperationStatus.FAILURE){
            return hasPacient
        }

        const agendamentoFuturo = await session.Consultorio.getAgendamentosFuturosPorCpf(cpf);
        
        if (!agendamentoFuturo || FormateDate(agendamentoFuturo.dataConsulta) !== dataConsulta || agendamentoFuturo.horaInicial !== horaInicial) {
            
            return {
                status: OperationStatus.FAILURE,
                errors: [OperationErrors.SCHEDULE_NOT_REGISTERED],
            };
        } else {
            // Remove o agendamento
            await session.Consultorio.cancelarAgendamento(dataConsulta, horaInicial);

            return { status: OperationStatus.SUCCESS };
        }
        
        




    }

    
}

module.exports = CancelamentoConsultaController