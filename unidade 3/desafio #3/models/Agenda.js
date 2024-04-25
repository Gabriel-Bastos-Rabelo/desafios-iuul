const { DataTypes, Model } = require("sequelize");
const db = require('../config/database');
/*
class Agenda{

    #agenda
    constructor(){
        this.#agenda = []
    }

    add(agendamento){
        this.#agenda.push(agendamento)
    }

    cancelarAgendamento(dataConsulta, horaInicial) {
        const indiceAgendamento = this.#agenda.findIndex(agendamento => agendamento.dataConsulta === dataConsulta && agendamento.horaInicial === horaInicial);
    
        if (indiceAgendamento !== -1) {
            this.#agenda.splice(indiceAgendamento, 1);
        }
    }

    hasAgendamentoFuturo(cpf) {
        const dataAtual = new Date();
        const consultas = [];
    
    
        for (let consulta of this.#agenda) {
            if (consulta.paciente.cpf === cpf) {
                consultas.push(consulta);
            }
        }
    
        for (const consulta of consultas) {
            const dataConsultaParts = consulta.dataConsulta.split('/');
            const dataConsultaFormatada = new Date(dataConsultaParts[2], dataConsultaParts[1] - 1, dataConsultaParts[0]);
            
    
            if (dataConsultaFormatada > dataAtual) {
               
                return true;
            } else if (dataConsultaFormatada.getTime() === dataAtual.setHours(0, 0, 0, 0)) {
                const horaAtual = dataAtual.getHours() * 100 + dataAtual.getMinutes();
                const [hora, minuto] = consulta.horaInicial.split(':').map(Number);
                const horaInicial = hora * 100 + minuto;
    
                if (horaInicial > horaAtual) {
                    return true;
                }
            }
        }
    
        // Se nenhum dos casos acima, retorna false
        return false;
    }

    hasAgendamentoSobreposto(dataConsulta, horaInicial, horaFinal){
        const novaConsultaInicio = parseInt(horaInicial.substring(0, 2)) * 60 + parseInt(horaInicial.substring(2));
        const novaConsultaFim = parseInt(horaFinal.substring(0, 2)) * 60 + parseInt(horaFinal.substring(2));
        
        for (let consulta of this.#agenda) {
           
            if (consulta.dataConsulta === dataConsulta) {
                const agendamentoInicio = parseInt(consulta.horaInicial.substring(0, 2)) * 60 + parseInt(consulta.horaInicial.substring(2));
                const agendamentoFim = parseInt(consulta.horaFinal.substring(0, 2)) * 60 + parseInt(consulta.horaFinal.substring(2));
    
                
                if ((novaConsultaInicio <= agendamentoFim && novaConsultaFim >= agendamentoInicio)) {
                    return true; 
                }
            }
        }
    
        return false; 
    }

    getAgendamentosFuturosPorCpf(cpf){
        

        for(let agendamento of this.#agenda){
            if(agendamento.paciente.cpf === cpf && agendamento.agendamentoFuturo()){
                return agendamento
            }
        }

        return null
    }

    listarAgenda(opcao, dataInicial = null, dataFinal = null){
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

            
            dicionario[dataFormatada].push({nome: consulta.paciente.nome, dataNascimento: consulta.paciente.dataNascimento, horaInicial: horaInicialFormatada, horaFinal: horaFinalFormatada, duracao: duracaoFormatada});
           
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

module.exports = Agenda
*/

const Pacientes = require('./Pacientes');
const FormateDate = require('../utils/FormateDate');

class Agenda extends Model {
    static async add(consulta){
        try {
            let dataFormatada = consulta.dataConsulta.split('/')
            dataFormatada = `${dataFormatada[1]}/${dataFormatada[0]}/${dataFormatada[2]}`
            await consulta.paciente.createAgenda({dataConsulta: dataFormatada, horaInicial: consulta.horaInicial, horaFinal: consulta.horaFinal});

        } catch (error) {
            console.error('Erro na inclusão da consulta:', error);
        }
    }

    static async cancelarAgendamento(dataConsulta, horaInicial){
        const partes = dataConsulta.split('/');
        const dataFormatada = `${partes[2]}-${partes[1]}-${partes[0]}`;
        try{
            await Agenda.destroy({where: {dataConsulta: dataFormatada, horaInicial: horaInicial}});

        }
        catch(error){
            console.error("Erro no cancelamento do agendamento: ", error)
        }
    }

    static async hasAgendamentoFuturo(cpf){

        try{
            const paciente = await Pacientes.getPaciente(cpf)
            const id = paciente.id
            const dataAtual = new Date();
            const consultas = await Agenda.findAll()
            for(let consulta of consultas){
                if(consulta.PacienteId === id){
                    const dataConsultaParts = FormateDate(consulta.dataConsulta).split('/');
                    const dataConsultaFormatada = new Date(dataConsultaParts[2], dataConsultaParts[1] - 1, dataConsultaParts[0]);

                    if (dataConsultaFormatada > dataAtual) {
               
                        return true;
                    } else if (dataConsultaFormatada.getTime() === dataAtual.setHours(0, 0, 0, 0)) {
                        const horaAtual = dataAtual.getHours() * 100 + dataAtual.getMinutes();
                        const [hora, minuto] = consulta.horaInicial.split(':').map(Number);
                        const horaInicial = hora * 100 + minuto;
            
                        if (horaInicial > horaAtual) {
                            return true;
                        }
                    }
                }
            }

            return false
            
        }   
        catch(err){
            console.error("Erro na verificação de agendamentos futuros", err)
        }

    }

