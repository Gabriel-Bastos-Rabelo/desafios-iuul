const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});



const validacaoNome = (nome) => {
    return nome.length >= 5 ? null : "Nome precisa ter pelo menos 5 caracteres";
}

const validacaoCPF = (cpf) => {
    if (cpf.length != 11) {
        return 'O CPF precisa ter 11 dígitos';
    }
    else if (isNaN(cpf)) {
        return 'O CPF deve conter somente dígitos';
    }

    return null;
}

const validacaoDataNascimento = (data) => {
    const partes = data.split('/');
    const dataNascimento = new Date(partes[2], partes[1] - 1, partes[0]);

    if (dataNascimento == 'Invalid Date') {
        return 'Data de nascimento no formato inválido';
    }
    else if ((new Date() - dataNascimento) / (1000 * 60 * 60 * 24 * 30 * 12) < 18) {
        return 'A idade deve ser maior ou igual a 18';
    }

    return null;

};


const validacaoRenda = (renda) => {
    if (!renda.includes(',')) {
        return 'Deve-se incluir casas decimais na renda (ex: 1000,50)'
    }
    else if (renda.split(',')[1].length != 2) {
        return 'Deve-se incluir somente duas casas decimais'
    }
    const valorFormatado = renda.replace(',', '.');

    if (isNaN(valorFormatado)) {
        return 'Deve-se incluir apenas dígitos e uma vírgula na renda (ex: 1000,50)';
    }

    return null;

}


const validacaoEstadoCivil = (estadoCivil) => {
    if (!(['C', 'S', 'V', 'D', 'c', 's', 'v', 'd'].includes(estadoCivil))) {
        return 'Estado civil inválido.';
    }
    return null;
}


const validacaoDependentes = (dependentes) => {
    if (isNaN(dependentes)) {
        return 'Deve-se conter somente dígitos'
    }
    else if (!(0 >= parseInt(dependentes) <= 10)) {
        return 'O número de dependentes deve ser entre 0 e 10';
    }
    return null;
}


const formatarCpf = (cpf) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

const formatarDataNascimento = (data) => {
    const partes = data.split('/');
    return `${partes[0]}/${partes[1]}/${partes[2]}`;
};


const formatarEstadoCivil = (estadoCivil) => {
    if(['c', 'C'].includes(estadoCivil)){
        return 'Casado';
    }
    else if(['s', 'S'].includes(estadoCivil)){
        return 'Solteiro';
    }

    else if(['v', 'V'].includes(estadoCivil)){
        return 'Viúvo';
    }
    
    return 'Divorciado'
}






async function main() {
    const nome = await lerEntrada("Nome: ", validacaoNome);
    const cpf = await lerEntrada("CPF: ", validacaoCPF);
    const dataNascimento = await lerEntrada('Data de nascimento (dd/mm/aaaa): ', validacaoDataNascimento)
    const rendaMensal = await lerEntrada("Renda mensal (ex: 1000,50): ", validacaoRenda);
    const estadoCivil = await lerEntrada('Estado civil (C, S, V ou D): ', validacaoEstadoCivil);
    const dependentes = await lerEntrada('Dependentes (0 a 10): ', validacaoDependentes);


    console.log(`
    Nome: ${nome}
    CPF: ${formatarCpf(cpf)}
    Data de nascimento: ${formatarDataNascimento(dataNascimento)}
    Renda mensal: R$ ${rendaMensal}
    Estado civil: ${formatarEstadoCivil(estadoCivil)}
    Dependentes: ${dependentes}
    `);




    readline.close();


}


main()

function lerEntrada(mensagem, validacao) {
    return new Promise((resolve) => {
        readline.question(mensagem, (resp) => {
            const mensagemErro = validacao(resp);

            if (!mensagemErro) {
                resolve(resp);
            }
            else {
                console.log(mensagemErro);
                resolve(lerEntrada(mensagem, validacao));
            }
        })
    })
}