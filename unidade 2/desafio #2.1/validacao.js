import MainPresenter from "./presenter/MainPresenter.js";

(function () {
    
    const arquivo = process.argv[2];

    const mainPresenter = new MainPresenter();
    mainPresenter.run(arquivo);

    
    
    
})();