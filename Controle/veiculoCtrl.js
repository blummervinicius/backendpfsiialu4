import Veiculo from "../Modelo/veiculo.js";

export default class VeiculoCtrl {
  gravar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const modelo = dados.modelo;
      const ano = dados.ano;
      const placa = dados.placa;

      if (modelo && ano && placa) {
        const veiculo = new Veiculo(0, modelo, ano, placa);

        veiculo
          .gravar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              codigoGerado: veiculo.codigoV,
              mensagem: "veículo cadastrado com sucesso",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao registrar o veículo:" + erro.message,
            });
          });
      }
    }
  }

  atualizar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "PUT" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const codigoV = dados.codigoV;
      const modelo = dados.modelo;
      const ano = dados.ano;
      const placa = dados.placa;

      if (codigoV && modelo && ano && placa) {
        const veiculo = new Veiculo(codigoV, modelo, ano, placa);

        veiculo
          .atualizar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Veículo atualizada com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao atualizar veículo: " + erro.message,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem:
            "Por favor, informe todos os dados do veículo segundo a documentação da API!",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem:
          "Por favor, utilize os métodos PUT ou PATCH para atualizar a reserva!",
      });
    }
  }

  consultar(requisicao, resposta) {
    resposta.type("application/json");
    let termo = requisicao.params.termo;

    if (!termo) {
      termo = "";
    }

    if (requisicao.method === "GET") {
      const veiculo = new Veiculo();
      veiculo
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
            mensagem: "Não foi possível encontrar o veículo: " + erro.message,
          });
        });
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Por favor, utilize o método GET para consultar veículos!",
      });
    }
  }

  excluir(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "DELETE" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const codigoV = dados.codigoV;

      if (codigoV) {
        const veiculo = new Veiculo(codigoV);
        veiculo
          .excluir()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Veículo excluído com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao excluir o veículo:" + erro.message,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Informe o código do veículo!",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Utilize o método DELETE para excluir o veículo!",
      });
    }
  }
}
