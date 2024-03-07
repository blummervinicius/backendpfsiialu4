import ClienteDAO from '../Persistencia/clienteDAO.js';

export default class Cliente{
    #codigoC;
    #nome;
    #cpf;

    constructor(codigoC=0, nome='', cpf='') {
        this.#codigoC = codigoC;
        this.#nome = nome;
        this.#cpf = cpf;
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

    toJSON(){
        return {
            codigoC:this.#codigoC,
            nome:this.#nome,
            cpf:this.#cpf
        }
    }

    async gravar(){
        const cliDAO = new ClienteDAO();
        await cliDAO.gravar(this);
    }

    async excluir(){
        const cliDAO = new ClienteDAO();
        await cliDAO.excluir(this);
    }

    async atualizar(){
        const cliDAO = new ClienteDAO();
        await cliDAO.atualizar(this);
    }
    async consultar(parametro){
        const cliDAO = new ClienteDAO();
        return await cliDAO.consultar(parametro);
    }
}
