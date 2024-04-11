import MenuInterface from "../view/menuInterface"
import Cotacao from "../model/cotacao"
import ResultadoInteface from "../view/resultadoInterface"
import buscarCotacao from "../services/buscarCotacao"



class MainPresenter{

    private menuInterface: MenuInterface
    private resultadoInterface: ResultadoInteface
    

    constructor(){
        this.menuInterface = new MenuInterface()
        this.resultadoInterface = new ResultadoInteface()
    }

    async run(){

        
        while(true){
            const data = this.menuInterface.run()

            if(data){
                
                const result = await Cotacao.gerarCotacao(data.moedaOrigem, data.moedaDestino, data.valor)
                this.resultadoInterface.run(result)
            }
            else{
                break
            }
            
            
        }
        
       
    }
}

export default MainPresenter