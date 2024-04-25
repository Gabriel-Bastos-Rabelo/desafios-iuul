const session = require("../session/session");

class ListagemAgendaController{
    listarAgenda(opcao, dataInicial = null, dataFinal = null){
       
        return session.Consultorio.listarAgenda(opcao, dataInicial, dataFinal)

    }
}

module.exports = ListagemAgendaController