const InclusaoPacienteController = require("./inclusaoPacienteController");
const InclusaoPacientePresenter = require("../presenter/inclusaoPaciente-presenter");
const ListagemPacienteController = require("./listagemPacienteController");
const ListagemPacientePresenter = require("../presenter/listagemPaciente-presenter")
const ExclusaoPacienteController = require("./exclusaoPacienteController");
const ExclusaoPacientePresenter = require("../presenter/exclusaoPaciente-presenter");
const AgendamentoConsultaController = require("./agendamentoConsultaController");
const AgendamentoConsultaPresenter = require("../presenter/agendamentoConsulta-presenter");
const CancelamentoConsultaController = require("./cancelamentoConsultaController");
const CancelamentoConsultaPresenter = require("../presenter/cancelamentoConsulta-presenter");
const ListagemAgendaController = require("./listagemAgendaController");
const ListagemAgendaPresenter = require("../presenter/listagemAgenda-presenter");


class MainController{
    async incluirPaciente() {
        // Cria o controller
        const controller = new InclusaoPacienteController();

        // Cria o Presenter
        // Injeta o controller no Presenter
        const presenter = new InclusaoPacientePresenter(controller);

        // Presenter assume a execução
        await presenter.run();
    }

    async excluirPaciente() {
        // Cria o controller
        const controller = new ExclusaoPacienteController();

        // Cria o Presenter
        // Injeta o controller no Presenter
        const presenter = new ExclusaoPacientePresenter(controller);

        // Presenter assume a execução
        await presenter.run();
    }

    async listarPacientesCPF() {
        // Cria o controller
        const controller = new ListagemPacienteController();

        // Cria o Presenter
        // Injeta o controller no Presenter
        const presenter = new ListagemPacientePresenter(controller);

        // Presenter assume a execução
        await presenter.runListagemCPF();
    }

    async listarPacientesNome() {
        // Cria o controller
        const controller = new ListagemPacienteController();

        // Cria o Presenter
        // Injeta o controller no Presenter
        const presenter = new ListagemPacientePresenter(controller);

        // Presenter assume a execução
        await presenter.runListagemNome();
    }

    async agendarConsulta() {
        // Cria o controller
        const controller = new AgendamentoConsultaController();

        // Cria o Presenter
        // Injeta o controller no Presenter
        const presenter = new AgendamentoConsultaPresenter(controller);

        // Presenter assume a execução
        await presenter.run();
    }

    async cancelarConsulta() {
        // Cria o controller
        const controller = new CancelamentoConsultaController();

        // Cria o Presenter
        // Injeta o controller no Presenter
        const presenter = new CancelamentoConsultaPresenter(controller);

        // Presenter assume a execução
        await presenter.run();
    }

    async listarAgenda() {
        // Cria o controller
        const controller = new ListagemAgendaController();

        // Cria o Presenter
        // Injeta o controller no Presenter
        const presenter = new ListagemAgendaPresenter(controller);

        // Presenter assume a execução
        await presenter.run();
    }
}


module.exports = MainController