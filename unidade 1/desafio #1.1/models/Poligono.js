const Vertice = require("./Vertice")

class Poligono {
  #vertices;

  constructor(...vertices) {
    if (vertices.length < 3) {
      throw new Error('Um polígono precisa de pelo menos 3 vértices.');
    }
    this.#vertices = vertices;
  }

  addVertice(vertice) {
    if (this.#vertices.some(v => v.equals(vertice))) {
      return false;
    }
    this.#vertices.push(vertice);
    return true;
  }

  get perimetro() {
    let perimetro = 0;
    for (let i = 0; i < this.#vertices.length - 1; i++) {
      perimetro += this.#vertices[i].distancia(this.#vertices[i + 1]);
    }
    perimetro += this.#vertices[this.#vertices.length - 1].distancia(this.#vertices[0]);
    return perimetro;
  }

  get qtdVertices() {
    return this.#vertices.length;
  }
}

module.exports = Poligono;
