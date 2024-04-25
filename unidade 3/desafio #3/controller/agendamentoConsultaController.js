const session = require("../session/session");
const {OperationErrors, OperationStatus} = require("../controller/operationError");
const Consulta = require("../models/Consulta");



class AgendamentoConsultaController{
    
    async canAddConsulta(cpf){
        if(await session.Consultorio.hasPaciente(cpf)){
            return { status: OperationStatus.SUCCESS }
        }

        return {
            status: OperationStatus.FAILURE,
            errors: [OperationErrors.PATIENT_NOT_REGISTERED],
        };
    }

    async agendaConsulta(cpf, data, horaInicial, horaFinal){
        const hasPacient = this.canAddConsulta(cpf);

        if(hasPacient.status == OperationStatus.FAILURE){
            return hasPacient
        }

        const paciente = await session.Consultorio.getPaciente(cpf)

    

        const hasAgendamentosFuturos = await session.Consultorio.hasAgendamentoFuturo(cpf)
        if(hasAgendamentosFuturos){
            return {
                status: OperationStatus.FAILURE,
                errors: [OperationErrors.ALREADY_SCHEDULED],
            };
        }

        const hasAgendamentoSobreposto = await session.Consultorio.hasAgendamentoSobreposto(data, horaInicial, horaFinal)

        if(hasAgendamentoSobreposto){
            return {
                status: OperationStatus.FAILURE,
                errors: [OperationErrors.SCHEDULE_CONFLICT],
            };
        }

        const result = Consulta.create(paciente, data, horaInicial, horaFinal)

        
        if(result.success){
            const consulta = result.success;
            await session.Consultorio.addAgendamento(consulta);
            return { status: OperationStatus.SUCCESS };
        }
        else{
            return {
                status: OperationStatus.FAILURE,
                errors: result.failure,
            };
        }




    }
}

module.exports = AgendamentoConsultaController