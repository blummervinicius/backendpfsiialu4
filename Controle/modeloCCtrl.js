import Cliente from "../Modelo/cliente";
import ModeloC from "../Modelo/modeloC";
import ReservasC from "../Modelo/reservasC";

export default class ModeloCCtrl{
    gravar(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application.json')){
            const dados = requisicao.body;
            const cliente = dados.cliente;
            const modelo = dados.modelo;
            const descricao = dados.descricao;
            const valorAlu = dados.valorAlu;
            const objCliente = new Cliente(cliente.codigoC);   
        
        const modeloC = new ModeloC(0, objCliente, modelo, descricao, valorAlu);

        modeloC.gravar().then(() => {
            resposta.status(200).json({
                "status": true,
                "mensagem": "Dados Registrados com sucesso",
                "codigo": modeloC.codgioM
            });
        })
        .catch((erro) => {
            resposta.status(500).json({
                "status": false,
                "mensagem": "Erro ao registrar o modelo:" + erro.message
            })
        })
    }
    }

}