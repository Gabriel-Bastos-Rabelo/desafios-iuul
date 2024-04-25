function validarNumero(valor: string): boolean {
    // Expressão regular para verificar se a string é um número com casas decimais separadas por vírgula
    const regex = /^\d+,\d{2}$/;
    return regex.test(valor);
}

export default validarNumero