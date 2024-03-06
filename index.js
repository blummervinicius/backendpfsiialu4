import express from 'express';
import cors from 'cors';
import rotaHospedes from './Rotas/rotaHospedes.js';
import rotaReservas from './Rotas/rotaReservas.js';


const host='0.0.0.0';
const porta='3000';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/hospedes',rotaHospedes);
app.use('/reservas',rotaReservas);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
