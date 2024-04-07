import VeiculoDAO from "../Persistencia/veiculoDAO.js";

export default class Veiculo {
  #codigoV;
  #modelo;
  #ano;
  #placa;

  constructor(codigoV = 0, modelo = "", ano = "", placa = "") {
    this.#codigoV = codigoV;
    this.#modelo = modelo;
    this.#ano = ano;
    this.#placa = placa;
  }

  get codigoV() {
    return this.#codigoV;
  }
  set codigoV(novoCodigoV) {
    this.#codigoV = novoCodigoV;
  }

  get modelo() {
    return this.#modelo;
  }

  set modelo(novoModelo) {
    this.#modelo = novoModelo;
  }

  get ano() {
    return this.#ano;
  }

  set ano(novoAno) {
    this.#ano = novoAno;
  }

  get placa() {
    return this.#placa;
  }

  set placa(novaPlaca) {
    this.#placa = novaPlaca;
  }

  toJSON() {
    return {
      codigoV: this.#codigoV,
      modelo: this.#modelo,
      ano: this.#ano,
      placa: this.#placa,
    };
  }

  async gravar() {
    const veiDAO = new VeiculoDAO();
    await veiDAO.gravar(this);
  }

  async excluir() {
    const veiDAO = new VeiculoDAO();
    await veiDAO.excluir(this);
  }

  async atualizar() {
    const veiDAO = new VeiculoDAO();
    await veiDAO.atualizar(this);
  }

  async consultar(termo) {
    //trocar termo por codigoR
    const veiDAO = new VeiculoDAO();
    return await veiDAO.consultar(termo); //trocar termo por codigoR
  }
}
