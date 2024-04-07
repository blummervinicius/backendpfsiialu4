import Reservas_veiculos from "../Modelo/reservas_veiculos.js";

export default class Reservas_veiculosCtrl {
  gravar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const res_codigoR = dados.res_codigoR;
      const vei_codigoV = dados.vei_codigoV;

      if (res_codigoR && vei_codigoV) {
        const reservas_veiculos = new Reservas_veiculos(
          res_codigoR,
          vei_codigoV
        );

        reservas_veiculos
          .gravar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Reserva vinculada ao veículo!",
            });
          })
          .catch((eroo) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao vincular reserva:" + erro.message,
            });
          });
      }
    }
  }

  atualizar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "PUT" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const codigoR = dados.codigoR;
      const codigoV = dados.codigoV;

      if (codigoR && codigoV) {
        const reservas_veiculos = new Reservas_veiculos(codigoR, codigoV);
        reservas_veiculos
          .atualizar()
          .then(() => {
            resposta.estatus(200).json({
              status: true,
              mensagem: "Vinculo realizado",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao atualizaro reserva:" + erro.message,
            });
          });
      }
    }
  }

  consultar(requisicao, resposta) {
    resposta.type("application/json");
    let termo = requisicao.params.termo;

    if (!termo) {
      termo = "";
    }

    if (requisicao.method === "GET") {
      const reservas_veiculos = new Reservas_veiculos();
      reservas_veiculos
        .consultar(termo)
        .then((lista) => {
          resposta.json({
            status: true,
            lista,
          });
        })
        .catch((erro) => {
          resposta.json({
            status: false,
            mensagem: "Não foi possível encontrar a reserva: " + erro.message,
          });
        });
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Por favor, utilize o método GET para consultar reserva!",
      });
    }
  }

  excluir(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "DELETE" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const codigoR = dados.codigoR;
      const codigoV = dados.codigoV;
      if (codigoR && codigoV) {
        const reservas = new Reservas_veiculos(codigoR, codigoV);
        reservas
          .excluir()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Vinculo excluído com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Errro ao exlcuir reserva:" + erro.message,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Informe o código da reserva!",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Utilize o método DELETE para excluir um cliente",
      });
    }
  }
}
