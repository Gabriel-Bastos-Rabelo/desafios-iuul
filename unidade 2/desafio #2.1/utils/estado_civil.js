/**
 * Valida o estado civíl
 * @param {String} estado_civil - Estado Civíl
 * @returns {Boolean} estado civíl válido ou não
 */

const validaEstadoCivil = (estado_civil) => {
    if(estado_civil == null || estado_civil == undefined){
        return true;
    }

    estado_civil = estado_civil.toUpperCase();

    if(['C', 'S', 'V', 'D'].includes(estado_civil)){
        return true;
    }

    return false;
}

export {validaEstadoCivil};