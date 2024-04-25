const ListagemPacienteView = require("../view/listagemPaciente-view");

class ListagemPacientePresenter{
    
    #controller
    #view
    constructor(controller){
        this.#controller = controller
        this.#view = new ListagemPacienteView()

    }
    async runListagemNome(){
        const data = await this.#controller.listarPorNome()


        this.#view.process(data)

    }

    async runListagemCPF(){
        const data = await this.#controller.listarPorCPF()

        this.#view.process(data)
    }
}

module.exports = ListagemPacientePresenter