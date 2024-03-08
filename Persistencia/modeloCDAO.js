import ModeloC from '../Modelo/modeloC.js';
import Cliente from '../Modelo/cliente.js';
import ReservasC from '../Modelo/reservasC.js';
import conectar from './conexao.js';

export default class ModeloCDAO{

    async gravar(modeloC){
        if (modeloC instanceof ModeloC){
            const conexao = await conectar();
            conexao.beginTransaction();
            try{

                const sql = 'INSERT INTO modeloC(cli_codigoC, mod_descricao, mod_modelo, mod_valorAlu) VALUES(?,?,?,?)';        
                const parametros = [modeloC.cliente.cli_codigoC, modeloC.descricao, modeloC.modelo, modeloC.valorAlu];

                const retorno = await conexao.execute(sql,parametros);
                modeloC.codigoM = retorno[0].insertId;

                const sql2 = 'INSERT INTO reservasC(mod_codigoM, res_carrosReservados, res_codigoR, res_periodoFin, res_periodoIn) VALUES(?,?,?,?,?)';
                for (const reservasC of modeloC.reservasC){
                    let parametros2 = [modeloC.codigoM, reservasC.carrosReservados, reservasC.codigoR, reservasC.periodoFin, reservasC.periodoIn];
                    await conexao.execute(sql2,parametros2);

                }
                await conexao.commit();
            }
            catch(error){
                await conexao.rollback();
                throw error;
            }
        }
    }
    async atualizar(modeloC){
        if(modeloC instanceof ModeloC){
            const sql = `UPDATE modeloC SET mod_descricao = ?, mod_modelo = ?, valorAlu = ?, cli_codigoC = ? WHERE mod_codigoM = ?`;
            const parametros = [modeloC.descricao, modeloC.modelo, modeloC.valorAlu, modeloC.cliente.codigoC, modeloC.codigoM];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    async excluir(modeloC){
        if (modeloC instanceof ModeloC){
            const sql = `DELETE FROM modeloC WHERE mod_codigoM = ?`;
            const parametros = [modeloC.codigoM];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    async consultar(codigoM) {
        const listaModeloC = [];
        try {
            const conexao = await conectar();
            const sql = `
                 SELECT 
                m.mod_codigoM, m.cli_codigoC, m.mod_modelo, m.mod_descricao, m.mod_valorAlu,
                c.cli_nome, c.cli_cpf,
                res.res_periodoIn, res.res_periodoFin, res.res_carrosReservados
                FROM modeloC AS m
                INNER JOIN cliente AS c ON m.cli_codigoC = c.cli_codigoC
                INNER JOIN reservasC AS res ON res.mod_codigoM = m.mod_codigoM
                WHERE m.mod_codigoM = ?`;
    
            const [registros, campos] = await conexao.execute(sql, [codigoM]);
            for (const registro of registros) {
                const cliente = new Cliente(registro.cli_codigoC, registro.cli_nome, registro.cli_cpf);
                const reservasC = new ReservasC(registro.res_codigoR, registro.mod_codigoM, registro.res_periodoIn, registro.res_periodoFin, registro.res_carrosReservados);
                const modeloC = new ModeloC(registro.mod_codigoM, registro.cli_codigoC, registro.mod_modelo, registro.mod_descricao, registro.mod_valorAlu);
                modeloC.cliente = cliente;
                modeloC.reservasC.push(reservasC);
                listaModeloC.push(modeloC);
            }
            await conexao.release();
        } catch (error) {
            console.error("Erro ao consultar modeloC:", error);
        }
        return listaModeloC;
    }
    

}