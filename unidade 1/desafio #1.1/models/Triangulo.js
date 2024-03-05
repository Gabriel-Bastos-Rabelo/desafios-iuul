const Vertice = require("./Vertice")

class Triangulo {
    
    #vertices;
  

    constructor(v1, v2, v3) {
      // Verifica se os vértices formam um triângulo
      if (!this._validaTriangulo(v1, v2, v3)) {
        throw new Error("Os vértices não formam um triângulo!");
      }
      this.#vertices = [v1, v2, v3];
    }
  
    
    get vertices() {
      return this.#vertices;
    }
  

    equals(outroTriangulo) {
      return (
        this.#vertices[0].equals(outroTriangulo.vertices[0]) &&
        this.#vertices[1].equals(outroTriangulo.vertices[1]) &&
        this.#vertices[2].equals(outroTriangulo.vertices[2])
      );
    }
  
    
    get perimetro() {
      return (
        this.#vertices[0].distancia(this.#vertices[1]) +
        this.#vertices[1].distancia(this.#vertices[2]) +
        this.#vertices[2].distancia(this.#vertices[0])
      );
    }
  
    
    tipo() {
      const d1 = this.#vertices[0].distancia(this.#vertices[1]);
      const d2 = this.#vertices[1].distancia(this.#vertices[2]);
      const d3 = this.#vertices[2].distancia(this.#vertices[0]);
  
      if (d1 === d2 && d2 === d3) {
        return "Equilátero";
      } else if (d1 === d2 || d1 === d3 || d2 === d3) {
        return "Isósceles";
      } else {
        return "Escaleno";
      }
    }
  
    
    clone() {
      const v1 = new Vertice(this.#vertices[0].x, this.#vertices[0].y);
      const v2 = new Vertice(this.#vertices[1].x, this.#vertices[1].y);
      const v3 = new Vertice(this.#vertices[2].x, this.#vertices[2].y);
      return new Triangulo(v1, v2, v3);
    }
  
    
    get area() {
      const s = this.perimetro / 2;
      const a = this.#vertices[0].distancia(this.#vertices[1]);
      const b = this.#vertices[1].distancia(this.#vertices[2]);
      const c = this.#vertices[2].distancia(this.#vertices[0]);
      return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }
  
    
    _validaTriangulo(v1, v2, v3) {
      const d1 = v1.distancia(v2);
      const d2 = v1.distancia(v3);
      const d3 = v2.distancia(v3);
      return d1 + d2 > d3 && d1 + d3 > d2 && d2 + d3 > d1;
    }
  }

  
module.exports = Triangulo