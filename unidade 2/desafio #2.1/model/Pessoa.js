import { validaDataNascimento } from "../utils/dataNascimento.js";
import { validaEstadoCivil } from "../utils/estado_civil.js";
import { validaCPF } from "../utils/cpf.js";
import { validaNome } from "../utils/nome.js";
import { validaRendaMensal } from "../utils/rendaMensal.js";
import { OperationErrors } from "../controller/operation-code.js";
import { OperationStatus } from "../controller/operation-code.js";
import { DateTime } from "luxon";

class Pessoa{
    #nome;
    #cpf;
    #dt_nascimento;
    #renda_mensal;
    #estado_civil;


    constructor(nome, cpf, dt_nascimento, renda_mensal, estado_civil){
        this.#nome = nome;
        this.#cpf = cpf;
        this.#dt_nascimento = dt_nascimento;
        this.#renda_mensal = renda_mensal;
        this.#estado_civil = estado_civil;
    }

    static create(nome, cpf, dt_nascimento, renda_mensal, estado_civil){
        const errors = []

        if(!validaNome(nome)){
            errors.push(OperationErrors.INVALID_NAME);
        }

        if(!validaCPF(cpf)){
            errors.push(OperationErrors.INVALID_DOCUMENT);
        }

        if(validaDataNascimento(dt_nascimento)){
            if(dt_nascimento > DateTime.now().minus({ year: 18 })){
                errors.push(OperationErrors.INVALID_AGE);
            }    
        }
        else{
            errors.push(OperationErrors.INVALID_BIRTHDATE);
        }

        if(!validaRendaMensal(renda_mensal)){
            errors.push(OperationErrors.INVALID_MONTHLY_INCOME);
        }

        if(!validaEstadoCivil(estado_civil)){
            errors.push(OperationErrors.INVALID_MARITAL_STATUS);
        }

        return errors.length === 0
            ? { success: OperationStatus.SUCCESS}
            : { failure: errors };
        
        
    }
}

export default Pessoa;