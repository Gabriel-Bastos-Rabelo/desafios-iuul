import MainPresenter from "./presenter/main-presenter";
require("dotenv").config();


(function(){
    const presenter = new MainPresenter();
    presenter.run();
})();