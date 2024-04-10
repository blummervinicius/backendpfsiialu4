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
      const sql = `UPDATE veiculo SET vei_modelo = ?, vei_ano = ?, vei_placa = ? WHERE vei_codigoV = ?`;
      const parametros = [veiculo.modelo, veiculo.ano, veiculo.placa, veiculo.codigoV];
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    }else {
      throw new Error('Objeto veiculo inválido.')
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

  async consultar(parametroConsulta) {
    let sql = "";
    let parametros = [];
    if (!isNaN(parseInt(parametroConsulta))) {
      sql =
        "SELECT vei_codigoV, vei_modelo, vei_ano, vei_placa FROM veiculo WHERE vei_codigoV = ? ORDER BY vei_modelo";
      parametros = [parametroConsulta];
    } else {
      if (!parametroConsulta) {
        parametroConsulta = "";
      }
      sql = `SELECT vei_codigoV, vei_modelo, vei_ano, vei_placa FROM veiculo WHERE vei_modelo LIKE ?`;
      parametros = ["%" + parametroConsulta + "%"];
    }
    const conexao = await conectar();
    const [registros, campos] = await conexao.execute(sql, parametros);
    let listaVeiculos = [];

    for (const registro of registros) {
      const veiculo = new Veiculo(
        registro.vei_codigoV,
        registro.vei_modelo,
        registro.vei_ano,
        registro.vei_placa
      );
      listaVeiculos.push(veiculo);
    }
    return listaVeiculos;
}

}
