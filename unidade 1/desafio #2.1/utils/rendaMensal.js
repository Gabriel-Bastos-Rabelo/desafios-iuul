/**
 * Valida a renda mensal
 * @param {String} renda_mensal - renda mensal
 * @returns {Boolean} renda mensal válida ou não
 */

const validaRendaMensal = (renda_mensal) => {

    if(renda_mensal == null || renda_mensal == undefined){
        return true;
    }
    const regex = /^\d+\,\d{2}$/;
    
    return regex.test(renda_mensal);
}

export {validaRendaMensal};