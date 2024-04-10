import Reservas_veiculosDAO from "../Persistencia/reservas_veiculosDAO.js";

export default class Reservas_veiculos {
  #codigoR;
  #codigoV;

  constructor(codigoR, codigoV) {
    this.#codigoR = codigoR;
    this.#codigoV = codigoV;
  }
  get codigoR() {
    return this.#codigoR;
  }

  set codigoR(novoCodigoR) {
    this.#codigoR = novoCodigoR;
  }

  get codigoV() {
    return this.#codigoV;
  }

  set codigoV(novoCodigoV) {
    this.#codigoV = novoCodigoV;
  }

  toJSON() {
    return {
      codigoR: this.#codigoR,
      codigoV: this.#codigoV,
    };
  }

  async gravar() {
    const resVDAO = new Reservas_veiculosDAO();
    await resVDAO.gravar(this);
  }

  async atualizar() {
    const resVDAO = new Reservas_veiculosDAO();
    await resVDAO.atualizar(this);
  }

  async consultar(parametro) {
    const resVDAO = new Reservas_veiculosDAO();
    return await resVDAO.consultar(parametro);
  }

  async excluir() {
    const resVDAO = new Reservas_veiculosDAO();
    await resVDAO.excluir(this);
  }
}
