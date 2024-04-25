const input = require('readline-sync');

class MenuView{
    #menuId

    constructor(){
        this.#menuId = 0
    }
    
    get Option(){
        let lastOption
        while(true){
            switch(this.#menuId){
                case 0:
                    
                    this.#showMainMenu();
                    lastOption = 3;
                    break;

                case 1:
                    this.#showPatientMenu();
                    lastOption = 5;
                    break;

                case 2:
                    this.#showScheduleMenu();
                    lastOption = 4;
                    break;


            }

            let opcao
            while(true){
                opcao = input.questionInt('Digite a opção desejada: ');
                if(opcao >= 1 && opcao <= lastOption){
                    break
                }
            }

            if(opcao == lastOption){
                if (this.#menuId === 0) {
                    // Selecionou FIM no menu principal
                    return MenuOptions.FIM;
                } else {
                    // Estava em algum menu, então volta para o menu principal,
                    // pois só temos um nível de menu
                    this.#menuId = 0;
                }
            }
            else{
                // Selecioneou outra opção que não é a última
                if (this.#menuId === 0) {
                    // Navega para o outro menu, pois no menu principal só tem submenus
                    this.#menuId = opcao;
                } else {
                    // Selecionou alguma funcionalidade
                    // Retorna a opção selecionada
                    return this.#menuId * 10 + opcao;
                }
            }
            
        }

        
    }

    #showMainMenu(){

        console.log('Menu Principal');
        console.log('1 - Cadastro de pacientes');
        console.log('2 - Agenda');
        console.log('3 - Fim');
    }

   

    #showPatientMenu(){
        console.log('Menu do Cadastro de Pacientes');
        console.log('1 - Cadastrar novo paciente');
        console.log('2 - Excluir paciente');
        console.log('3 - Listar pacientes (ordenado por CPF)');
        console.log('4 - Listar pacientes (ordenado por nome)');
        console.log('5 - Voltar p/ menu principal');
    }

    #showScheduleMenu(){
        console.log('Agenda');
        console.log('1 - Agendar consulta');
        console.log('2 - Cancelar agendamento');
        console.log('3 - Listar agenda');
        console.log('4 - Voltar p/ menu principal');

    }

    
}

class MenuOptions {
    static get INCLUIR_PACIENTE() {
        return 11;
    }
    static get EXCLUIR_PACIENTE() {
        return 12;
    }
    static get LISTAR_PACIENTES_CPF() {
        return 13;
    }
    static get LISTAR_PACIENTES_NOME() {
        return 14;
    }
    static get AGENDAR_CONSULTA() {
        return 21;
    }
    static get CANCELAR_AGENDAMENTO() {
        return 22;
    }
    static get LISTAR_AGENDA() {
        return 23;
    }
    static get FIM() {
        return 3;
    }
}


module.exports = {MenuView, MenuOptions};