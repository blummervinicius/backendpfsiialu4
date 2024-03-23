import ReservasCDAO from '../Persistencia/reservasCDAO.js'

export default class ReservasC{
        #codigoR;
        #periodoIn;
        #periodoFin;
        #carroDescricao;
        #carrosReservados;
        #valor;
        #cliente;

        constructor(codigoR=0, periodoIn='', periodoFin='', carroDescricao='', carrosReservados='', valor=0, cliente={}) {
            this.#codigoR = codigoR;
            this.#periodoIn = periodoIn;
            this.#periodoFin = periodoFin;
            this.#carroDescricao = carroDescricao;
            this.#carrosReservados = carrosReservados;
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
        
        get carroDescricao(){
            return this.#carroDescricao;
        }
        
        set carroDescricao(novoCarroDescricao){
            this.#carroDescricao = novoCarroDescricao;
        }

        get carrosReservados() {
            return this.#carrosReservados;
        }
    
        set carrosReservados(novosCarrosReservados) {
            this.#carrosReservados = novosCarrosReservados;
        }

        get valor(){
            return this.#valor;
        }

        set valor(novoValor){
            this.#valor = novoValor;
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
                carroDescricao:this.#carroDescricao,
                carrosReservados:this.#carrosReservados,
                valor:this.#valor,
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