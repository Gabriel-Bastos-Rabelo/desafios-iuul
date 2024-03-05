const Vertice = require('./models/Vertice');
const Poligono = require('./models/Poligono');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  const main = async () => {
    const n = await lerNumero('Quantos vértices o polígono tem?');
  
    if (n < 3) {
      console.log('Erro: Um polígono precisa de pelo menos 3 vértices.');
      return;
    }
  
    const vertices = [];
    for (let i = 0; i < n; i++) {
      const x = await lerNumero(`Digite a coordenada X do vértice ${i + 1}: `);
      const y = await lerNumero(`Digite a coordenada Y do vértice ${i + 1}: `);
      vertices.push(new Vertice(x, y));
    }
  
    const poligono = new Poligono(...vertices);
  
    console.log(`Perímetro do polígono: ${poligono.perimetro}`);
    console.log(`Quantidade de vértices: ${poligono.qtdVertices}`);

    const novoVerticeX = await lerNumero('Adicione a coordenada X do novo vértice a ser adicionado: ')
    const novoVerticeY = await lerNumero('Adicione a coordenada Y do novo vértice a ser adicionado: ')

    const novoVerticeAdicionado = poligono.addVertice(new Vertice(novoVerticeX, novoVerticeY));
    
    if(novoVerticeAdicionado){
        console.log('Novo vértice adicionado com sucesso!')
        console.log(`Perímetro do polígono após inserir o novo vértice: ${poligono.perimetro}`);
        console.log(`Quantidade de vértices após inserir o novo vértice: ${poligono.qtdVertices}`);
    }
    else{
        console.log("O novo vértice já existe no polígono")
    }

    
  
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
  