import validarNumero from "../utils/validarNumero";
import axios from 'axios';
import buscarCotacao from "../services/buscarCotacao";

import { CotacaoResponse } from "../types/cotacaoResponse";


type ResultadoCotacao = CotacaoResponse;

class Cotacao{
    private moedaOrigem: string;
    private moedaDestino: string;
    private valor: string;
    
    constructor(moedaOrigem: string, moedaDestino: string, valor: string){
     
        this.moedaDestino = moedaDestino
        this.moedaOrigem = moedaOrigem
        this.valor = valor

    }

    static async gerarCotacao(moedaOrigem: string, moedaDestino: string, valor: string): Promise<ResultadoCotacao>{
        const erros = []
        if(moedaOrigem == moedaDestino){
            erros.push("A moeda de origem deve ser diferente da de destino")
        }

        if(moedaDestino.length != 3 || moedaOrigem.length != 3){
            erros.push("A moeda deve conter exatamente 3 caracteres")
        }

        let valorNumero: number = 0
        
        if(!validarNumero(valor)){
            erros.push("O valor não corresponde a um número válido")
        }
        else{
            valorNumero = parseFloat(valor.replace(",", "."));

            if(valorNumero <= 0){
                erros.push("O valor deve ser maior que 0")
            }
            
        }
        
        if(erros.length == 0){

            try {
                const response = await buscarCotacao(moedaOrigem, moedaDestino, valorNumero)
        
                return response
            } catch (error) {
                erros.push("Um erro ocorreu, tente novamente mais tarde")
            }
        }

        return {sucesso: false, erros: erros}
    }


}

export default Cotacao