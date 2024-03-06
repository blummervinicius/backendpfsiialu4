import ReservasDAO from '../Persistencia/reservasDAO.js';

export default class Reservas{
    #codigoRes;
    #periodoIn;
    #periodoFin;
    #quartosReservados;

    constructor(codigoRes=0,codigoH=0,periodoIn='',periodoFin='',quartosReservados=''){
        this.#codigoRes=codigoRes;
        this.#periodoIn=periodoIn;
        this.#periodoFin=periodoFin;
        this.#quartosReservados=quartosReservados;
    }
    get codigoRes(){
        return this.#codigoRes;
    }

    set codigoRes(novoCodigoRes){
        this.#codigoRes = novoCodigoRes;
    }

    get periodoIn(){
        return this.#periodoIn;
    }

    set periodoIn(novoPeriodoIn){
        this.#periodoIn = novoPeriodoIn;
    }

    get periodoFin(){
        return this.periodoFin;
    }

    set periodoFin(novoPeriodoFin){
        this.#periodoFin = novoPeriodoFin;
    }

    get quartosReservados(){
        return this.#quartosReservados;
    }

    set quartosReservados(novoQuartosReservados){
        this.#quartosReservados = novoQuartosReservados;
    }

    toJSON(){
        return {
            codigoRes:this.#codigoRes,
            periodoIn:this.#periodoIn,
            periodoFin:this.#periodoFin,
            quartosReservados:this.#quartosReservados,
        }
    }

    async gravar(){
        const resDAO = new ReservasDAO();
        await resDAO.gravar(this);
    }

    async excluir(){
        const resDAO = new ReservasDAO();
        await resDAO.excluir(this);
    }

    async atualizar(){
        const resDAO = new ReservasDAO();
        await resDAO.atualizar(this);
    }

    async consultar(termo){
        const resDAO = new ReservasDAO();
        return await resDAO.consultar(termo);
    }

}