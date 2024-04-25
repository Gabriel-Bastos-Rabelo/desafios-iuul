class Validacoes{

    static validarCPF = (cpf) => {
        return cpf.length === 11 && /^[0-9]+$/.test(cpf);
    }
    
    
    
    static validarData = (data) => {
        const regex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (regex.test(data)) {
            const partes = data.split('/');
            const dia = parseInt(partes[0], 10);
            const mes = parseInt(partes[1], 10);
            if (dia >= 1 && dia <= 31 && mes >= 1 && mes <= 12) {
                return true;
            }
        }
        return false;
    }
    
    static validarIdadeMinima = (dataNascimento) => {
        const dataNascParts = dataNascimento.split('/');
        const dataNasc = new Date(dataNascParts[2], dataNascParts[1] - 1, dataNascParts[0]);
        const dataAtual = new Date();
        let idade = dataAtual.getFullYear() - dataNasc.getFullYear();
        const m = dataAtual.getMonth() - dataNasc.getMonth();
        
        if (m < 0 || (m === 0 && dataAtual.getDate() < dataNasc.getDate())) {
            idade--;
        }
        
        return idade >= 13;
    }
    
    
    static validarHora = (hora) => {
        

        if (hora.length !== 4 || isNaN(hora)) {
            
            return false;
        }
    
        const horas = parseInt(hora.substring(0, 2), 10);
        const minutos = parseInt(hora.substring(2, 4), 10);

        
    
        if (horas < 0 || horas > 23) {
            return false;
        }
    
        
        return [0, 15, 30, 45].includes(minutos);
    }
    
    
    static possuiAgendamentoFuturo = (cpf, agenda) => {
        const dataAtual = new Date();
        const dataAtualStr = dataAtual.toLocaleDateString("pt-BR");
    

        
        const consultas = agenda.filter((consulta) => consulta.paciente.cpf === cpf);
        
    

        for (const consulta of consultas) {
            const dataConsulta = new Date(consulta.dataConsulta);
            const dataConsultaStr = dataConsulta.toLocaleDateString("pt-BR");
    
            
            if (dataConsultaStr > dataAtualStr) {
            return true;
            }
    
            
            if (dataConsultaStr === dataAtualStr) {
                const horaAtual = dataAtual.getHours() * 100 + dataAtual.getMinutes();
                const horaInicial = consulta.horaInicial;
    
                
                if (horaInicial > horaAtual) {
                    return true;
                }
            }
        }
    
        
        return false;
    }
    
    
    static existeAgendamentoSobreposto = (dataConsulta, horaInicial, horaFinal, agenda)=> {
        
        const novaConsultaInicio = parseInt(horaInicial.substring(0, 2)) * 60 + parseInt(horaInicial.substring(2));
        const novaConsultaFim = parseInt(horaFinal.substring(0, 2)) * 60 + parseInt(horaFinal.substring(2));
    
        for (let consulta of agenda) {
            if (consulta.dataConsulta === dataConsulta) {
                const agendamentoInicio = parseInt(consulta.horaInicial.substring(0, 2)) * 60 + parseInt(consulta.horaInicial.substring(2));
                const agendamentoFim = parseInt(consulta.horaFinal.substring(0, 2)) * 60 + parseInt(consulta.horaFinal.substring(2));
    
                
                if ((novaConsultaInicio < agendamentoFim && novaConsultaFim > agendamentoInicio)) {
                    return true; 
                }
            }
        }
    
        return false; 
    }
    
    static consultaFutura = (dataConsulta, horaInicial) => {
      
      const partesData = dataConsulta.split('/');
      const dia = parseInt(partesData[0], 10);
      const mes = parseInt(partesData[1], 10) - 1; 
      const ano = parseInt(partesData[2], 10);
    
      const horas = parseInt(horaInicial.substring(0, 2), 10);
      const minutos = parseInt(horaInicial.substring(2, 4), 10);
    
     
      const dataConsultaObj = new Date(ano, mes, dia, horas, minutos);
    
   
      const dataAtual = new Date();
    
      
      if (dataConsultaObj > dataAtual) {
          return true;
      }
      return false;
    };
    
    
}

module.exports = Validacoes;