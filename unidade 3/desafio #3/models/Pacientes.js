/*
class Pacientes{
    #pacientes

    constructor(){
        this.#pacientes = []
    }

    addPaciente(paciente){

        this.#pacientes.push(paciente)

        
    }

    removePaciente(paciente){
        const pacienteBuscado = this.#pacientes.find((p) => p.cpf == paciente.cpf)

        const indicePaciente = this.#pacientes.indexOf(pacienteBuscado)

        this.#pacientes.splice(indicePaciente, 1)

    }

    hasPaciente(cpf){
        const pacienteBuscado = this.#pacientes.find((p) => p.cpf == cpf)
        if(pacienteBuscado){
            return true
        }
        return false
    }

    listarPorNome(){
        const pacientesOrdenados = this.#pacientes.sort((pacienteA, pacienteB) =>
            pacienteA.nome.localeCompare(pacienteB.nome)
        );

        return pacientesOrdenados

    }

    listarPorCPF(){

        const  pacientesOrdenados = this.#pacientes.sort((pacienteA, pacienteB) =>
            pacienteA.cpf.localeCompare(pacienteB.cpf)
        );

        return pacientesOrdenados
        
    }

    getPaciente(cpf){
        for(let p of this.#pacientes){
            if(p.cpf === cpf){
                return p
            }
        }
    }



    
}

module.exports = Pacientes
*/


const { Model, DataTypes } = require('sequelize');
const db = require('../config/database');

class Pacientes extends Model {
    static async addPaciente(data) {
        try {
            let dataFormatada = data.dataNascimento.split('/')
            dataFormatada = `${dataFormatada[1]}/${dataFormatada[0]}/${dataFormatada[2]}`
            await Pacientes.create({nome: data.nome, dataNascimento: dataFormatada, cpf: data.cpf});
        } catch (error) {
            console.error('Erro na inclusão de novo paciente:', error);
        }
    }
    static async removePaciente(paciente){
        try{
            await Pacientes.destroy({
                where: {
                    cpf: paciente.cpf // Match the CPF to identify the record to delete
                }
            });
        }
        catch(error){
            console.error('Erro na exclusão de novo paciente:', error);
        }
        
    }

    static async hasPaciente(cpf){

        try {
            const pacienteBuscado = await Pacientes.findOne({
                where: {
                    cpf: cpf
                }
            });

            return pacienteBuscado !== null; 
        } catch (error) {
            console.error('Erro ao verificar a existência do paciente:', error);
        }
    }

    static async listarPorNome() {
        try {
            const pacientesOrdenados = await Pacientes.findAll({
                order: [['nome', 'ASC']] 
            });
            return pacientesOrdenados; 
        } catch (error) {
            console.error('Erro ao listar pacientes por nome:', error);
        }
    }

    static async listarPorCPF() {
        try {
            const pacientesOrdenadosPorCpf = await Pacientes.findAll({
                order: [['cpf', 'ASC']] 
            });
            return pacientesOrdenadosPorCpf; 
        } catch (error) {
            console.error('Erro ao listar todos os pacientes ordenados por CPF:', error);
        }
    }

    static async getPaciente(cpf){
        try{
            const paciente = await Pacientes.findOne( {where: {
                cpf: cpf
            }})
            
            
            return paciente

        }
        catch(err){
            console.error('Erro ao consultar o paciente: ', err)
        }
    }
}

Pacientes.init({
    nome: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    dataNascimento: {
        type: DataTypes.DATE,
        allowNull: false, 
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true, 
    }
}, {
    
    sequelize: db, 
    modelName: 'Paciente', 
    tableName: 'pacientes', 
    timestamps: true 
});

module.exports = Pacientes;
