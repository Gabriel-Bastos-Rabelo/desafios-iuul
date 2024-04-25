/**
 * Valida o nome
 * @param {String} nome - nome
 * @returns {Boolean} nome válido ou não
 */

const validaNome = (nome) => {

    if(nome.length >= 5 && nome.length <= 60){
        return true;
    }

    return false;
}

export {validaNome};