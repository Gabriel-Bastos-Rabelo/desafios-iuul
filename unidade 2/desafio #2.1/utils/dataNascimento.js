import { DateTime } from "luxon";

/**
 * Valida a data de nascimento
 * @param {String} data_nascimento - Data nascimento
 * @returns {Boolean} Data de nascimento válida ou não
 */

const validaDataNascimento = (data_nascimento) => {
    const mask = 'ddMMyyyy';

    const dt = DateTime.fromFormat(data_nascimento, mask);

    if(!dt.isValid){
        return false;
    }

    return true;
}

export {validaDataNascimento};