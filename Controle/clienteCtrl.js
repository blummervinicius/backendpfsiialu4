import Cliente from '../Modelo/cliente.js';

export default class ClienteCtrl{

    gravar(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')){
            const dados = requisicao.body;
            const nome = dados.nome;
            const cpf = dados.cpf;

            if (nome && cpf){
                const cliente = new Cliente(0, nome, cpf);
                cliente.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": cliente.codigoC,
                        "mensagem": "Cliente cadastrado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao cadastrar cliente:" +erro.message
                        });
                    });
            }
            else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem":"Por favor, informe o nome do cliente!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar o cliente!"
            });
        }
    }

    atualizar(requisicao, resposta){
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')){
            const dados = requisicao.body;
            const codigoC = dados.codigoC;
            const nome = dados.nome;
            const cpf = dados.cpf;
            if (codigoC && nome && cpf){
                const cliente = new Cliente(codigoC, nome, cpf);
                cliente.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Cliente atualizado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao atualizar o cliente:" +erro.message
                    });
                });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código e nome do cliente!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar o cliente!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigoC = dados.codigoC;
            if (codigoC) {
                const cliente = new Cliente(codigoC);
                
                cliente.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Cliente excluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o cliente:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do cliente!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um cliente!"
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        let termo = requisicao.params.termo;
        if (!termo){
            termo = "";
        }
        if (requisicao.method === "GET"){
            const cliente = new Cliente();
            cliente.consultar(termo).then((listaCliente)=>{
                resposta.json(
                    {
                        status:true,
                        listaCliente
                    });
            })
            .catch((erro)=>{
                resposta.json(
                    {
                        status:false,
                        mensagem:"Não foi possível obter o cliente: " + erro.message
                    }
                );
            });
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar um cliente!"
            });
        }
    }
}