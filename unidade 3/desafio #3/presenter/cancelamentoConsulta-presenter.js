const CancelamentoConsultaView = require("../view/cancelamentoConsulta-view");
const {OperationErrors, OperationStatus} = require("../controller/operationError");

class CancelamentoConsultaPresenter{

    #view
    #controller

    constructor(controller){
        this.#controller = controller
        this.#view = new CancelamentoConsultaView()
    }

    async run(){
        const data = await this.#view.readData(this.#controller.canCancelarAgendamento)

        

        const result = await this.#controller.cancelarAgendamento(data.cpf, data.data, data.horaInicial)


        if (result.status === OperationStatus.SUCCESS) {
            this.#view.process(OperationStatus.SUCCESS);
        } else {
            this.#view.process(OperationStatus.FAILURE, result.errors);
        }

        
    }
}


module.exports = CancelamentoConsultaPresenter