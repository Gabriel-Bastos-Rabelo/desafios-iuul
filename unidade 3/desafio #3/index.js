const MainController = require("./controller/main-controller");
const MainPresenter = require("./presenter/menu-presenter");
const Pacientes = require("./models/Pacientes");
const Paciente = require("./models/Paciente");
const Agenda = require("./models/Agenda");


(async function(){

    const db = require('./config/database');


    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
    }


  

    /*
    Pacientes.hasMany(Agenda)
    const paciente1 = await Pacientes.create({cpf: '08407161179', nome: 'Gabriel bastos', dataNascimento: '07/05/2003'})
    console.log(paciente1)
    const agendaEntry = await paciente1.createAgenda({
      dataConsulta: '07/05/2024',
      horaInicial: '15:00',
      horaFinal: '16:00'
      
  });

  */
    
    

    Pacientes.hasMany(Agenda)
    
    
    const controller = new MainController();
    const presenter = new MainPresenter(controller);
    presenter.run();
    
    
    
})();


