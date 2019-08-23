#!/usr/bin/env node

const Storage = require('node-storage');
const commander = require('commander');

const store = new Storage('~/.stopwatch');
const program = new commander.Command();
program.version('0.0.1');

const count = store.get('hello');
console.log(count);
store.put('hello', (count || 0) + 1);



program.command('start <task>')
  .alias('s')
  .description('Starts a new task')
  .action((task) => {
    console.log('Iniciou a tarefa ');
  })
;

program.parse(process.argv);

if (typeof cmdValue === 'undefined') {
  console.error('no command given!');
  process.exit(1);
}