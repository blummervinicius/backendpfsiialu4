import { Router } from "express";
import Reservas_veiculosCtrl from "../Controle/reservas_veiculosCtrl.js";

const rotaReservasVeiculos = new Router()
const ReservasVeiculos = new Reservas_veiculosCtrl()

rotaReservasVeiculos
.get('/',ReservasVeiculos.consultar)
.get('/:termo',ReservasVeiculos.consultar)
.post('/',ReservasVeiculos.gravar)
.patch('/',ReservasVeiculos.atualizar)
.put('/',ReservasVeiculos.atualizar)
.delete('/',ReservasVeiculos.excluir)

export default rotaReservasVeiculos;