const Paciente = require("../models/Paciente");
const Consulta = require("../models/Consulta");
const Validacoes = require("./Validacoes");

class Funcionalidades {

    #agenda;
    #pacientes;
    constructor() {
        this.#agenda = [];
        this.#pacientes = [];
        
    }

    incluirPaciente(cpf, nome, dataNascimento) {
        
    
        if(!Validacoes.validarCPF(cpf)){
          return false;
        }

        if (this.pacientes.find((paciente) => paciente.cpf === cpf)) {
          return false;
        }

        if (nome.length < 5) {
          return false;
        }

        if (!Validacoes.validarData(dataNascimento)) {
          return false;
        }

        if (!Validacoes.validarIdadeMinima(dataNascimento)) {
          return false;
        }

        const paciente = new Paciente(cpf, nome, dataNascimento);
    
        
        this.#pacientes.push(paciente);

        return true;
        
    }


    agendarConsulta(cpf, dataConsulta, horaInicial, horaFinal) {

        if (!Validacoes.validarCPF(cpf)) {
          return false;
        }

        const paciente = this.#pacientes.find((paciente) => paciente.cpf === cpf);

        if (!paciente) {
          return false;
        }

        if (Validacoes.possuiAgendamentoFuturo(cpf, this.#agenda)) {
          return false;
        }

        if (!Validacoes.validarData(dataConsulta)) {
          return false;
        }

        if (!Validacoes.validarHora(horaInicial)) {
          return false;
        }

        if (!Validacoes.validarHora(horaFinal)) {
          return false;
        }

        if (parseInt(horaFinal) <= parseInt(horaInicial)) {
          return false;
        }

        if (parseInt(horaInicial) < 800 || parseInt(horaFinal) > 1900) {
          return false;
        }

        if (Validacoes.existeAgendamentoSobreposto(dataConsulta, horaInicial, horaFinal, this.#agenda)) {
          return false;
        }
        
        
    
        const consulta = new Consulta(paciente, dataConsulta, horaInicial, horaFinal);
        
        this.#agenda.push(consulta);

        return true;
    
        
    }



    cancelarConsulta(cpf, dataConsulta, horaInicial) {

      if (!Validacoes.validarCPF(cpf)) {
        return false;
      }

      const paciente = this.pacientes.find((paciente) => paciente.cpf === cpf);
      if (!paciente) {
          return false;
      }

      if (!Validacoes.validarData(dataConsulta)) {
        return false;
      }

      if (!Validacoes.validarHora(horaInicial)) {
        return false;
      }

      const dataAtual = new Date();
      const dataConsultaObj = new Date(dataConsulta);
      const horaAtual = dataAtual.getHours() * 100 + dataAtual.getMinutes();
      const horaInicialObj = parseInt(horaInicial);

      if (dataConsultaObj < dataAtual) {
          return false;
      } else if (dataConsultaObj === dataAtual && horaInicialObj <= horaAtual) {
          return false;
      }

      const indiceAgendamento = this.#agenda.findIndex(
        (consulta) =>
            consulta.paciente.cpf === cpf &&
            consulta.dataConsulta === dataConsulta &&
            consulta.horaInicial === horaInicial
      );


      if (indiceAgendamento === -1) {
          return false;
      }

      this.#agenda.splice(indiceAgendamento, 1);

      return true;
  
    }

    excluirPaciente(cpf) {

        if (!Validacoes.validarCPF(cpf)) {
          return false;
        }

        const paciente = this.#pacientes.find((paciente) => paciente.cpf === cpf);
        if (!paciente) {
            return false;
        }

        if (Validacoes.possuiAgendamentoFuturo(cpf, this.#agenda)) {
            return false;
        }
        
        const indicesAgendamentos = this.#agenda.reduce((indices, agendamento, indice) => {
          if (agendamento.paciente.cpf === cpf) {
            indices.push(indice);
          }
          return indices;
        }, []);
    
        
        indicesAgendamentos.forEach((indice) => this.#agenda.splice(indice, 1));
    

        const indicePaciente = this.#pacientes.indexOf(paciente);
        this.#pacientes.splice(indicePaciente, 1);
    
        
        return true;
    }

    listarPacientes(ordenacao) {

        let pacientesOrdenados;
        if (ordenacao === "cpf") {
          pacientesOrdenados = this.#pacientes.sort((pacienteA, pacienteB) =>
            pacienteA.cpf.localeCompare(pacienteB.cpf)
          );
        } else if (ordenacao === "nome") {
          pacientesOrdenados = this.#pacientes.sort((pacienteA, pacienteB) =>
            pacienteA.nome.localeCompare(pacienteB.nome)
          );
        }
        
    

