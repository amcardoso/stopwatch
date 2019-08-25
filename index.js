#!/usr/bin/env node

const Storage = require('node-storage');
const commander = require('commander');
const date = require('date-and-time');
const inquirer = require('inquirer');
var AsciiTable = require('ascii-table');


const store = new Storage('~/.stopwatch');
const program = new commander.Command();
program.version('0.0.1');





/*
Database e suas funções
*/

let dataBase = [];

function loadDataBase () {
  dataBase = store.get('dataBase')
}

function saveDataBase () {
  store.put('dataBase', dataBase)
}

loadDataBase(); // Carregando os dados





/*
Criando tabela
*/

var table = new AsciiTable();




/*
Criando registros de tempo
*/

const now = new Date();
let agora = date.format(now, 'HH-mm-ss DD-MM-YYYY');










/*
Construtor de ação
*/

function acao(categoria, projeto, acao, dataInicio, dataFim) {
  this.categoria = categoria;
  this.projeto = projeto;
  this.acao = acao;
  this.dataInicio = agora;
  this.dataFim = '';
  this.duracao = '';


  dataBase.push(this);
}









/*
Verificador de dados
*/

// Verifica se já existe uma Ação iniciada
/*
function verificarNome(nomeInput) {
  for (var i = 0; i < dataBase.length; i++) {
    if (dataBase[i].nome === nomeInput.toString()) {
      return true
    }
  }
}
*/








/*
Funções de Ação
*/

// Adiciona data de conclusão de uma ação
function definirFim() {
  for (var i = 0; i < dataBase.length; i++) {
    if (dataBase[i].dataFim === '') {
      dataBase[i].dataFim = agora

    }
  }
}

// Adiciona duração em segundos da ação
function duracao(nomeInput) {
  for (var i = 0; i < dataBase.length; i++) {

      let fim = date.parse(dataBase[i].dataFim, 'HH-mm-ss DD-MM-YYYY')
      let inicio = date.parse(dataBase[i].dataInicio, 'HH-mm-ss DD-MM-YYYY')
      dataBase[i].duracao = date.subtract(fim, inicio).toSeconds();

  }

  return
}

// Desenha uma tabela com os registros do dataBase
function listaRegistros() {
  for (var i = dataBase.length - 1; i >= 0; i--) {
    table
      .setHeading('Id', 'Data', 'Duração', 'Categoria', 'Projeto', 'Ação')
      .addRow(
        i, // Id
        dataBase[i].dataInicio.slice(8, 14), // Data inicio
        (dataBase[i].duracao/3600).toFixed(2) + ' H', // Duração
        dataBase[i].categoria, // Categoria
        dataBase[i].projeto, // Projeot
        dataBase[i].acao); // Ação
  }
  console.log(table.toString())
}


// Edita as propriedades de uma ação
function editarPropriedade(id, nomePropriedade, novoValor) {

  switch (nomePropriedade) {
    case 'categoria':
      dataBase[id].categoria = novoValor
      break;
    case 'projeto':
      dataBase[id].projeto = novoValor
      break;
    case 'acao':
      dataBase[id].acao = novoValor
      break;
    case 'inicio':
      dataBase[id].dataInicio = novoValor
      break;
    case 'final':
      dataBase[id].dataFim = novoValor
      break;

  }



}









/*
Comandos do programa
*/

program
  .command('agora')
  .description('Um teste de execução')
  .action(function() {
    console.log(agora);

  })


program
  .command('start <nomeCategoria> <nomeProjeto> <nomeAcao>')
  .description('Salva a data e hora de início')
  .action(function (nomeCategoria, nomeProjeto, nomeAcao) {

      new acao(nomeCategoria, nomeProjeto, nomeAcao)
      saveDataBase();
  })


program
  .command('stop')
  .description('Salva a data e hora de fim')
  .action(function () {

      definirFim();
      duracao();
      saveDataBase();

  })

program
  .command('list [numRegistros]')
  .description('Mostra todos os itens do database')
  .action(function(numRegistros) {
    console.log('\033[2J');
    listaRegistros();
    teste();
  })

program
  .command('edit <id> <nomePropriedade> <novoValor>')
  .description('Edita os dados da ação')
  .action(function(id, nomePropriedade, novoValor){

    editarPropriedade(id, nomePropriedade, novoValor);
    duracao();
    saveDataBase();

  })
program.parse(process.argv);




/*
ÁREA DE TESTES
*/

function teste(numRegistros) {
  if (numRegistros === undefined) {
    numRegistros = 10;
  }
  var chart = require('ascii-chart');

  var data = dataBase.map((i) => (i.duracao/3600).toFixed(2)).slice(0, numRegistros);


  console.log(chart(data, {
    width: 50,
    height: 20,
    pointChar: '█',
    negativePointChar: '░'
  }));
}
