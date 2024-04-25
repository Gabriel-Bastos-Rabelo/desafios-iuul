const session = require("../session/session");


class ListagemPacienteController{
    async listarPorNome(){
        const pacientesOrdenados = await session.Consultorio.listarPorNome()

        return pacientesOrdenados
    }



    async listarPorCPF(){
        const pacientesOrdenados = await session.Consultorio.listarPorCPF()

        return pacientesOrdenados
    }
}

module.exports = ListagemPacienteController