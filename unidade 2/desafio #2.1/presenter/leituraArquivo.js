import { promises as fs } from 'fs';

class LeituraArquivoPresenter {
    #validacaoJson;

    constructor(validacaoJsonController){
        this.#validacaoJson = validacaoJsonController;
    }

    async run(caminho){
        try {
            const data = await fs.readFile(caminho, 'utf8');
            const lista = JSON.parse(data);
            this.#validacaoJson.valida(lista);
        } catch (err) {
            if (err.code === 'ENOENT') {
                throw new Error(`O arquivo "${caminho}" não foi encontrado.`);
            } else if (err instanceof SyntaxError) {
                throw new Error('O arquivo de entrada não contém um JSON válido.');
            } else {
                throw new Error('Erro ao ler o arquivo de entrada.');
            }
        }
    }


}

export default LeituraArquivoPresenter;