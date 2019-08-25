interface IAcao {
  nome: string;
  dataInicio: Date;
  dataFim: Date;
  duracao: Number;
}

export class Acao {
  public nome: string;
  public dataInicio: Date;
  public dataFim: Date;
  public duracao: Number;

  constructor(nomeAcao: string, acao?: IAcao) {
    this.dataInicio = new Date();
    this.nome = nomeAcao;
    if (acao) {
      this.dataInicio = new Date(acao.dataInicio);
      this.dataFim = new Date(acao.dataFim);
      this.duracao = acao.duracao;
    }
  }

  public definirFim() {
    this.dataFim = new Date();
    this.duracao = this.dataFim.getTime() - this.dataInicio.getTime();
  }
}