const { OperationErrors } = require("../controller/operationError");
const Validacoes = require("../utils/Validacoes");

class Consulta {
    #paciente
    #dataConsulta
    #horaInicial
    #horaFinal
    constructor(paciente, dataConsulta, horaInicial, horaFinal) {
        this.#paciente = paciente;
        this.#dataConsulta = dataConsulta;
        this.#horaInicial = horaInicial;
        this.#horaFinal = horaFinal;

    
    }

    static create(paciente, dataConsulta, horaInicial, horaFinal){
        const errors = []
        if (!Validacoes.validarData(dataConsulta)) {
            errors.push(OperationErrors.SCHEDULE_DATE_INCORRECT)
        }
  
        if (!Validacoes.validarHora(horaInicial)) {
            errors.push(OperationErrors.SCHEDULE_INITIAL_TIME_INCORRECT)
        }

        if (!Validacoes.validarHora(horaFinal)) {
            errors.push(OperationErrors.SCHEDULE_END_TIME_INCORRECT)
        }

        if (parseInt(horaFinal) <= parseInt(horaInicial)) {
            errors.push(OperationErrors.SCHEDULE_INITIAL_DATE_AFTER_END_DATE)
        }

        if (parseInt(horaInicial) < 800 || parseInt(horaFinal) > 1900) {
            errors.push(OperationErrors.SCHEDULE_OUTSIDE_OPENING_HOURS)
        }

        return errors.length === 0
        ? { success: new Consulta(paciente, dataConsulta, horaInicial, horaFinal) }
        : { failure: errors };


    }

    agendamentoFuturo(){
        const partesData = this.#dataConsulta.split('/');
        const dia = parseInt(partesData[0], 10);
        const mes = parseInt(partesData[1], 10) - 1; 
        const ano = parseInt(partesData[2], 10);
      
        const horas = parseInt(this.#horaInicial.substring(0, 2), 10);
        const minutos = parseInt(this.#horaInicial.substring(2, 4), 10);
      
       
        const dataConsultaObj = new Date(ano, mes, dia, horas, minutos);
      
     
        const dataAtual = new Date();
      
        
        if (dataConsultaObj > dataAtual) {
            return true;
        }
        return false;
    }

    get paciente(){
        return this.#paciente
    }

    get dataConsulta(){
        return this.#dataConsulta
    }

    get horaFinal(){
        return this.#horaFinal
    }

    get horaInicial(){
        return this.#horaInicial
    }
}


module.exports = Consulta