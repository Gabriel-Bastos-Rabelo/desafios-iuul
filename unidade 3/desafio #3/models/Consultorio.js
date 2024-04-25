const Agenda = require("./Agenda");
const Pacientes = require("./Pacientes");


class Consultorio{
    #agenda
    #pacientes

    constructor(){
        this.#agenda = Agenda;
        this.#pacientes = Pacientes;
    }

    async addPaciente(paciente){
        
        if (await this.#pacientes.hasPaciente(paciente.cpf)) {
            return false;
        }
        await this.#pacientes.addPaciente(paciente)
        return true;
    }


    async removePaciente(paciente){

        await this.#pacientes.removePaciente(paciente);
    }

    async hasPaciente(cpf){
        if(await this.#pacientes.hasPaciente(cpf)){
            return true
        }

        return false
    }

    async addAgendamento(agendamento){
        await this.#agenda.add(agendamento)
    }

    async hasAgendamentoFuturo(cpf){
        if(await this.#agenda.hasAgendamentoFuturo(cpf)){
            return true
        }

        return false
    }
    async getAgendamentosFuturosPorCpf(cpf){
        const res = await this.#agenda.getAgendamentosFuturosPorCpf(cpf)
        return res
    }

    async hasAgendamentoSobreposto(dataConsulta, horaInicial, horaFinal){
        if(await this.#agenda.hasAgendamentoSobreposto(dataConsulta, horaInicial, horaFinal)){
            return true
        }

        return false
    }

    async listarPorNome() {
        const resultado = []; 
        const pacientesOrdenados = await this.#pacientes.listarPorNome();
        for (let paciente of pacientesOrdenados) {
            const consultas = this.#agenda.getAgendamentosFuturosPorCpf(paciente.cpf);
            const pacienteComAgendamentos = {
                paciente: paciente,
                agendamentosFuturos: consultas
            };
            
            resultado.push(pacienteComAgendamentos);
        }
        
    
        return resultado; 
    }

    async listarPorCPF(){

        const resultado = []; 
        const pacientesOrdenados = await this.#pacientes.listarPorCPF();
        for (let paciente of pacientesOrdenados) {
            const consultas = this.#agenda.getAgendamentosFuturosPorCpf(paciente.cpf);
            const pacienteComAgendamentos = {
                paciente: paciente,
                agendamentosFuturos: consultas
            };
            
            resultado.push(pacienteComAgendamentos);
        }
        
        return resultado; 
        
    }

    async getPaciente(cpf){
        const paciente = await this.#pacientes.getPaciente(cpf)
        return paciente
    }

    listarAgenda(opcao, dataInicial = null, dataFinal = null){
        return this.#agenda.listarAgenda(opcao, dataInicial, dataFinal)
    }

    async cancelarAgendamento(dataConsulta, horaInicial){
        await this.#agenda.cancelarAgendamento(dataConsulta, horaInicial)
    }
}

module.exports = Consultorio