import ReservasC from '../Modelo/reservasC.js';
import Cliente_reserva from '../Modelo/cliente_reserva.js';

export default class ReservasCCtrl {

    async gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const periodoIn = dados.res_periodoIn;
            const periodoFin = dados.res_periodoFin;
            const carroDescricao = dados.res_carroDescricao;
            const carrosReservados = dados.res_carrosReservados;
            const valor = dados.res_valor;
            

            if (periodoIn && periodoFin && carroDescricao && carrosReservados && valor) {
                const reservasC = new ReservasC(null, periodoIn, periodoFin, carroDescricao, carrosReservados, valor);
               
                try {
                    await reservasC.gravar();
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Reserva cadastrada com sucesso!"
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao registrar reserva: " + erro.message
                    });
                }
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informar os dados da reserva segundo a documentação da API!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para fazer uma reserva!"
            });
        }
    }

    async atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigoR = dados.codigoR;
            const periodoIn = dados.periodoIn;
            const periodoFin = dados.periodoFin;
            const carroDescricao = dados.carroDescricao;
            const carrosReservados = dados.carrosReservados;
            const valor = dados.valor;
           

            if (codigoR && periodoIn && periodoFin && carroDescricao && carrosReservados && valor) {
                const reservasC = new ReservasC(codigoR, periodoIn, periodoFin, carroDescricao, carrosReservados, valor);
                //const clienteReserva = new Cliente_reserva(cliente);

                //reservasC.cliente = clienteReserva;
                reservasC.atualizar().then(() => {
                    resposta.status(200).jso({
                        "status": true,
                        "mensagem": "Reserva atualizada com sucesso!"
                    });
                })

                // try {
                //     await reservasC.atualizar();
                //     resposta.status(200).json({
                //         "status": true,
                //         "mensagem": "Reserva atualizada com sucesso!"
                //     });
                // } 
                
                .catch ((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao atualizar reserva: " + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados da reserva segundo a documentação da API!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar a reserva!"
            });
        }
    }

    async excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const res_codigoR = dados.res_codigoR;
            if (res_codigoR) {
                const reservasC = new ReservasC(res_codigoR);
                try {
                    await reservasC.excluir();
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Reserva excluída com sucesso!"
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir a reserva: " + erro.message
                    });
                }
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código da reserva!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir uma reserva!"
            });
        }
    }

    // async consultar(requisicao, resposta) {
    //     resposta.type('application/json');
    //     let termo = requisicao.params.termo;
    //     if (!termo) {
    //         termo = "";
    //     }
    //     if (requisicao.method === "GET") {
    //         const reservasC = new ReservasC();
    //         try {
    //             const listaReservasC = await reservasC.consultar(termo);
    //             resposta.json({
    //                 status: true,
    //                 listaReservasC
    //             });
    //         } catch (erro) {
    //             resposta.status(500).json({
    //                 status: false,
    //                 mensagem: "Não foi possível encontrar a reserva: " + erro.message
    //             });
    //         }
    //     } else {
    //         resposta.status(400).json({
    //             "status": false,
    //             "mensagem": "Por favor, utilize o método GET para consultar uma reserva!"
    //         });
    //     }
    // }

    async consultar(requisicao, resposta) {
        resposta.type('application/json');
        let termo = requisicao.params.termo;
        if (!termo) {
            termo = "";
        }
        if (requisicao.method === "GET") {
            const reservasC = new ReservasC();
            try {
                const listaReservasC = await reservasC.consultar(termo);
                resposta.json({
                    status: true,
                    listaReservasC
                });
            } catch (erro) {
                resposta.status(500).json({
                    status: false,
                    mensagem: "Não foi possível encontrar a reserva: " + erro.message
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar uma reserva!"
            });
        }
    }

}
