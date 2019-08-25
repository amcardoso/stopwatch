#!/usr/bin/env node

import Commander = require('commander');
import { Database } from './models/Database';
import { Acao } from './models/Acao';

const program = new Commander.Command();
program.version('0.0.1');

const dataBase = new Database();

let comandoEncontrado = false;

program
  .command('agora')
  .description('Um teste de execução')
  .action(function() {
    comandoEncontrado = true;
    console.log(new Date());
  })

program
  .command('start <nomeAcao>')
  .description('Salva a data e hora de início')
  .action(function (nomeAcao) {
    comandoEncontrado = true;
    if (dataBase.verificarNome(nomeAcao)) {
      console.error('Essa ação já foi iniciada');
    } else {
      const acao = new Acao(nomeAcao);
      dataBase.addAcao(acao);
    }
  });

program
  .command('stop <nomeAcao>')
  .description('Salva a data e hora de fim')
  .action(function (nomeAcao) {
    comandoEncontrado = true;
    if (dataBase.verificarNome(nomeAcao)) {
      dataBase.endAcao(nomeAcao);
    } else {
      console.error('Essa ação não existe');
    }
  })

program
  .command('list')
  .description('Mostra todos os itens do database')
  .action(function() {
    comandoEncontrado = true;
    console.log(dataBase.dataBase);
  })

program.parse(process.argv);

if (!comandoEncontrado) {
  console.error('Comando inválido!');
}