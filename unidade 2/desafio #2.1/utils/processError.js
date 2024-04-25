import { OperationErrors } from "../controller/operation-code.js"

const processError = (erro) => {
    switch(erro){
        case OperationErrors.INVALID_DOCUMENT:
            return {"campo": "cpf", "mensagem": "Cpf inválido"};
        
        case OperationErrors.INVALID_AGE:
            return {"campo": "dt_nascimento", "mensagem": "idade inválida, o cliente deve ter ao menos 18 anos"}

        case OperationErrors.INVALID_BIRTHDATE:
            return {"campo": "dt_nacimento", "mensagem": "data de nascimento inválida"}

        case OperationErrors.INVALID_MONTHLY_INCOME:
            return {"campo": "renda_mensal", "mensagem": "renda mensal deve ter duas casas decimais e vírgula decimal"}

        case OperationErrors.INVALID_MARITAL_STATUS:
            return {"campo": "estado_civil", "mensagem": "O estado civíl deve ser C, S, V ou D (maiúsculo ou minúsculo)"}

        case OperationErrors.INVALID_NAME:
            return {"campo": "nome", "mensagem": "O nome deve ter de 5 a 60 caracteres"}
        default:
            break;
    }
}

export {processError}