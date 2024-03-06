import HospedesDAO from '../Persistencia/hospedesDAO.js';

export default class Hospedes {

    #codigoH;
    #nome;
    #cpf;

    constructor(codigoH=0, nome='', cpf=''){
        this.#codigoH=codigoH;
        this.#nome=nome;
        this.#cpf=cpf;
    }

    get codigoH(){
        return this.#codigoH;
    }

    set codigoH(novoCodigoH){
        this.#codigoH = novoCodigoH;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        this.#nome = novoNome;
    }

    get cpf(){
        return this.#cpf;
    }

    set cpf(novoCpf){
        this.#cpf = novoCpf;
    }

    toJSON(){
        return {
            codigoH:this.#codigoH,
            nome:this.#nome,
            cpf:this.#cpf
        }
    }

    async gravar(){
        const hospDAO = new HospedesDAO();
        await hospDAO.gravar(this);
    }

    async excluir(){
        const hospDAO = new HospedesDAO();
        await hospDAO.excluir(this);
    }

    async atualizar(){
        const hospDAO = new HospedesDAO();
        await hospDAO.atualizar(this);
    }
    async consultar(parametro){
        const hospDAO = new HospedesDAO();
        return await hospDAO.consultar(parametro);
    }
}