import ReservasC from '../Modelo/reservasC.js';

export default class ReservasCCtrl{

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const periodoIn = dados.periodoIn;
            const periodoFin = dados.periodoFin;
            const carrosReservados = dados.carrosReservados;
            const cliente = dados.cliente;
            

            if (periodoIn && periodoFin && carrosReservados && cliente) {
                const reservasC = new ReservasC(0, periodoIn, periodoFin,
                    carrosReservados, cliente);
                
                reservasC.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": reservasC.codigoR,
                        "mensagem": "Reserva cadastrada com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar reserva:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informar os dados da reserva segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para fazer uma reserva!"
            });
        }
    }
     
    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigoR = dados.codigoR;
            const periodoIn = dados.periodoIn;
            const periodoFin = dados.periodoFin;
            const carrosReservados = dados.carrosReservados;
            const cliente = dados.cliente;
            
            if (codigoR && periodoIn && periodoFin && carrosReservados && cliente) {
                const reservasC = new ReservasC(codigoR, periodoIn, periodoFin,
                    carrosReservados, cliente);
                
                reservasC.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Reserva atualizada com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar reserva:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados da reserva segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar a reserva!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigoR = dados.codigoR;
            if (codigoR) {
                const reservasC = new ReservasC(codigoR);

                reservasC.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Reserva excluída com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir a reserva:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código da reserva!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir uma reserva!"
            });
        }
    }
    
    consultar(requisicao, resposta) {
        resposta.type('application/json');
        
        let termo = requisicao.params.termo;
        if (!termo) {
            termo = "";
        }
        if (requisicao.method === "GET") {
            const reservasC = new ReservasC();
            reservasC.consultar(termo).then((listaReservasC) => {
                resposta.json(
                    {
                        status: true,
                        listaReservasC
                    });
            })
                .catch((erro) => {
                    resposta.json(
                        {
                            status: false,
                            mensagem: "Não foi possível encontrar a reserva: " + erro.message
                        }
                    );
                });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar uma reserva!"
            });
        }
    }
}