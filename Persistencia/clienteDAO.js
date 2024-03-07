import Cliente from '../Modelo/cliente.js';
import conectar from './conexao.js';

export default class ClienteDAO{
    async gravar(cliente){
        if (cliente instanceof Cliente){
            const sql = "INSERT INTO cliente(cli_nome, cli_cpf) VALUES(?,?)";
            const parametros = [cliente.nome,cliente.cpf];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql,parametros);
            cliente.codigoC = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(cliente){
        if(cliente instanceof Cliente){
            const sql = "UPDATE cliente SET cli_nome = ?, cli_cpf =? WHERE cli_codigoC = ?";
            const parametros = [cliente.nome, cliente.cpf, cliente.codigoC];
            const conexao = await conectar();
            await conexao.execute(sql,parametros);
           global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(cliente){
        if (cliente instanceof Cliente){
            const sql = "DELETE FROM cliente WHERE cli_codigoC = ?";
            const parametros = [cliente.codigoC];
            const conexao = await conectar();
            await conexao.execute(sql,parametros);
            global.poolConexoes.releaseConnection(conexao);

        }
    }

    async consultar(parametroConsulta){
        let sql='';
        let parametros=[];
        if(!isNaN(parseInt(parametroConsulta))){
            sql='SELECT cli_codigoC, cli_nome, cli_cpf FROM cliente WHERE cli_codigoC = ? order by cli_nome';
            parametros = [parametroConsulta];
        }
        else{
            if(!parametroConsulta){
                parametroConsulta = '';
            }
            sql = "SELECT cli_codigoC, cli_nome, cli_cpf FROM cliente WHERE cli_nome like ?";
            parametros = ['%'+parametroConsulta+'%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
        let listaCliente = [];
        for (const registro of registros){
            const cliente = new Cliente(registro.cli_codigoC, registro.cli_nome, registro.cli_cpf);
            listaCliente.push(cliente);

        }
        return listaCliente;
    }
}