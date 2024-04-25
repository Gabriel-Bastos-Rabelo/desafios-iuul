const input = require('readline-sync');
const Funcionalidades = require("../controller/Funcionalidades");
const Validacoes = require("../controller/Validacoes");

class Menu {

    #funcionalidades


    constructor() {
        this.#funcionalidades = new Funcionalidades();

    }

    iniciarMenuPrincipal() {
        let opcao = 0;

        while (opcao !== 3) {

            console.log('Menu Principal');
            console.log('1 - Cadastro de pacientes');
            console.log('2 - Agenda');
            console.log('3 - Fim');


            opcao = input.questionInt('Digite a opção desejada: ');


            switch (opcao) {
                case 1:

                    console.log('Acessando Cadastro de Pacientes...');
                    this.iniciarMenuCadastroPacientes();

                    break;
                case 2:

                    console.log('Acessando Agenda...');
                    this.iniciarMenuAgenda();

                    break;
                case 3:

                    console.log('Saindo do sistema...');
                    break;
                default:

                    console.log('Opção inválida! Tente novamente.');
            }
        }
    }

    iniciarMenuCadastroPacientes() {
        let opcao = 0;

        while (opcao !== 5) {

            console.log('Menu do Cadastro de Pacientes');
            console.log('1 - Cadastrar novo paciente');
            console.log('2 - Excluir paciente');
            console.log('3 - Listar pacientes (ordenado por CPF)');
            console.log('4 - Listar pacientes (ordenado por nome)');
            console.log('5 - Voltar p/ menu principal');


            opcao = input.questionInt('Digite a opção desejada: ');


            let cpf;
            let nome;
            let dataNascimento;
            let pacientes;
            switch (opcao) {
                case 1:


                    while (true) {
                        cpf = input.question('CPF: ');
                        if (!Validacoes.validarCPF(cpf)) {
                            console.log("\nErro: CPF inválido!\n");
                            continue;
                        }

                        if (this.#funcionalidades.pacientes.find((paciente) => paciente.cpf === cpf)) {
                            console.log("\nErro: CPF já cadastrado\n");
                            continue;
                        }

                        break;
                    }

                    while (true) {
                        nome = input.question("Nome: ");

                        if (nome.length < 5) {
                            console.log("\nErro: Nome deve ter pelo menos 5 caracteres!\n");
                            continue;
                        }

                        break;

                    }

                    while (true) {

                        dataNascimento = input.question("Data de nascimento (DD/MM/AAAA): ");
                        if (!Validacoes.validarData(dataNascimento)) {
                            console.log("\nErro: Data de nascimento inválida!\n");
                            continue;
                        }

                        if (!Validacoes.validarIdadeMinima(dataNascimento)) {
                            console.log("\nErro: paciente deve ter pelo menos 13 anos.\n");
                            continue;
                        }

                        break;
                    }



                    if(this.#funcionalidades.incluirPaciente(cpf, nome, dataNascimento)){
                        console.log("\nPaciente cadastrado com sucesso!\n");
                    }
                    else{
                        console.log("\nErro: Erro no cadastro do paciente\n");
                    }

                    

                    break;
                case 2:
                    while (true) {
                        cpf = input.question('CPF: ');
                        if (!Validacoes.validarCPF(cpf)) {
                            console.log("\nErro: CPF inválido!\n");
                            continue;
                        }

                        const paciente = this.#funcionalidades.pacientes.find((paciente) => paciente.cpf === cpf);
                        if (!paciente) {
                            console.log("\nErro: paciente não cadastrado\n");
                            continue;
                        }


                        if (Validacoes.possuiAgendamentoFuturo(cpf, this.#funcionalidades.agenda)) {
                            console.error("\nErro: paciente está agendado.\n");
                            continue;
                        }

                        if(this.#funcionalidades.excluirPaciente(cpf)){
                            console.log("\nPaciente excluído com sucesso!\n");
                        }
                        else{
                            console.log("\nFalha na exclusão do paciente!\n");
                        }
                        
                        break


                    }


                    break;
                case 3:

                    pacientes = this.#funcionalidades.listarPacientes("cpf");
                    console.log('------------------------------------------------------------');
                    console.log('CPF         Nome           Dt.Nasc.           Idade');
                    console.log('------------------------------------------------------------');


                    pacientes.forEach(({ paciente, agendamentosFuturos }) => {
                        const idade = calcularIdade(paciente.dataNascimento);
                        console.log(`${paciente.cpf.padEnd(11, ' ')} ${paciente.nome.padEnd(15, ' ')} ${paciente.dataNascimento.padEnd(16, ' ')} ${idade.toString()}`);
                        if (agendamentosFuturos.length > 0) {
                            agendamentosFuturos.forEach((agendamento) => {
                                console.log(`           Agendado para: ${agendamento.dataConsulta}`);
                                console.log(`           ${agendamento.horaInicial.slice(0, 2)}:${agendamento.horaInicial.slice(2, 4)} às ${agendamento.horaFinal.slice(0, 2)}:${agendamento.horaFinal.slice(2, 4)}`);
                            });
                        }
                    });

                    console.log('------------------------------------------------------------');
                    break;
                case 4:
                    pacientes = this.#funcionalidades.listarPacientes("nome");
                    console.log('------------------------------------------------------------');
                    console.log('CPF         Nome           Dt.Nasc.           Idade');
                    console.log('------------------------------------------------------------');


                    pacientes.forEach(({ paciente, agendamentosFuturos }) => {
                        const idade = calcularIdade(paciente.dataNascimento);
                        console.log(`${paciente.cpf.padEnd(11, ' ')} ${paciente.nome.padEnd(15, ' ')} ${paciente.dataNascimento.padEnd(16, ' ')} ${idade.toString()}`);
                        if (agendamentosFuturos.length > 0) {
                            agendamentosFuturos.forEach((agendamento) => {
                                console.log(`           Agendado para: ${agendamento.dataConsulta}`);
                                console.log(`           ${agendamento.horaInicial.slice(0, 2)}:${agendamento.horaInicial.slice(2, 4)} às ${agendamento.horaFinal.slice(0, 2)}:${agendamento.horaFinal.slice(2, 4)}`);
                            });
                        }
                    });

                    console.log('------------------------------------------------------------');
                    break;
                case 5:

                    console.log('Voltando para o menu principal...');
                    break;
                default:

                    console.log('Opção inválida! Tente novamente.');
            }
        }
    }

    iniciarMenuAgenda() {
        let opcao = 0;

        while (opcao !== 4) {

            console.log('Agenda');
            console.log('1 - Agendar consulta');
            console.log('2 - Cancelar agendamento');
            console.log('3 - Listar agenda');
            console.log('4 - Voltar p/ menu principal');


            opcao = input.questionInt('Digite a opção desejada: ');

            let cpf;
            let data;
            let dataInicial;
            let dataFinal;
            let horaInicial;
            let horaFinal;
            let opcaoAgenda;
            let agenda;


            switch (opcao) {
                case 1:
                    
                    while (true) {
                        cpf = input.question('CPF: ');
                        if (!Validacoes.validarCPF(cpf)) {
                            console.log("\nErro: CPF inválido!\n");
                            continue;
                        }

                        const paciente = this.#funcionalidades.pacientes.find((paciente) => paciente.cpf === cpf);
                        if (!paciente) {
                            console.log("\nErro: paciente não cadastrado\n");
                            continue;
                        }

                        if (Validacoes.possuiAgendamentoFuturo(cpf, this.#funcionalidades.agenda)) {
                            console.log("\nErro: Paciente já possui uma consulta futura!\n");
                            continue;
                        }



                        break;
                    }

                    while (true) {
                        data = input.question('Data da consulta (DD/MM/AAAA): ');
                        if (!Validacoes.validarData(data)) {
                            console.log("\nErro: Data da consulta inválida!\n");
                            continue;
                        }

                        break;

                    }

                    while (true) {
                        horaInicial = input.question("Hora inicial: ");
                        if (!Validacoes.validarHora(horaInicial)) {
                            console.log("\nErro: Hora inicial inválida!\n");
                            continue;
                        }

                        break;
                    }

                    while (true) {
                        horaFinal = input.question("Hora Final: ");
                        if (!Validacoes.validarHora(horaFinal)) {
                            console.log("\nErro: Hora final inválida!\n");
                            continue;
                        }

                        break;

                    }


                    if (parseInt(horaFinal) <= parseInt(horaInicial)) {
                        console.log("\nErro: Hora final deve ser maior que hora inicial!\n");
                        break;
                    }



                    if (parseInt(horaInicial) < 800 || parseInt(horaFinal) > 1900) {
                        console.log("\nHorário de funcionamento do consultório é das 8h às 19h!\n");
                        break;
                    }


                    if (Validacoes.existeAgendamentoSobreposto(data, horaInicial, horaFinal, this.#funcionalidades.agenda)) {
                        console.log("\nErro: já existe uma consulta agendada nesse horário\n");
                        break;
                    }

                    if(this.#funcionalidades.agendarConsulta(cpf, data, horaInicial, horaFinal)){
                        console.log("\nAgendamento realizado com sucesso!\n");
                    }
                    else{
                        console.log("\nErro: Falha no Agendamento!\n");
                    }

                    


                    break;
                case 2:
                    

                    while (true) {
                        cpf = input.question('CPF: ');
                        if (!Validacoes.validarCPF(cpf)) {
                            console.log("\nErro: CPF inválido!\n");
                            continue;
                        }

                        const paciente = this.#funcionalidades.pacientes.find((paciente) => paciente.cpf === cpf);
                        if (!paciente) {
                            console.log("\nErro: paciente não cadastrado\n");
                            continue;
                        }

                        break;
                    }

                    while (true) {
                        data = input.question('Data da consulta (DD/MM/AAAA): ');
                        if (!Validacoes.validarData(data)) {
                            console.log("\nErro: Data da consulta inválida!\n");
                            continue;
                        }

                        break;

                    }

                    while (true) {
                        horaInicial = input.question("Hora inicial: ");
                        if (!Validacoes.validarHora(horaInicial)) {
                            console.log("\nErro: Hora inicial inválida!\n");
                            continue;
                        }

                        break;
                    }

                    const dataAtual = new Date();
                    const dataConsultaObj = new Date(data);
                    const horaAtual = dataAtual.getHours() * 100 + dataAtual.getMinutes();
                    const horaInicialObj = parseInt(horaInicial);

                    if (dataConsultaObj < dataAtual) {
                        console.log("\nErro: Agendamento já realizado!\n");
                        break;
                    } else if (dataConsultaObj === dataAtual && horaInicialObj <= horaAtual) {
                        console.log("\nErro: Agendamento já realizado!\n");
                        break;
                    }

                    const indiceAgendamento = this.#funcionalidades.agenda.findIndex(
                        (consulta) =>
                            consulta.paciente.cpf === cpf &&
                            consulta.dataConsulta === data &&
                            consulta.horaInicial === horaInicial
                    );


                    if (indiceAgendamento === -1) {
                        console.log("\nErro: agendamento não encontrado\n");
                        break;
                    }

                    if(this.#funcionalidades.cancelarConsulta(cpf, data, horaInicial)){
                        console.log("\nAgendamento cancelado com sucesso!\n");
                    }
                    else{
                        console.log("\nFalha no cancelamento do agendamento!\n");
                    }

                    

                    break;
                case 3:
                    while (true) {
                        opcaoAgenda = input.question("Apresentar a agenda T-Toda ou P-Periodo: ")

                        if (opcaoAgenda != 'P' && opcaoAgenda != 'T') {
                            console.log("\nErro: Opção inválida\n");
                            continue;
                        }

                        break;
                    }

                    if (opcaoAgenda == 'P') {
                        while (true) {
                            dataInicial = input.question("Data inicial: ");
                            if (!Validacoes.validarData(dataInicial)) {
                                console.log("\nErro: Data inicial inválida!\n");
                                continue;
                            }

                            break;
                        }

                        while (true) {

                            dataFinal = input.question("Data final: ");
                            if (!Validacoes.validarData(dataFinal)) {
                                console.log("\nErro: Data final inválida!\n");
                                continue;
                            }

                            break;

                        }

                        agenda = this.#funcionalidades.listarAgenda("P", dataInicial, dataFinal);
                    }
                    else {
                        agenda = this.#funcionalidades.listarAgenda("T");
                    }

                    if(!agenda){
                        console.log("\nErro na listagem da agenda!\n");
                        break;
                    }

                    console.log("Data       H.Ini  H.Fim  Tempo  Nome                             Dt.Nasc.");
                    console.log("----------------------------------------------------------------------------");
                    Object.keys(agenda).forEach(data => {
                        agenda[data].forEach(consulta => {
                            const { paciente, horaInicial, horaFinal, duracao } = consulta;
                            console.log(`${consulta.dataConsulta.padEnd(11, ' ')} ${horaInicial.padEnd(6, ' ')} ${horaFinal.padEnd(6, ' ')} ${duracao.padEnd(7, ' ')} ${paciente.nome.padEnd(33, ' ')} ${paciente.dataNascimento}`);
                        });
                    });
                    console.log("--------------------------------------------------------------------------------");
                    break;
                case 4:

                    console.log('Voltando para o menu principal...');
                    break;
                default:

                    console.log('Opção inválida! Tente novamente.');
            }
        }
    }
}



const calcularIdade = (dataNascimento) => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento.split('/').reverse().join('/'));
    const idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
        return idade - 1;
    }
    return idade;
}

module.exports = Menu;


