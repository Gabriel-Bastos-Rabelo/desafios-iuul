const ExclusaoPacienteView = require("../view/exclusaoPaciente-view");
const { OperationStatus } = require("../controller/operationError");  

class ExclusaoPacientePresenter{

    #controller
    #view
    constructor(controller){
        this.#controller = controller
        this.#view = new ExclusaoPacienteView()
    }

    async run(){

        const data = await this.#view.readData(this.#controller.canExcludePacient)
        
        const result = await this.#controller.excluirPaciente(data)

        if (result.status === OperationStatus.SUCCESS) {
            this.#view.process(OperationStatus.SUCCESS);
        } else {
            this.#view.process(OperationStatus.FAILURE, result.errors);
        }


    }
}

module.exports = ExclusaoPacientePresenter