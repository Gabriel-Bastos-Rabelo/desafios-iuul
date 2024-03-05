class Aluno {
    #matricula;
    #nome;
    #p1;
    #p2;
  
    constructor(matricula, nome) {
      this.#matricula = matricula;
      this.#nome = nome;
      this.#p1 = null;
      this.#p2 = null;
    }
  
    get matricula() {
      return this.#matricula;
    }
  
    get nome() {
      return this.#nome;
    }
  
    get p1() {
      return this.#p1;
    }
  
    get p2() {
      return this.#p2;
    }
  
    set p1(nota) {
      this.#p1 = nota;
    }
  
    set p2(nota) {
      this.#p2 = nota;
    }
  
    get notaFinal() {
      if (this.#p1 === null && this.#p2 === null) {
        return 0;
      } else if (this.#p1 === null) {
        return this.#p2 / 2;
      } else if (this.#p2 === null) {
        return this.#p1 / 2;
      } else {
        return (this.#p1 + this.#p2) / 2;
      }
    }
  }

module.exports = Aluno;