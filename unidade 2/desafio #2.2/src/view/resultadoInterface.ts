import { CotacaoResponse } from "../types/cotacaoResponse";

type ResultadoCotacao = CotacaoResponse;


class ResultadoInteface{
    run(resultado: ResultadoCotacao){
        if(resultado.sucesso && resultado.dados){
            console.log(`${resultado.dados.moedaOrigem} ${resultado.dados.valor} => ${resultado.dados.moedaDestino} ${resultado.dados.valorConvertido}`)
            console.log(`Taxa: ${resultado.dados.taxa}`)
        }
        else{
            if(resultado.erros){
                for(let erro of resultado.erros){
                    console.log(erro)
                }
            }
            

        }
    }
}

export default ResultadoInteface