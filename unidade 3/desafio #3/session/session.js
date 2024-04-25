const Consultorio = require("../models/Consultorio.js");


class SessionManager {
    #consultorio;

    constructor() {
        this.#consultorio = new Consultorio();
    }

    get Consultorio() {
        return this.#consultorio;
    }
}


const session = new SessionManager();

module.exports = session;