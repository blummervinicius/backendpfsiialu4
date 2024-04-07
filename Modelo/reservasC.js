import ReservasCDAO from "../Persistencia/reservasCDAO.js";

export default class ReservasC {
  #codigoR;
  #periodoIn;
  #periodoFin;
  #quantidade;
  #valor;
  #cliente;

  constructor(
    codigoR = 0,
    periodoIn = "",
    periodoFin = "",
    quantidade = "",
    valor = 0,
    cliente = {}
  ) {
    this.#codigoR = codigoR;
    this.#periodoIn = periodoIn;
    this.#periodoFin = periodoFin;
    this.#quantidade = quantidade;
    this.#valor = valor;
    this.#cliente = cliente;
  }

  get codigoR() {
    return this.#codigoR;
  }

  set codigoR(novoCodigoR) {
    this.#codigoR = novoCodigoR;
  }

  get periodoIn() {
    return this.#periodoIn;
  }

  set periodoIn(novoPeriodoIn) {
    this.#periodoIn = novoPeriodoIn;
  }

  get periodoFin() {
    return this.#periodoFin;
  }

  set periodoFin(novoPeriodoFin) {
    this.#periodoFin = novoPeriodoFin;
  }

  get quantidade() {
    return this.#quantidade;
  }

  set quantidade(novoQuantidade) {
    this.#quantidade = novoQuantidade;
  }

  get valor() {
    return this.#valor;
  }

  set valor(novoValor) {
    this.#valor = novoValor;
  }

  get cliente() {
    return this.#cliente;
  }

  set cliente(novoCliente) {
    this.#cliente = novoCliente;
  }

  toJSON() {
    return {
      codigoR: this.#codigoR,
      periodoIn: this.#periodoIn,
      periodoFin: this.#periodoFin,
      quantidade: this.#quantidade,
      valor: this.#valor,
      cliente: this.#cliente,
    };
  }

  async gravar() {
    const resDAO = new ReservasCDAO();
    await resDAO.gravar(this);
  }

  async excluir() {
    const resDAO = new ReservasCDAO();
    await resDAO.excluir(this);
  }

  async atualizar() {
    const resDAO = new ReservasCDAO();
    await resDAO.atualizar(this);
  }

  async consultar(termo) {
    const resDAO = new ReservasCDAO();
    return await resDAO.consultar(termo);
  }
}
