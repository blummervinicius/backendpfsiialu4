import Cliente_ReservaDAO from "../Persistencia/cliente_reservaDAO.js";

export default class Cliente_reserva {
    
    #codigoC;
    #codigoR;
    

    constructor (codigoC, codigoR){
        this.#codigoC = codigoC;
        this.#codigoR = codigoR;
    
    }

    get codigoC(){
        return this.#codigoC;
    }

    set codigoC(novoCodigoC){
        this.#codigoC = novoCodigoC;
    }

    get codigoR(){
        return this.#codigoR;
    }
    
    set codigoR(novoCodigoR){
        this.#codigoR = novoCodigoR;
    }

    toJSON(){
        return{
            codigoC: this.#codigoC,
            codigoR: this.#codigoR
        }
    }

    async gravar(){
        const cliRes = new Cliente_ReservaDAO()
        await cliRes.gravar(this)
    }

    async atualizar(){
        const cliRes = new Cliente_ReservaDAO()
        await cliRes.atualizar(this)
    }

    async consultar(parametro){
        const cliRes = new Cliente_ReservaDAO()
        return await cliRes.consultar(parametro)
    }

    async excluir(){
        const cliRes = new Cliente_ReservaDAO()
        await cliRes.excluir(this)
    }

}

    
