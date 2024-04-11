export interface CotacaoData {
    moedaOrigem: string;
    moedaDestino: string;
    valor: string;
    valorConvertido: string;
    taxa: string;
}

export interface CotacaoResponse {
    sucesso: boolean;
    dados?: CotacaoData;
    erros?: string[];
}