import { config } from '../config';
import { Acao } from './Acao';
import Storage = require('node-storage');

export class Database {
  public dataBase: Acao[] = [];
  private store: any;
  constructor(){
    this.store = new Storage(config.databasePath);
    this.loadDataBase();
  }

  private loadDataBase(): void {
    this.dataBase = this.store.get('dataBase')
  }

  private saveDataBase(acao?: Acao): void {
    if (acao && this.dataBase) {
      this.dataBase = this.dataBase.map((item: Acao) => {
        if (item.nome === acao.nome) {
          return acao;
        }
        return item;
      });
    }
    this.store.put('dataBase', this.dataBase);
  }

  private buscaAcao(nomeInput: string): Acao[] {
    if (this.dataBase) {
      return this.dataBase.filter((acao: Acao) => {
        return acao.nome === nomeInput;
      });
    }
    return undefined;
  }

  public verificarNome(nomeInput: string): boolean {
    const busca: Acao[] = this.buscaAcao(nomeInput);

    let encontrado = false;
    if (busca && busca.length > 0) {
      encontrado = true;
    }
    
    return encontrado;
  }

  public addAcao(acao: Acao): void {
    if (!this.dataBase) {
      this.dataBase = [];
    }
    this.dataBase.push(acao);
    this.saveDataBase();
  }

  public endAcao(nomeAcao: string): void {
    const busca: Acao[] = this.buscaAcao(nomeAcao);
    if (busca && busca.length > 0) {
      const acao: Acao = new Acao(nomeAcao, busca[0]);
      acao.definirFim();
      this.saveDataBase(acao);
    } else {
      console.error('Acao não encontrada');
    }
  }
}