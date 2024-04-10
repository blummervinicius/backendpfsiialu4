import Reservas_veiculos from "../Modelo/reservas_veiculos.js";
import ReservasC from "../Modelo/reservasC.js";
import Veiculo from "../Modelo/veiculo.js";
import conectar from "./conexao.js";

export default class Reservas_veiculosDAO {

  async gravar(reservas_veiculos) {
    if (reservas_veiculos instanceof Reservas_veiculos) {
      const sql = `INSERT INTO reservas_veiculos(res_codigoR, vei_codigoV) VALUES (?,?)`;
      const conexao = await conectar();

      for(let veiculo of reservas_veiculos.codigoV){
        const parametros = [reservas_veiculos.codigoR, veiculo];
        const retorno = await conexao.execute(sql, parametros);

      }
      
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async atualizar(reservas_veiculos) {
    if (reservas_veiculos instanceof Reservas_veiculos) {
      const sql = `UPDATE reservas_veiculos SET vei_codigoV = ? WHERE vei_codigoV = ?`;
      const conexao = await conectar();
      const parametros = [reservas_veiculos.codigoR, reservas_veiculos.codigoV];
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async consultar(consulta) {
    let sql = "";
    let parametros = [];

    if (!isNaN(parseInt(consulta))) {
      sql = `SELECT rc.res_codigoR, rc.res_periodoIn, rc.res_periodoFin, rc.res_quantidade, rc.res_valor, rc.cli_codigoC,
                          v.vei_codigoV, v.vei_modelo, v.vei_ano, v.vei_placa
                   FROM reservas_veiculos rv
                   INNER JOIN reservasC rc ON rv.res_codigoR = rc.res_codigoR
                   INNER JOIN veiculo v ON rv.vei_codigoV = v.vei_codigoV
                   WHERE rc.res_codigoR = ?`;
      parametros = [consulta];
    } else {
      sql = `SELECT rc.res_codigoR, rc.res_periodoIn, rc.res_periodoFin, rc.res_quantidade, 
                          rc.res_valor, rc.cli_codigoC,
                          v.vei_codigoV, v.vei_modelo, v.vei_ano, v.vei_placa
                   FROM reservas_veiculos rv
                   INNER JOIN reservasC rc ON rv.res_codigoR = rc.res_codigoR
                   INNER JOIN veiculo v ON rv.vei_codigoV = v.vei_codigoV
                   WHERE v.vei_modelo LIKE ?`;
      parametros = ["%" + consulta + "%"];
    }

    const conexao = await conectar();
    const [registros] = await conexao.execute(sql, parametros);

    let listaReservasVeiculos = [];

    for (const registro of registros) {
      listaReservasVeiculos.push(registro);
    }

    return listaReservasVeiculos;
  }

  async excluir(reservas_veiculos) {
    if (reservas_veiculos instanceof Reservas_veiculos) {
      const sql = `DELETE FROM reservas_veiculos WHERE res_codigoR = ? AND vei_codigoV = ?`;

      const parametros = [reservas_veiculos.codigoR, reservas_veiculos.codigoV];
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    }
  }
}
