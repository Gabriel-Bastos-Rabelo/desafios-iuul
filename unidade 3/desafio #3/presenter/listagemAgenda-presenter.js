const ListagemAgendaView = require("../view/listagemAgenda-view")

class ListagemAgendaPresenter{
    #controller
    #view
    constructor(controller){
        this.#controller = controller
        this.#view = new ListagemAgendaView()

    }
    async run(){
        

        const option = this.#view.readOption()

        let result
        if(option === 'P'){
            const data = this.#view.readPeriod()

            result = await this.#controller.listarAgenda(option, data.dataInicial, data.dataFinal)
        }
        else{
            result = await this.#controller.listarAgenda(option)
        }

      
        this.#view.process(result)
    }
}

module.exports = ListagemAgendaPresenter