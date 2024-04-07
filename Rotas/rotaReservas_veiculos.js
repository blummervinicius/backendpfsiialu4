import { Router } from "express";
import Reservas_veiculosCtrl from "../Controle/reservas_veiculosCtrl.js";

const rotaReservasVeiculos = new Router()
const ReservasVeiculos = new Reservas_veiculosCtrl()

rotaReservasVeiculos

.post('/', ReservasVeiculos.gravar)
.put('/', ReservasVeiculos.atualizar)
.get('/', ReservasVeiculos.consultar)
.get('/:termo', ReservasVeiculos.consultar)
.delete('/', ReservasVeiculos.excluir)

export default rotaReservasVeiculos