        const listaPacientes = pacientesOrdenados.map((paciente) => {
          const agendamentosFuturos = this.#agenda.filter(
            (agendamento) => agendamento.paciente.cpf === paciente.cpf && Validacoes.consultaFutura(agendamento.dataConsulta, agendamento.horaInicial)
          );
    
          return {
            paciente,
            agendamentosFuturos,
          };
        });
    
        return listaPacientes;
    }

    listarAgenda(opcao, dataInicial = null, dataFinal = null){
        if (opcao == 'T' || opcao == 'P'){

          
        
          if(opcao == 'P' && (!Validacoes.validarData(dataInicial) || !Validacoes.validarData(dataFinal))){
            return false
          }
          const dicionario = {};

        this.#agenda.forEach(consulta => {
            
            const dataFormatada = consulta.dataConsulta.split("/").reverse().join("-"); 

            if(opcao == 'P'){
              const dateConsulta = new Date(dataFormatada);
              const dataInicialFormatada = new Date(dataInicial.split("/").reverse().join("-"));
              const dataFinalFormatada = new Date(dataFinal.split("/").reverse().join("-"));
              if (dateConsulta < dataInicialFormatada || dateConsulta > dataFinalFormatada) {
                return;
              }
        
            }

            const horaInicialFormatada = consulta.horaInicial.slice(0, 2) + ":" + consulta.horaInicial.slice(2, 4); 
            const horaFinalFormatada = consulta.horaFinal.slice(0, 2) + ":" + consulta.horaFinal.slice(2, 4);

            let duracaoHoras = (parseInt(horaFinalFormatada.slice(0, 2)) - parseInt(horaInicialFormatada.slice(0, 2)))
            
        
            if (parseInt(horaFinalFormatada.slice(3,5)) < parseInt(horaInicialFormatada.slice(3, 5))){
              duracaoHoras -= 1
            }

            if(duracaoHoras >= 0 && duracaoHoras < 10){
              duracaoHoras = "0" + duracaoHoras;
            }

            
            let duracaoMinutos = Math.abs(parseInt(horaFinalFormatada.slice(3, 5)) - parseInt(horaInicialFormatada.slice(3, 5)));

            if(duracaoMinutos >= 0 && duracaoMinutos < 10){
              duracaoMinutos = "0" + duracaoMinutos;
            }

      
            const duracaoFormatada = duracaoHoras + ":" + duracaoMinutos;



            if (!dicionario[dataFormatada]) {
                dicionario[dataFormatada] = [];
            }

            
            dicionario[dataFormatada].push({...consulta, horaInicial: horaInicialFormatada, horaFinal: horaFinalFormatada, duracao: duracaoFormatada});
        });

        
        for (const data in dicionario) {
            dicionario[data].sort((a, b) => a.horaInicial.localeCompare(b.horaInicial));
        }

     
        return Object.keys(dicionario).sort().reduce((acc, key) => {
            acc[key] = dicionario[key];
            return acc;
        }, {});

      }


    }

    get pacientes(){
      return this.#pacientes;
    }


    get agenda(){
      return this.#agenda;
    }
    
    
    
    
    


}






module.exports = Funcionalidades;