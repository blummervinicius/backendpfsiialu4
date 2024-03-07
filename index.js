import express from 'express';
import cors from 'cors';
import rotaHospedes from './Rotas/rotaHospedes.js';
import rotaReservas from './Rotas/rotaReservas.js';
import rotaLogin from './Rotas/rotaLogin.js';
import dotenv from 'dotenv';
import session from 'express-session';
import { verificarAcesso } from './Segurança/autenticacao.js';

const host='0.0.0.0';
const porta='3000';

dotenv.config()

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SEGREDO,
    resave: false,
    saveUninitialized: true,
    maxAge: 1000 * 60 * 6
}))

app.use('/login',rotaLogin);
app.use('/hospedes',verificarAcesso, rotaHospedes);
app.use('/reservas',verificarAcesso, rotaReservas);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
