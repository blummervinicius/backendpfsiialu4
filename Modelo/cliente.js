import ClienteDAO from "../Persistencia/clienteDAO.js";

export default class Cliente {
  #codigoC;
  #nome;
  #cpf;
  #telefone;

  constructor(codigoC = 0, nome = "", cpf = "", telefone = "") {
    this.#codigoC = codigoC;
    this.#nome = nome;
    this.#cpf = cpf;
    this.#telefone = telefone;
  }

  get codigoC() {
    return this.#codigoC;
  }

  set codigoC(novoCodigoC) {
    this.#codigoC = novoCodigoC;
  }

  get nome() {
    return this.#nome;
  }

  set nome(novoNome) {
    this.#nome = novoNome;
  }

  get cpf() {
    return this.#cpf;
  }

  set cpf(novoCpf) {
    this.#cpf = novoCpf;
  }

  get telefone() {
    return this.#telefone;
  }

  set telefone(novoTelefone) {
    this.#telefone = novoTelefone;
  }

  toJSON() {
    return {
      codigoC: this.#codigoC,
      nome: this.#nome,
      cpf: this.#cpf,
      telefone: this.#telefone,
    };
  }

  async gravar() {
    const cliDAO = new ClienteDAO();
    await cliDAO.gravar(this);
  }

  async excluir() {
    const cliDAO = new ClienteDAO();
    await cliDAO.excluir(this);
  }

  async atualizar() {
    const cliDAO = new ClienteDAO();
    await cliDAO.atualizar(this);
  }
  async consultar(parametro) {
    const cliDAO = new ClienteDAO();
    return await cliDAO.consultar(parametro);
  }
}
