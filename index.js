import express from 'express';
import cors from 'cors';
import rotaCliente from    './Rotas/rotaCliente.js';
import rotaReservasC from './Rotas/rotaReservasC.js';
import rotaVeiculo from './Rotas/rotaVeiculo.js';
import rotaLogin from './Rotas/rotaLogin.js';
import dotenv from 'dotenv';
import session from 'express-session';
import { verificarAcesso } from './Segurança/autenticacao.js';
import rotaReservasVeiculos from './Rotas/rotaReservas_veiculos.js';

const host='localhost';
const porta='4000';

dotenv.config()

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(session({
//     secret: process.env.SEGREDO,
//     resave: false,
//     saveUninitialized: true,
//     maxAge: 1000 * 60 * 6
// }))

app.use('/login',rotaLogin);
app.use('/cliente', rotaCliente);
app.use('/reservasC', rotaReservasC);
app.use('/veiculo', rotaVeiculo);
app.use('/reservas_veiculos', rotaReservasVeiculos);
//app.use('/cliente_reserva', rotaClienteReserva);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
