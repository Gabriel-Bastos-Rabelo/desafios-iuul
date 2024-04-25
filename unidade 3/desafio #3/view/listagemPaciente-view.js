const FormateDate = require("../utils/FormateDate");
const CalculoIdade = require("../utils/CalculoIdade");

class ListagemPacienteView{
    process(data){

        console.log('------------------------------------------------------------');
        console.log('CPF         Nome           Dt.Nasc.           Idade');
        console.log('------------------------------------------------------------');


        data.forEach(({ paciente, agendamentosFuturos }) => {
            const idade = CalculoIdade(paciente.dataNascimento)
            console.log(`${paciente.cpf.padEnd(11, ' ')} ${paciente.nome.padEnd(15, ' ')} ${FormateDate(paciente.dataNascimento).padEnd(16, ' ')} ${idade.toString()}`);
            if(agendamentosFuturos){
                console.log(`           Agendado para: ${agendamentosFuturos.dataConsulta}`);
                console.log(`           ${agendamentosFuturos.horaInicial.slice(0, 2)}:${agendamentosFuturos.horaInicial.slice(2, 4)} às ${agendamentosFuturos.horaFinal.slice(0, 2)}:${agendamentosFuturos.horaFinal.slice(2, 4)}`);
            }
           
        });

        console.log('------------------------------------------------------------');
        
    }
}

module.exports = ListagemPacienteView