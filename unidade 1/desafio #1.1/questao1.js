const Vertice = require('./models/Vertice');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  
  
  const main = async() => {
    const vertices = [];
  
    
    for (let i = 0; i < 3; i++) {
      console.log(`\nVertice ${i + 1}:`);
      const x = await lerNumero('Digite a coordenada X: ');
      const y = await lerNumero('Digite a coordenada Y: ');
      vertices.push(new Vertice(x, y));
    }
  

    const distanceV1V2 = vertices[0].distancia(vertices[1]);
    console.log(`\nDistância entre v1 e v2: ${distanceV1V2}`);
  
    
    vertices[2].move(10, 10);
    console.log(`\nNova posição de v3: (${vertices[2].x}, ${vertices[2].y})`);
  
    
    console.log(`\nv1 e v2 são iguais? ${vertices[0].equals(vertices[1])}`);
    console.log(`\nv2 e v3 são iguais? ${vertices[1].equals(vertices[2])}`);
  
    readline.close();
  }
  
  
  function lerNumero(mensagem) {
    return new Promise((resolve) => {
      readline.question(mensagem, (numero) => {
        resolve(parseFloat(numero));
      });
    });
  }
  
  main();
  