const Aluno = require("./Aluno");

class Turma {
    #alunos

    constructor() {
        this.#alunos = [];
    }
    

    adicionarAluno(nomeNovoAluno, matriculaNovoAluno){
        if(this.#alunos.find(aluno => aluno.matricula == matriculaNovoAluno)){
            return false
        }
        this.#alunos.push(new Aluno(nomeNovoAluno, matriculaNovoAluno))
        return true;
    }

    removerAluno(matricula) {
        const indiceAluno = this.#alunos.findIndex(
          (a) => a.matricula === matricula
        );
        if (indiceAluno === -1) {
          return false;
        }
    
        this.#alunos.splice(indiceAluno, 1);
        return true;
    }

    lancarNota(matricula, nota, prova) {
        const aluno = this.#alunos.find((a) => a.matricula === matricula);
        if (!aluno) {
          return false;
        }
    
        if (prova == 1) {
          aluno.p1 = nota;
        }
        else if (prova == 2) {
          aluno.p2 = nota;
        }
    
        return true;
    }

    imprimirAlunos() {
        console.log('----------------------------------------');
        console.log('Matricula Nome P1 P2 NF');
        console.log('----------------------------------------');
        this.#alunos.sort((a, b) => a.nome.localeCompare(b.nome));
        for (const aluno of this.#alunos) {
          console.log(
            `${aluno.matricula} ${aluno.nome} ${aluno.p1 ? aluno.p1?.toFixed(
              1
            ) : '-'} ${aluno.p2 ? aluno.p2?.toFixed(1): '-'} ${aluno.notaFinal.toFixed(1)}`
          );
        }
        console.log('----------------------------------------');
    }

}

module.exports = Turma;