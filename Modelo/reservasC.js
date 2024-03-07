import ReservasCDAO from '../Persistencia/reservasCDAO.js'

export default class ReservasC{
        #codigoR;
        #periodoIn;
        #periodoFin;
        #carrosReservados;
        #cliente;

        constructor(codigoR=0, periodoIn='', periodoFin='', carrosReservados='', cliente={}) {
            this.#codigoR = codigoR;
            this.#periodoIn = periodoIn;
            this.#periodoFin = periodoFin;
            this.#carrosReservados = carrosReservados;
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
    
       
        get carrosReservados() {
            return this.#carrosReservados;
        }
    
        
        set carrosReservados(novosCarrosReservados) {
            this.#carrosReservados = novosCarrosReservados;
        }
    
        get cliente() {
            return this.#cliente;
        }
    
       
        set cliente(novoCliente) {
            this.#cliente = novoCliente;
        }

        toJSON(){
            return {
                codigoR:this.#codigoR,
                periodoIn:this.#periodoIn,
                periodoFin:this.#periodoFin,
                carrosReservados:this.#carrosReservados,
                cliente:this.#cliente
            }
        }

        async gravar(){
            const resDAO = new ReservasCDAO();
            await resDAO.gravar(this);
        }
    
        async excluir(){
            const resDAO = new ReservasCDAO();
            await resDAO.excluir(this);
        }
    
        async atualizar(){
            const resDAO = new ReservasCDAO();
            await resDAO.atualizar(this);
        }
    
        async consultar(termo){
            const resDAO = new ReservasCDAO();
            return await resDAO.consultar(termo);
        }
}