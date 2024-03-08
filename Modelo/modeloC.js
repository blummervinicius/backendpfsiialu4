import ModeloCDAO from '../Persistencia/modeloCDAO.js';

export default class ModeloC{
    #codigoM;
    #cliente;
    #modelo;
    #descricao;
    #valorAlu;

    constructor(codigoM, cliente, modelo, descricao, valorAlu){
        this.#codigoM = codigoM;
        this.#cliente = cliente;
        this.#modelo = modelo;
        this.#descricao = descricao;
        this.#valorAlu = valorAlu;
    }

    get codigoM(){
        return this.#codigoM;
    }
    
    set codigoM(novoCodigoM){
        if (novoCodigoM === "" || typeof novoCodigoM !== "number" ){
            console.log("Formato de dado inválido");
        }
        else {
            this.#codigoM = novoCodigoM;
        }
        
    
    }

    get cliente(){
        return this.#cliente;
    }

    set cliente(novoCliente){
        this.#cliente = novoCliente;
    }

    get modelo(){
        return this.#modelo;
    }

    set modelo(novoModelo){
        this.#modelo = novoModelo;
    }

    get descricao(){
        return this.#descricao;

    }

    set descricao(novoDescricao){
        this.#descricao = novoDescricao;
    }

    get valorAlu(){
        return this.#valorAlu;
    }

    set valorAlu(novoValorAlu){
        this.#valorAlu = novoValorAlu;
    }

    toJSON(){
        return {
            'codigoM':this.#codigoM,
            'cliente':this.#cliente,
            'modelo':this.#modelo,
            'descricao': this.#descricao,
            'valorAlu': this.#valorAlu
        };
    }

    async gravar(){
        const modDAO = new ModeloCDAO();
        this.codgioM = await modDAO.gravar(this);
    }
    async atualizar(){
        const modDAO = new ModeloCDAO();
        await modDAO.atualizar(this);
    }

    async excluir(){
        const modDAO = new ModeloCDAO();
        await modDAO.excluir(this);
    }

    async consultar(termo){
        const modDAO = new ModeloCDAO();
        const listaModeloC = await modDAO.consultar(termo);
        return listaModeloC;
    }


}