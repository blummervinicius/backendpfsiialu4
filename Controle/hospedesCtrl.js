import Hospedes from "../Modelo/hospedes.js";



export default class HospedesCtrl {

    gravar(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')){
            const dados = requisicao.body;
            const nome = dados.nome;
            const cpf = dados.cpf;

            if (nome && cpf){
                const hospedes = new Hospedes(0, nome, cpf);
                hospedes.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": hospedes.codigoH,
                        "mensagem": "Hospede cadastrado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar o Hospede:" +erro.message
                        });
                    });
            }
            else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem":"Por favor, informe o nome do hospede!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar o hospede!"
            });
        }
    }

    atualizar(requisicao, resposta){
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')){
            const dados = requisicao.body;
            const codigoH = dados.codigoH;
            const nome = dados.nome;
            const cpf = dados.cpf;
            if (codigoH && nome && cpf){
                const hospedes = new Hospedes(codigoH, nome, cpf);
                hospedes.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": false,
                        "mensagem": "Erro ao atualizar o hospede:" + erro.message
                    });
                });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código e nome do hospede!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar o hospede!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigoH = dados.codigoH;
            if (codigoH) {
                const hospedes = new Hospedes(codigoH);
                
                hospedes.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Hospede excluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o hospede:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do hospede!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir uma hospede!"
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
            const hospedes = new Hospedes();
            hospedes.consultar(termo).then((listaHospedes)=>{
                resposta.json(
                    {
                        status:true,
                        listaHospedes
                    });
            })
            .catch((erro)=>{
                resposta.json(
                    {
                        status:false,
                        mensagem:"Não foi possível obter o hospede: " + erro.message
                    }
                );
            });
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar um hospede!"
            });
        }
    }
}