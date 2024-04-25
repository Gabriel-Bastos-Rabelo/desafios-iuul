const session = require("../session/session.js");
const Paciente = require("../models/Paciente.js");
const {OperationStatus, OperationErrors} = require("./operationError.js");

class InclusaoPacienteController{
    async canAddPaciente(cpf){
        if(await session.Consultorio.hasPaciente(cpf)){
            return {
                status: OperationStatus.FAILURE,
                errors: [OperationErrors.PATIENT_ALREADY_REGISTERED],
            };
        }

        return { status: OperationStatus.SUCCESS }
    }
    async incluirPaciente(cpf, nome, dataNascimento) {
        
        const hasPacient = await this.canAddPaciente(cpf);

        if(hasPacient.status == OperationStatus.FAILURE){
            return hasPacient
        }
        
        const result = Paciente.create(cpf, nome, dataNascimento);

        
        if(result.success){
            const paciente = result.success;
            await session.Consultorio.addPaciente(paciente);
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

module.exports = InclusaoPacienteController