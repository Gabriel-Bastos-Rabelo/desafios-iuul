const {MenuView, MenuOptions} = require("../view/menu-view");

class MenuPresenter {
    #controller
    #view

    constructor(controller){
        this.#controller = controller;
        this.#view = new MenuView();
    }

    async run(){
    
        while(true){
            
            let option = this.#view.Option;

            switch(option){
                case MenuOptions.FIM:
                    return
                
                case MenuOptions.INCLUIR_PACIENTE:
                    await this.#controller.incluirPaciente();
                    break;

                case MenuOptions.EXCLUIR_PACIENTE:
                    await this.#controller.excluirPaciente();
                    break;

                case MenuOptions.LISTAR_PACIENTES_CPF:
                    await this.#controller.listarPacientesCPF();
                    break;

                case MenuOptions.LISTAR_PACIENTES_NOME:
                    await this.#controller.listarPacientesNome();
                    break;

                case MenuOptions.AGENDAR_CONSULTA:
                    await this.#controller.agendarConsulta();
                    break;

                case MenuOptions.CANCELAR_AGENDAMENTO:
                    await this.#controller.cancelarConsulta();
                    break;

                case MenuOptions.LISTAR_AGENDA:
                    await this.#controller.listarAgenda();
                    break;
            }

        }
    }
}


module.exports = MenuPresenter