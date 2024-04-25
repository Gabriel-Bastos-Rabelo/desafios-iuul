const session = require("../session/session");

class ListagemAgendaController{
    async listarAgenda(opcao, dataInicial = null, dataFinal = null){
        
        const agenda = await session.Consultorio.listarAgenda(opcao, dataInicial, dataFinal)
        return agenda

    }
}

module.exports = ListagemAgendaController