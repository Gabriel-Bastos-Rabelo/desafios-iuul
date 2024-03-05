class Vertice {
    
    #x;
    #y;
  
    
    constructor(x, y) {
      this.#x = x;
      this.#y = y;
    }
  
    
    get x() {
      return this.#x;
    }
  
    get y() {
      return this.#y;
    }
  
    
    distancia(outroVertice) {
      const dx = this.#x - outroVertice.x;
      const dy = this.#y - outroVertice.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
  
    
    move(x, y) {
      this.#x = x;
      this.#y = y;
    }
  
    
    equals(outroVertice) {
        
        return this.#x === outroVertice.x && this.#y === outroVertice.y;
    }
  }


module.exports = Vertice
