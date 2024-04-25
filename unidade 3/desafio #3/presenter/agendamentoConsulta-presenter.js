const AgendamentoConsultaView = require("../view/agendamentoConsulta-view");
const {OperationStatus} = require("../controller/operationError");

class AgendamentoConsultaPresenter{
    
    #controller
    #view

    constructor(controller){
        this.#controller = controller
        this.#view = new AgendamentoConsultaView()
    }
    async run(){
        const data = await this.#view.readData(this.#controller.canAddConsulta)

        const result = await this.#controller.agendaConsulta(data.cpf, data.data, data.horaInicial, data.horaFinal)

        if (result.status === OperationStatus.SUCCESS) {
            this.#view.process(OperationStatus.SUCCESS);
        } else {
            this.#view.process(OperationStatus.FAILURE, result.errors);
        }


    }
}

module.exports = AgendamentoConsultaPresenter