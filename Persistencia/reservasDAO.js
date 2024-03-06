import Reservas from '../Modelo/reservas.js';
import Hospedes from '../Modelo/hospedes.js';
import conectar from './conexao.js';

export default class ReservasDAO{

    async gravar(reservas){
        if(reservas instanceof Reservas){
            const sql = `INSERT INTO reservas(res_periodoIn, res_periodoFin, res_quartosReservados, hosp_codigoH) VALUES(?,?,?,?)`;
            const parametros = [reservas.periodoIn, reservas.periodoFin, reservas.quartosReservados, reservas.hospedes.codigoH];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            reservas.codigoRes = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    
    async atualizar(reservas){
        if(reservas instanceof Reservas){
            const sql = `UPDATE reservas SET res_periodoIn = ?, res_periodoFin = ?, res_quartosReservados = ?, hosp_codigoH = ? WHERE res_codigoRes = ?`;
            const parametros = [reservas.periodoIn, reservas.periodoFin, reservas.quartosReservados, reservas.hospedes.codigoH, reservas.codigoRes];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(reservas){
        if (reservas instanceof Reservas){
            const sql = `DELETE FROM reservas WHERE res_codigoRes = ?`;
            const parametros = [reservas.codigoRes];
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
        let listaReservas = [];
        if (!isNaN(parseInt(termo))){
            const sql = `SELECT r.res_codigoRes, r.res_periodoIn, r.res_periodoFin, r.res_quartosReservados, h.hosp_codigoH, h.hosp_nome, h.hosp_cpf
            FROM reservas r 
            INNER JOIN hospedes h ON r.hosp_codigoH = h.hosp_codigoH
            WHERE r.res_codigoRes = ?
            ORDER BY r.res_periodoIn`;
            const parametros=[termo];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const hospedes = new Hospedes(registro.hosp_codigoH, registro.hosp_nome, registro.hosp_cpf);
                const reservas = new Reservas(registro.res_codigoRes, registro.res_periodoIn, registro.res_periodoFin, registro.res_quartosReservados, hospedes);
                listaReservas.push(reservas);
            }

        }
        else{
            const sql = `SELECT r.res_codigoRes, r.res_periodoIn, r.res_periodoFin, r.res_quartosReservados, h.hosp_codigoH, h.hosp_nome, h.hosp_cpf 
            FROM reservas r 
            INNER JOIN hospedes h ON r.hosp_codigoH = h.hosp_codigoH
            WHERE r.res_periodoIn like?
            ORDER BY r.res_periodoIn`;
            const parametros=['%'+termo+'%'];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const hospedes = new Hospedes(registro.hosp_codigoH, registro.hosp_nome, registro.hosp_cpf);
                const reservas = new Reservas(registro.res_codigoRes, registro.res_periodoIn, registro.res_periodoFin, registro.res_quartosReservados, hospedes);
                listaReservas.push(reservas);
            }
        }
        return listaReservas;
    }

}