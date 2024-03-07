import Reservas from "../Modelo/reservas.js";

export default class ReservasCtrl {
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const periodoIn = dados.periodoIn;
            const periodoFin = dados.periodoFin;
            const quartosReservados = dados.quartosReservados;
            const hospedes = dados.hospedes;
            

            if (periodoIn && periodoFin && quartosReservados && hospedes) {
                const reservas = new Reservas(0, periodoIn, periodoFin,
                    quartosReservados, hospedes);
                
                reservas.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": reservas.codigoRes,
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
                "mensagem": "Por favor, utilize o método POST para cadastrar uma reserva!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigoRes = dados.codigoRes;
            const periodoIn = dados.periodoIn;
            const periodoFin = dados.periodoFin;
            const quartosReservados = dados.quartosReservados;
            const hospedes = dados.hospedes;
            
            if (codigoRes && periodoIn && periodoFin && quartosReservados && hospedes) {
                const reservas = new Reservas(codigoRes, periodoIn, periodoFin,
                    quartosReservados, hospedes);
                
                reservas.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Reserva atualizada com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar a reserva:" + erro.message
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
            const codigoRes = dados.codigoRes;
            if (codigoRes) {
                const reservas = new Reservas(codigoRes);

                reservas.excluir().then(() => {
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
            const reservas = new Reservas();
            reservas.consultar(termo).then((listaReservas) => {
                resposta.json(
                    {
                        status: true,
                        listaReservas
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