    static async hasAgendamentoSobreposto(dataConsulta, horaInicial, horaFinal){
        const novaConsultaInicio = parseInt(horaInicial.substring(0, 2)) * 60 + parseInt(horaInicial.substring(2));
        const novaConsultaFim = parseInt(horaFinal.substring(0, 2)) * 60 + parseInt(horaFinal.substring(2));
        const consultas = await Agenda.findAll();

        for(let consulta of consultas){
           
            if(FormateDate(consulta.dataConsulta) == dataConsulta){
                const agendamentoInicio = parseInt(consulta.horaInicial.substring(0, 2)) * 60 + parseInt(consulta.horaInicial.substring(2));
                const agendamentoFim = parseInt(consulta.horaFinal.substring(0, 2)) * 60 + parseInt(consulta.horaFinal.substring(2));
    
                
                if ((novaConsultaInicio <= agendamentoFim && novaConsultaFim >= agendamentoInicio)) {
                    return true; 
                }
            }
        }

        return false
    }

    static async getAgendamentosFuturosPorCpf(cpf){
        const agendamentos = await Agenda.findAll()
        for(let agendamento of agendamentos){
            const paciente = await Pacientes.findOne({where:{id: agendamento.PacienteId}})
            if(paciente.cpf === cpf){
                const partesData = FormateDate(agendamento.dataConsulta).split('/');
                const dia = parseInt(partesData[0], 10);
                const mes = parseInt(partesData[1], 10) - 1; 
                const ano = parseInt(partesData[2], 10);
              
                const horas = parseInt(agendamento.horaInicial.substring(0, 2), 10);
                const minutos = parseInt(agendamento.horaInicial.substring(2, 4), 10);
              
               
                const dataConsultaObj = new Date(ano, mes, dia, horas, minutos);
              
             
                const dataAtual = new Date();
                
                
                
                if (dataConsultaObj > dataAtual) {
                    return agendamento
                }
                
            }
        }

        return null
    }

    static async listarAgenda(opcao, dataInicial = null, dataFinal = null) {
        const agenda = await Agenda.findAll();
        const dicionario = {};
    
        const consultasPromises = agenda.map(async consulta => {
            const dataFormatada = FormateDate(consulta.dataConsulta).split("/").reverse().join("-");
    
            if (opcao == 'P' && dataInicial && dataFinal) {
                const dateConsulta = new Date(dataFormatada);
                const dataInicialFormatada = new Date(dataInicial.split("/").reverse().join("-"));
                const dataFinalFormatada = new Date(dataFinal.split("/").reverse().join("-"));
                if (dateConsulta < dataInicialFormatada || dateConsulta > dataFinalFormatada) {
                    return;
                }
            }
    
            const horaInicialFormatada = consulta.horaInicial.slice(0, 2) + ":" + consulta.horaInicial.slice(2, 4);
            const horaFinalFormatada = consulta.horaFinal.slice(0, 2) + ":" + consulta.horaFinal.slice(2, 4);
    
            let duracaoHoras = parseInt(horaFinalFormatada.slice(0, 2)) - parseInt(horaInicialFormatada.slice(0, 2));
            if (parseInt(horaFinalFormatada.slice(3, 5)) < parseInt(horaInicialFormatada.slice(3, 5))) {
                duracaoHoras -= 1;
            }
            if (duracaoHoras >= 0 && duracaoHoras < 10) {
                duracaoHoras = "0" + duracaoHoras;
            }
    
            let duracaoMinutos = Math.abs(parseInt(horaFinalFormatada.slice(3, 5)) - parseInt(horaInicialFormatada.slice(3, 5)));
            if (duracaoMinutos >= 0 && duracaoMinutos < 10) {
                duracaoMinutos = "0" + duracaoMinutos;
            }
    
            const duracaoFormatada = duracaoHoras + ":" + duracaoMinutos;
            
            const dataFormatadaBr = dataFormatada.split("-")
            if (!dicionario[`${dataFormatadaBr[2]}/${dataFormatadaBr[1]}/${dataFormatadaBr[0]}`]) {
                dicionario[`${dataFormatadaBr[2]}/${dataFormatadaBr[1]}/${dataFormatadaBr[0]}`] = [];
            }
    
            const paciente = await Pacientes.findOne({ where: { id: consulta.PacienteId } });
            dicionario[`${dataFormatadaBr[2]}/${dataFormatadaBr[1]}/${dataFormatadaBr[0]}`].push({ nome: paciente.nome, dataNascimento: FormateDate(paciente.dataNascimento), horaInicial: horaInicialFormatada, horaFinal: horaFinalFormatada, duracao: duracaoFormatada });
        });
    
        await Promise.all(consultasPromises);
    
        return dicionario;
    }
    

    


    
}


Agenda.init({
    
    dataConsulta: {
        type: DataTypes.DATE,
        allowNull: false
    },
    horaInicial: {
        type: DataTypes.STRING,
        allowNull: false
    },

    horaFinal: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    sequelize: db, 
    modelName: 'agenda', 
    tableName: 'agenda', 
    timestamps: true 
})

module.exports = Agenda;