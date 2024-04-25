const input = require('readline-sync');
const Validacoes = require("../utils/Validacoes");


class ListagemAgendaView{
    readOption(){
        let opcaoAgenda
        while (true) {
            opcaoAgenda = input.question("Apresentar a agenda T-Toda ou P-Periodo: ")

            if (opcaoAgenda != 'P' && opcaoAgenda != 'T') {
                console.log("\nErro: Opção inválida\n");
                continue;
            }

            break;
        }

        return opcaoAgenda
    }

    readPeriod(){
        let dataInicial
        let dataFinal
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

        return {dataInicial, dataFinal}
    }

    process(agenda){
    
        console.log("Data       H.Ini  H.Fim  Tempo  Nome                             Dt.Nasc.");
        console.log("----------------------------------------------------------------------------");
        Object.keys(agenda).forEach(data => {
            agenda[data].forEach(consulta => {
                const { nome, dataNascimento, horaInicial, horaFinal, duracao } = consulta;
               
                console.log(`${data.padEnd(11, ' ')} ${horaInicial.padEnd(6, ' ')} ${horaFinal.padEnd(6, ' ')} ${duracao.padEnd(7, ' ')} ${nome.padEnd(33, ' ')} ${dataNascimento}`);
            });
        });
        console.log("--------------------------------------------------------------------------------");
    }

    message(erro){
        switch(erro){

        }
    }
}

module.exports = ListagemAgendaView