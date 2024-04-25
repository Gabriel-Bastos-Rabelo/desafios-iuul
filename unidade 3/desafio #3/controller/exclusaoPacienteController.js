const session = require("../session/session");
const {OperationErrors, OperationStatus} = require("../controller/operationError");

class ExclusaoPacienteController{

    async canExcludePacient(cpf){
        if(await session.Consultorio.hasPaciente(cpf)){
            return { status: OperationStatus.SUCCESS }
        }

        return {
            status: OperationStatus.FAILURE,
            errors: [OperationErrors.PATIENT_NOT_REGISTERED],
        };
        

    }
    async excluirPaciente(paciente){
        
        const hasPacient = await this.canExcludePacient(paciente.cpf);

        if(hasPacient.status == OperationStatus.SUCCESS){
            if(await session.Consultorio.hasAgendamentoFuturo(paciente.cpf)){
                return {
                    status: OperationStatus.FAILURE,
                    errors: [OperationErrors.ALREADY_SCHEDULED],
                };
            }
            else{
                await session.Consultorio.removePaciente(paciente);
                return {
                    status: OperationStatus.SUCCESS,
                };
            }
        }
        else{
            return hasPacient
        }
    }
}

module.exports = ExclusaoPacienteController