
import input from "readline-sync"
class MenuInterface{

    run(){
        const moedaOrigem: string = input.question("Moeda Origem: ");
        if(moedaOrigem.length == 0){
            return
        }
        const moedaDestino: string = input.question("Moeda destino: ");
        const valor: string = input.question("Valor: ");

        return { moedaOrigem, moedaDestino, valor };
    }
}

export default MenuInterface