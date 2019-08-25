#!/usr/bin/env node

import Storage = require('node-storage');
import Commander = require('commander');
import moment = require('moment');

moment.locale('pt-br');
const store = new Storage('~/.stopwatch');
const program = new Commander.Command();
program.version('0.0.1');
let comandoEncontrado = false;




/*
Database e suas funções
*/

let dataBase = []

function loadDataBase () {
  dataBase = store.get('dataBase')
}

function saveDataBase () {
  store.put('dataBase', dataBase)
}

loadDataBase(); // Carregando os dados










/*
Criando registros de tempo
*/

const now = new Date();
let agora = moment(now).format('HH-mm-ss DD-MM-YYYY');










/*
Construtor de ação
*/

function acao(nomeAcao, dataInicio?, dataFim?) {
  this.nome = nomeAcao;
  this.dataInicio = agora;
  this.dataFim = '';
  this.duracao = '';


  dataBase.push(this);
}









/*
Verificador de dados
*/

// Verifica se já existe uma Ação iniciada
function verificarNome(nomeInput) {
  for (var i = 0; i < dataBase.length; i++) {
    if (dataBase[i].nome === nomeInput.toString()) {
      return true
    }
  }
}









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
    if (dataBase[i].nome === nomeInput) {
      dataBase[i].duracao = moment(dataBase[i].dataFim - dataBase[i].dataInicio).format('S');
    }
  }

  return;
}









/*
Comandos do programa
*/

program
  .command('agora')
  .description('Um teste de execução')
  .action(function() {
    comandoEncontrado = true;
    console.log(agora);
  })

program
  .command('start <nomeAcao>')
  .description('Salva a data e hora de início')
  .action(function (nomeAcao) {
    comandoEncontrado = true;
    if (verificarNome(nomeAcao)) {
      console.log('Essa ação já foi iniciada');
    } else {
      new acao(nomeAcao)
      saveDataBase();
    }


  })

program
  .command('stop <nomeAcao>')
  .description('Salva a data e hora de fim')
  .action(function (nomeAcao) {
    comandoEncontrado = true;
    if (verificarNome(nomeAcao)) {
      definirFim();
      duracao(nomeAcao);
      saveDataBase();
    } else {
      console.log('Essa ação não existe');
    }



  })

program
  .command('list')
  .description('Mostra todos os itens do database')
  .action(function() {
    comandoEncontrado = true;
    console.log(dataBase);
  })

program.parse(process.argv);

if (!comandoEncontrado) {
  console.error('Comando inválido!');
}