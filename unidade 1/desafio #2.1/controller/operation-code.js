/**
 * Classe com os códigos de SUCESSO e FALHA de uma operação
 * no controller
 */
class OperationStatus {
    static get SUCCESS() {
        return 1;
    }
    static get FAILURE() {
        return 2;
    }
}

/**
 * Classe com todos os códigos de erro das operações
 */
class OperationErrors {
    
    
    static get INVALID_DOCUMENT() {
        return 1;
    }
    static get INVALID_NAME() {
        return 2;
    }
    static get INVALID_BIRTHDATE() {
        return 3;
    }
   
    static get INVALID_DATE() {
        return 4;
    }

    static get INVALID_MARITAL_STATUS(){
        return 5;
    }

    static get INVALID_MONTHLY_INCOME(){
        return 6;
    }

    static get INVALID_AGE(){
        return 7;
    }


}

export { OperationErrors, OperationStatus };
