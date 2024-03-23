import Cliente_reserva from "../Modelo/cliente_reserva.js";
import Cliente_ReservaDAO from "../Persistencia/cliente_reservaDAO.js";


export default class Cliente_ReservaCtrl {
    gravar(req, res){
        res.type('application/json')
        if (req.method === 'POST' && req.is('application/json')){

            const dados = req.body
            const cli_codigoC = dados.cli_codigoC
            const res_codigoR = dados.res_codigoR
            // const listaReservasC = dados.listaReservasC

            if(cli_codigoC && res_codigoR ){
                const cliente_reserva = new Cliente_reserva(cli_codigoC, res_codigoR)

                // const dao = new Cliente_ReservaDAO();
                // dao.gravar(cliente_reserva)

                cliente_reserva.gravar()
                    .then(() => {
                        res.status(200).json({
                            "status": true,
                            "mensagem": "Cliente vinculado a reserva com sucesso!"
                        })
                    })
                    .catch((erro) => {
                        res.status(500).json({
                            "status": false,
                            "mensagem": "Ero ao vincular cliente:"+erro.message
                        })
                    })
            }
        }
    }

    atualizar(req, res){
        res.type('application/json')
        if(req.method === 'PUT' && req.is('application/json')){
            const dados = req.body
            const codigoC = dados.codigoC 
            const codigoR = dados.codigoR
            const codigo_novo_reserva = dados.codigo_novo_reserva
             
            if(codigoC && codigoR && codigo_novo_reserva){
                const cliente_reserva = new Cliente_reserva(codigoC, codigoR, codigo_novo_reserva)
                cliente_reserva.atualizar()
                    .then(() => {
                        res.status(200).json({
                            "status": true,
                            "mensagem": "Vinculo de cliente atualizado com sucesso"
                        })
                    })
                    .catch((erro) => {
                        res.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar vinculo do cliente:"+ erro.message
                        });
                    })
            }
        }
    }

    consultar(req, res){
        res.type('application/json');
        let termo = req.params.termo;

        if(!termo){
            termo = "";
        }
        if (req.method === "GET") {
            const cliente_reserva = new Cliente_reserva()
            cliente_reserva.consultar(termo).then((lista) => {
                res.json({
                    status: true,
                    lista
                });
            }).catch((erro) => {
                res.json({
                    status: false,
                    mensagem: "Não foi possível encontrar o cliente:" + erro.message
                });
            });
        } else {
            res.status(400).json({
                status: false,
                mensagem: "Por favor, utilize o método GET para consultar Cliente!"
            })
        }
    }
    excluir(req, res){
        res.type('application/json');
        if (req.method === 'DELETE' && req.is('application/json')){
            const dados = req.body;
            const codigoC = dados.codigoC;
            const codigoR = dados.codigoR;

            if (codigoC && codigoR){
                const cliente = new Cliente_reserva(codigoC, codigoR);
                cliente.excluir().then(() => {
                    res.status(200).json({
                        "status": true,
                        "mensagem": "Vinculo de cliente excluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        res.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir vínculo do cliente:" + erro.message
                        });
                    });
            }
            else {
                res.status(400).json({
                    "status": false,
                    "mensagem": "Informe o códgio do cliente!"
                })
            }
        }
        else {
            res.status(400).json({
                "status": false, 
                "mensagem": "Ultilize o método DELETE para excluir um cliente"
            });
        }
    }
}