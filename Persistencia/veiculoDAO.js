import Veiculo from "../Modelo/veiculo.js";
import conectar from "./conexao.js";

export default class VeiculoDAO {
  async gravar(veiculo) {
    if (veiculo instanceof Veiculo) {
      const sql = `INSERT INTO veiculo(vei_modelo, vei_ano, vei_placa) VALUES(?,?,?)`;
      const parametros = [veiculo.modelo, veiculo.ano, veiculo.placa];
      const conexao = await conectar();
      const retorno = await conexao.execute(sql, parametros);
      veiculo.codigoV = retorno[0].insertId;
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async atualizar(veiculo) {
    if (veiculo instanceof Veiculo) {
      const sql = `UPDATE veiculo SET vei_modelo = ?, vei_ano = ?, placa = ?`;
      const parametros = [veiculo.modelo, veiculo.ano, veiculo.placa];
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async excluir(veiculo) {
    if (veiculo instanceof Veiculo) {
      const sql = `DELETE FROM veiculo WHERE vei_codigoV = ?`;
      const parametros = [veiculo.codigoV];
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async consultar(codigoR) {
    //camada de modelo trocar por codigoR
    try {
      const conexao = await conectar();
      const sql = `SELECT v.* FROM v
            INNER JOIN reservas_veiculos rv ON v.vei_codigoV = rv.vei_codigoV
            WHERE rv.res_codigoR = ?`;
      const [resultados] = await conexao.execute(sql, [codigoR]);
      return resultados;
    } catch (erro) {
      throw new Error(
        "Erro ao consultar veículos por reserva: " + erro.message
      );
    }
  }
}
