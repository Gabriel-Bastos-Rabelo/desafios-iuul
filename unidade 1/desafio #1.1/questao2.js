const Vertice = require('./models/Vertice');
const Triangulo = require('./models/Triangulo');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  
  
  function lerNumero(mensagem) {
    return new Promise((resolve) => {
      readline.question(mensagem, (numero) => {
        resolve(parseFloat(numero)); 
      });
    });
  }
  
  
  async function lerVertice() {
    const x = await lerNumero('Digite a coordenada X do vértice: ');
    const y = await lerNumero('Digite a coordenada Y do vértice: ');
    return new Vertice(x, y);
  }
  
  
const main = async() =>  { 
    const triangulos = [];
  
    for (let i = 0; i < 3; i++) {
      console.log(`\nTriângulo ${i + 1}:`);
  
      const vertices = [];
      for (let j = 0; j < 3; j++) {
        console.log(`Leitura do ${j+1}º vértice`)
        const vertice = await lerVertice();
        vertices.push(vertice);
      }
  
      try {
        const triangulo = new Triangulo(vertices[0], vertices[1], vertices[2]);
        triangulos.push(triangulo);
  
        console.log(`- Perímetro: ${triangulo.perimetro}`);
        console.log(`- Tipo: ${triangulo.tipo()}`);
        console.log(`- Área: ${triangulo.area}`);
      } catch (error) {
        console.error(`- Erro: ${error.message}`);
      }
    }


    console.log(`O primeiro triângulo é igual ao segundo?: ${triangulos[0].equals(triangulos[1])}` )
    console.log(`O segundo triângulo é igual ao terceiro?: ${triangulos[0].equals(triangulos[2])}`)
  

  
    readline.close();
  }


  
  main();
  



