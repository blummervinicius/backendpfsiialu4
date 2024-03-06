import { Router } from "express";
import ReservasCtrl from "../Controle/reservasCtrl.js";

const resCtrl = new ReservasCtrl();
const rotaReservas = new Router();

rotaReservas
.get('/',resCtrl.consultar)
.get('/:termo',resCtrl.consultar)
.post('/',resCtrl.gravar)
.patch('/',resCtrl.atualizar)
.put('/',resCtrl.atualizar)
.delete('/',resCtrl.excluir);

export default rotaReservas;