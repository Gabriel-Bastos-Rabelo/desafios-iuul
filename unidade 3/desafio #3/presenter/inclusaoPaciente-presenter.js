const {OperationStatus} = require("../controller/operationError");
const InclusaoPacienteView = require("../view/inclusaoPaciente-view");

class InclusaoPacientePresenter{
    #view
    #controller

    constructor(controller){
        this.#controller = controller
        this.#view = new InclusaoPacienteView()
    }

    async run(){
        const dados = await this.#view.readData(this.#controller.canAddPaciente)

        const result = await this.#controller.incluirPaciente(dados.cpf, dados.nome, dados.dataNascimento)

        if (result.status === OperationStatus.SUCCESS) {
            this.#view.process(OperationStatus.SUCCESS);
        } else {
            this.#view.process(OperationStatus.FAILURE, result.errors);
        }
        
    }
}

module.exports = InclusaoPacientePresenter