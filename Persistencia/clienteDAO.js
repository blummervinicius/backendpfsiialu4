import Cliente from "../Modelo/cliente.js";
import conectar from "./conexao.js";

export default class ClienteDAO {
  async gravar(cliente) {
    if (cliente instanceof Cliente) {
      const sql =
        "INSERT INTO cliente(cli_nome, cli_cpf, cli_telefone) VALUES(?,?,?)"; // Alteração: incluir o campo "cli_telefone" na inserção
      const parametros = [cliente.nome, cliente.cpf, cliente.telefone]; // Alteração: adicionar o telefone aos parâmetros
      const conexao = await conectar();
      const retorno = await conexao.execute(sql, parametros);
      cliente.codigoC = retorno[0].insertId;
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async atualizar(cliente) {
    if (cliente instanceof Cliente) {
      const sql =
        "UPDATE cliente SET cli_nome = ?, cli_cpf = ?, cli_telefone = ? WHERE cli_codigoC = ?"; 
      const parametros = [
        cliente.nome,
        cliente.cpf,
        cliente.telefone,
        cliente.codigoC,
      ]; 
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async excluir(cliente) {
    if (cliente instanceof Cliente) {
      const sql = "DELETE FROM cliente WHERE cli_codigoC = ?";
      const parametros = [cliente.codigoC];
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
        "SELECT cli_codigoC, cli_nome, cli_cpf, cli_telefone FROM cliente WHERE cli_codigoC = ? ORDER BY cli_nome"; // Alteração: inclui o campo "cli_telefone" na consulta
      parametros = [parametroConsulta];
    } else {
      if (!parametroConsulta) {
        parametroConsulta = "";
      }
      sql = `SELECT cli_codigoC, cli_nome, cli_cpf, cli_telefone FROM cliente WHERE cli_nome LIKE ?`;
      parametros = ["%" + parametroConsulta + "%"];
    }
    const conexao = await conectar();
    const [registros, campos] = await conexao.execute(sql, parametros);
    let listaCliente = [];

    for (const registro of registros) {
      const cliente = new Cliente(
        registro.cli_codigoC,
        registro.cli_nome,
        registro.cli_cpf,
        registro.cli_telefone
      ); // Alteração: passar o telefone para o construtor
      listaCliente.push(cliente);
    }
    return listaCliente;
  }
}
