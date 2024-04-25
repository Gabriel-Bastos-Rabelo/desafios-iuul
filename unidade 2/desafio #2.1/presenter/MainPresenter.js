import LeituraArquivoPresenter from "./leituraArquivo.js";
import ValidacaoJson from "../controller/validacaoJson.js";
import SaidaArquivoPresenter from "./saidaArquivo.js";

class MainPresenter{

    #leituraArquivo;
    #saidaArquivo;
    #validacaoJsonController;
    constructor(){
        this.#validacaoJsonController = new ValidacaoJson()
        this.#leituraArquivo = new LeituraArquivoPresenter(this.#validacaoJsonController)
        this.#saidaArquivo = new SaidaArquivoPresenter();
    }

    async run(arquivo){
        
        try{
            await this.#leituraArquivo.run(arquivo);
            const errors = this.#validacaoJsonController.errors;
            await this.#saidaArquivo.run(errors);
        }
        catch(err){
            console.log(err.message)
        }
       

    }
}


export default MainPresenter;