import ReservasC from '../Modelo/reservasC.js';
import Cliente_reserva from '../Modelo/cliente_reserva.js';
import Cliente from '../Modelo/cliente.js';
import conectar from './conexao.js';

export default class ReservasCDAO {

    async gravar(reservasC) {
        if (reservasC instanceof ReservasC) {
            const sql = `INSERT INTO reservasC(res_periodoIn, res_periodoFin, res_carroDescricao, res_carrosReservados, res_valor) VALUES(?,?,?,?,?)`;
            const parametros = [reservasC.periodoIn, reservasC.periodoFin, reservasC.carroDescricao, reservasC.carrosReservados, reservasC.valor];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            reservasC.codigoR = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);

            // Gravar a associação cliente_reserva
            if (reservasC instanceof Cliente_reserva) {
                const sqlClienteReserva = `INSERT INTO cliente_reserva(cli_codigoC, res_codigoR) VALUES(?, ?)`;
                const parametrosClienteReserva = [reservasC.cliente.cli_codigoC, reservasC.codigoR];
                const retornoClienteReserva = await conexao.execute(sqlClienteReserva, parametrosClienteReserva);
                global.poolConexoes.releaseConnection(conexao);
            }
        }
    }

    async atualizar(reservasC) {
        if (reservasC instanceof ReservasC) {
            const sql = `UPDATE reservasC SET res_periodoIn = ?, res_periodoFin = ?, res_carroDescricao = ?, res_carrosReservados = ?, res_valor = ? WHERE res_codigoR = ?`;
            const parametros = [reservasC.periodoIn, reservasC.periodoFin, reservasC.carroDescricao, reservasC.carrosReservados, reservasC.valor, reservasC.codigoR];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);

            // Atualizar a associação cliente_reserva

            // if (reservasC.cliente instanceof Cliente_reserva) {
            //     const sqlClienteReserva = `UPDATE cliente_reserva SET cli_codigoC = ? WHERE res_codigoR = ?`;
            //     const parametrosClienteReserva = [reservasC.cliente.cli_codigoC, reservasC.res_codigoR];
            //     await conexao.execute(sqlClienteReserva, parametrosClienteReserva);
            //     global.poolConexoes.releaseConnection(conexao);
            // }
        }
    }

    async excluir(reservasC) {
        if (reservasC instanceof ReservasC) {
            const sql = `DELETE FROM reservasC WHERE res_codigoR = ?`;
            const parametros = [reservasC.codigoR];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);

            // Excluir a associação cliente_reserva
            const sqlClienteReserva = `DELETE FROM cliente_reserva WHERE res_codigoR = ?`;
            await conexao.execute(sqlClienteReserva, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        if (!termo) {
            termo = "";
        }
        const conexao = await conectar();
        let listaReservasC = [];
        const sql = `SELECT r.res_codigoR, r.res_periodoIn, r.res_periodoFin, r.res_carroDescricao, r.res_carrosReservados, r.res_valor, c.cli_codigoC, c.cli_nome, c.cli_cpf 
        FROM reservasC r 
        INNER JOIN cliente_reserva cr ON cr.res_codigoR = r.res_codigoR 
        INNER JOIN cliente c ON cr.cli_codigoC = c.cli_codigoC 
        WHERE r.res_codigoR
        ORDER BY c.cli_nome DESC`;

        const parametros = [termo, '%' + termo + '%'];
        const [registros, campos] = await conexao.execute(sql, parametros);
        for (const registro of registros) {
            const cliente = new Cliente_reserva(registro.cli_codigoC, registro.cli_nome, registro.cli_cpf);
            const reservasC = new ReservasC(registro.res_codigoR, registro.res_periodoIn, registro.res_periodoFin, registro.res_carroDescricao, registro.res_carrosReservados, registro.res_valor, cliente);
            listaReservasC.push(reservasC);
        }

        global.poolConexoes.releaseConnection(conexao);
        return listaReservasC;
    }
}