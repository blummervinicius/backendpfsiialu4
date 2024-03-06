import Hospedes from "../Modelo/hospedes.js";
import conectar from "./conexao.js";

export default class HospedesDAO{
    async gravar(hospedes){
        if (hospedes instanceof Hospedes){
            const sql = "INSERT INTO hospedes(hosp_nome, hosp_cpf) VALUES(?,?)";
            const parametros = [hospedes.nome,hospedes.cpf];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql,parametros);
            hospedes.codigoH = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(hospedes){
        if(hospedes instanceof Hospedes){
            const sql = "UPDATE hospedes SET hosp_nome = ?, hosp_cpf =? WHERE hosp_codigoH = ?";
            const parametros = [hospedes.nome, hospedes.cpf];
            const conexao = await conectar();
            await conexao.execute(sql,parametros);
           global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(hospedes){
        if (hospedes instanceof Hospedes){
            const sql = "DELETE FROM hospedes WHERE hosp_codigoH = ?";
            const parametros = [hospedes.codigoH];
            const conexao = await conectar();
            await conexao.execute(sql,parametros);
            global.poolConexoes.releaseConnection(conexao);

        }
    }

    async consultar(parametroConsulta){
        let sql='';
        let parametros=[];
        if(!isNaN(parseInt(parametroConsulta))){
            sql='SELECT hosp_codigoH, hosp_nome, hosp_cpf FROM hospedes WHERE hosp_codigoH = ? order by hosp_nome';
            parametros = [parametroConsulta];
        }
        else{
            if(!parametroConsulta){
                parametroConsulta = '';
            }
            sql = "SELECT hosp_codigoH, hosp_nome, hosp_cpf FROM hospedes WHERE hosp_nome like ?";
            parametros = ['%'+parametroConsulta+'%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
        let listaHospedes = [];
        for (const registro of registros){
            const hospedes = new Hospedes(registro.hosp_codigoH, registro.hosp_nome, registro.hosp_cpf);
            listaHospedes.push(hospedes);

        }
        return listaHospedes;
    }
}