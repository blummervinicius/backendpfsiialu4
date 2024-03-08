import ReservasC from '../Modelo/reservasC.js';
import Cliente from '../Modelo/cliente.js';
import conectar from './conexao.js';



export default class ReservasCDAO{

    async gravar(reservasC){
        if(reservasC instanceof ReservasC){
            const sql = `INSERT INTO reservasC(res_periodoIn, res_periodoFin, res_carrosReservados, cli_codigoC) VALUES(?,?,?,?)`;
            const parametros = [reservasC.periodoIn, reservasC.periodoFin, reservasC.carrosReservados, reservasC.cliente.codigoC];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            reservasC.codigoR = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(reservasC){
        if(reservasC instanceof ReservasC){
            const sql = `UPDATE reservasC SET res_periodoIn = ?, res_periodoFin = ?, res_carrosReservados = ?, cli_codigoC = ? WHERE res_codigoR = ?`;
            const parametros = [reservasC.periodoIn, reservasC.periodoFin, reservasC.carrosReservados, reservasC.cliente.codigoC, reservasC.codigoR];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(reservasC){
        if (reservasC instanceof ReservasC){
            const sql = `DELETE FROM reservasC WHERE res_codigoR = ?`;
            const parametros = [reservasC.codigoR];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo){
        if (!termo){
            termo="";
        }
        const conexao = await conectar();
        let listaReservasC = [];
        if (!isNaN(parseInt(termo))){
            const sql = `SELECT r.res_codigoR, r.res_periodoIn, r.res_periodoFin, r.res_carrosReservados, c.cli_codigoC, c.cli_nome, c.cli_cpf
            FROM reservasC r 
            INNER JOIN cliente c ON r.cli_codigoC = c.cli_codigoC
            WHERE r.res_codigoR = ?
            ORDER BY r.res_periodoIn`;
            const parametros=[termo];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const cliente = new Cliente(registro.cli_codigoC, registro.cli_nome, registro.cli_cpf);
                const reservasC = new ReservasC(registro.res_codigoR, registro.res_periodoIn, registro.res_periodoFin, registro.res_carrosReservados, cliente);
                listaReservasC.push(reservasC);
            }

        }
        else{
            const sql = `SELECT r.res_codigoR, r.res_periodoIn, r.res_periodoFin, r.res_carrosReservados, c.cli_codigoC, c.cli_nome, c.cli_cpf 
            FROM reservasC r 
            INNER JOIN cliente c ON r.cli_codigoC = c.cli_codigoC
            WHERE r.res_periodoIn like?
            ORDER BY r.res_periodoIn`;
            const parametros=['%'+termo+'%'];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const cliente = new Cliente(registro.cli_codigoC, registro.cli_nome, registro.cli_cpf);
                const reservasC = new ReservasC(registro.res_codigoR, registro.res_periodoIn, registro.res_periodoFin, registro.res_carrosReservados, cliente);
                
                listaReservasC.push(reservasC);
            }
        }
        return listaReservasC;
    }

}