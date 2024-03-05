const Turma = require("./models/Turma")
const Aluno = require("./models/Aluno")

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });


  

  const main = async() => {
    const turma = new Turma();
    let opcao = 0;
  
    while (opcao !== 5) {
      console.log('----------------------------------------');
      console.log('Menu de Opções para Turma');
      console.log('----------------------------------------');
      console.log('1. Adicionar Aluno');
      console.log('2. Remover Aluno');
      console.log('3. Lançar Nota de Aluno');
      console.log('4. Imprimir Lista de Alunos');
      console.log('5. Sair');
      console.log('----------------------------------------');
  
      opcao = await lerNumero('Digite a opção desejada: ');
  
      switch (opcao) {
        case 1:
          await adicionarAluno(turma);
          break;
        case 2:
          await removerAluno(turma);
          break;
        case 3:
          await lancarNotaAluno(turma);
          break;
        case 4:
          turma.imprimirAlunos();
          break;
        case 5:
          console.log('Saindo do programa...');
          break;
        default:
          console.log('Opção inválida!');
      }
  
    }
  }

  main();


  async function adicionarAluno(turma) {
    const matricula = await lerNumero('Digite a matrícula do aluno: ');
    const nome = await lerTexto('Digite o nome do aluno: ');
  
    if (turma.adicionarAluno(matricula, nome)) {
      console.log('Aluno adicionado com sucesso!');
    } else {
      console.log('Erro: Aluno já existe na turma.');
    }
  }
  
  async function removerAluno(turma) {
    const matricula = await lerNumero('Digite a matrícula do aluno a ser removido: ');
  
    if (turma.removerAluno(matricula)) {
      console.log('Aluno removido com sucesso!');
    } else {
      console.log('Erro: Aluno não encontrado na turma.');
    }
  }
  
  async function lancarNotaAluno(turma) {
    const matricula = await lerNumero('Digite a matrícula do aluno: ');
    const prova = await lerNumero('Digite a prova do aluno (1 para p1 ou 2 para p2): ');
    
    if(prova != 1 && prova != 2){
        console.log("Digite 1 ou 2 para a prova do aluno!");
        return;
    }

    
    const nota = await lerNumero("Digite a nota da prova: ")

    if (isNaN(nota)) {
        console.log('Nota inválida. Digite um número.');
        return;
    }
    
    if(nota < 0 || nota > 10){
        console.log('Nota inválida. A nota deve estar entre 0 e 10.');
        return;
    }

    if (turma.lancarNota(matricula, nota, prova)) {
      console.log('Nota lançada com sucesso!');
    } else {
      console.log('Erro: Aluno não encontrado na turma.');
    }
  }
  
  function lerNumero(mensagem) {
    return new Promise((resolve) => {
      readline.question(mensagem, (numero) => {
        resolve(parseFloat(numero));
      });
    });
  }
  
  function lerTexto(mensagem) {
    return new Promise((resolve) => {
      readline.question(mensagem, (texto) => {
        resolve(texto);
      });
    });
  }
  