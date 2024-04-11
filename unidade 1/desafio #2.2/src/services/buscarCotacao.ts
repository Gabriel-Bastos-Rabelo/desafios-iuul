import axios, { AxiosResponse } from 'axios';

import { CotacaoResponse } from '../types/cotacaoResponse';
import { CotacaoData } from '../types/cotacaoResponse';

const buscarCotacao = async (moedaOrigem: string, moedaDestino: string, valor: number): Promise<CotacaoResponse> => {
    const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${moedaOrigem}/${moedaDestino}`;

    try {
        const response: AxiosResponse<any> = await axios.get(url);
        
        const cotacaoData: CotacaoData = {
            moedaOrigem,
            moedaDestino,
            valor: valor.toFixed(2),
            valorConvertido: (valor * response.data.conversion_rate).toFixed(2),
            taxa: response.data.conversion_rate.toFixed(6)
        };

        return { sucesso: true, dados: cotacaoData };
    } catch (error) {
        throw error
    }
}

export default buscarCotacao;
