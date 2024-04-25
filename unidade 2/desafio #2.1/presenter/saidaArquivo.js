import { DateTime } from "luxon"; 
import * as fs from 'fs';

class SaidaArquivoPresenter {


    async run(erros){
        try{

            const errosJson = JSON.stringify(erros, null, 2);
            let fileName = DateTime.now().toFormat("ddMMyyyy-HHmmss'.json'");
            fileName = "erros-" + fileName;
            
            fs.writeFile(fileName, errosJson, err => {
                if (err) {
                  throw new Error("Erro na geração do arquivo de saída")
                }
            });



        }
        catch(err){
            throw err;
        }
    }
}

export default SaidaArquivoPresenter