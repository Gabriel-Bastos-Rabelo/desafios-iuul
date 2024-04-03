import Pessoa from "../model/Pessoa.js"
import { OperationStatus } from "./operation-code.js";
import { processError } from "../utils/processError.js";

class ValidacaoJson{

    #errors;

    constructor(){
        this.#errors = [];
    }

    /**
     * 
     * @param {Object} pacienteArray - array de pessoas
     * @returns {Object} Resultado da operação com status e lista de erros
     */
    valida(data){

        for(const pessoa of data){
            let result = Pessoa.create(pessoa.nome, pessoa.cpf, pessoa.dt_nascimento, pessoa.renda_mensal, pessoa.estado_civil);

    
            if(!result.success){
                let resultErrors = []
                for(let err of result.failure){
                    resultErrors.push(processError(err))
                }

                this.#errors.push({
                    'dados': pessoa,
                    "erros": resultErrors
                })
            }
        }
        

    }

    get errors(){
        return this.#errors;
    }
}

export default ValidacaoJson;