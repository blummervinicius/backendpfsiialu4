import Cliente_reserva from "../Modelo/cliente_reserva.js";
import Cliente from "../Modelo/cliente.js";
import ReservasC from "../Modelo/reservasC.js";
import conectar from "./conexao.js";



export default class Cliente_ReservaDAO{
    async gravar(cliente_reserva){
        if (cliente_reserva instanceof Cliente_reserva){
            const sql = `INSERT INTO cliente_reserva(cli_codigoC, res_codigoR) VALUES (?,?)`
            const conexao = await conectar()
            const parametros = [cliente_reserva.codigoC, cliente_reserva.codigoR]
            await conexao.execute(sql, parametros)
            // for(let reservasC of cliente_reserva.cli_codigoC){
               
            //     // const retorno = await conexao.execute(sql, parametros)
            // }
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(cliente_reserva){
        if(cliente_reserva instanceof Cliente_reserva){
            const sql = `UPDATE cliente_reserva SET res_codigoR = ? WHERE cli_codigoC = ? AND cli_codigoR = ?`
            const parametros = [cliente_reserva.res_codigoR, cliente_reserva.cli_codigoC]
            const conexao = await conectar()
            await conexao.execute(sql, parametros)
            global.poolConexoes.releaseConnection(conexao)
        }
    }

    async consultar(consulta){
        let sql = '';
        let parametros = [];

        if(!isNaN(parseInt(consulta))){
            sql = `SELECT c.cli_codigoC, c.cli_nome, c.cli_cpf, r.res_codigoR, r.res_periodoIn, r.res_periodoFin, r.res_carroDescricao, r.res_carrosReservados, r.res_valor
            FROM cliente c
            INNER JOIN cliente_reserva cr ON cr.cli_codigoC = c.cli_codigoC
            INNER JOIN reservasC r ON r.res_codigoR = cr.res_codigoR
            WHERE c.cli_codigoC = ? 
            ORDER BY c.cli_nome DESC       
            `;
            parametros = [consulta];
        } else {
            if (!consulta){
                consulta = '';
            }
            sql = `SELECT c.cli_codigoC, c.cli_nome, c.cli_cpf, r.res_codigoR, r.res_periodoIn, r.res_periodoFin, r.res_carroDescricao, r.res_carrosReservados, r.res_valor
            FROM cliente c
            INNER JOIN cliente_reserva cr ON cr.cli_codigoC = c.cli_codigoC
            INNER JOIN reservasC r ON r.res_codigoR = cr.res_codigoR
            WHERE c.cli_nome LIKE ?
            ORDER BY c.cli_nome DESC
            `;
            parametros = ['%' + consulta + '%'];
        }

        const conexao = await conectar();
        const [registro] = await conexao.execute(sql, parametros);

        let listaCliente_reserva = []
        let cod = []
        let cliente_com_reserva = []

        for(const dado of registro){
            listaCliente_reserva.push(dado)
        }

        let reserva_cliente = []

        for(let i in listaCliente_reserva){

            if(!cod.includes(listaCliente_reserva[i].cli_codigoC)){
                let dados = consultarPorCodigo
                (listaCliente_reserva, listaCliente_reserva[i].cli_codigoC)
                

                for(let dado of dados){
                    let reservasC = new ReservasC(dado.res_codigoR, dado.res_periodoIn, dado.res_periodoFin, dado.res_carroDescricao, dado.res_carrosReservados, dado.res_valor)
                    reserva_cliente.push(reservasC)
                }

                const cliente_reserva = new Cliente(dados[0].cli_codigoC, dados[0].cli_nome, dados[0].cli_cpf, reserva_cliente)
                cliente_com_reserva.push(cliente_reserva)
                dados = []
                reserva_cliente = []
            }
            cod.push(listaCliente_reserva[i].codigoC)
        }
        function consultarPorCodigo(array_dados, codigoDesejado){
            return array_dados.filter(elemento => elemento.cli_codigoC === codigoDesejado);
        }
        return cliente_com_reserva
    }

    async excluir(cliente_reserva){
        if(cliente_reserva instanceof Cliente_reserva){
            const sql = `DELETE FROM cliente_reserva WHERE codigoC = ? AND codigoR = ?`

            const parametros = [cliente_reserva.codigoC, cliente_reserva.codigoR]
            const conexao = await conectar()
            await conexao.execute(sql,parametros)
            global.poolConexoes.releaseconnection(conexao)
        }
    }
}