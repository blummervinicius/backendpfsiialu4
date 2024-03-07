import { Router } from "express";
import ReservasCCtrl from "../Controle/reservasCCtrl.js";

const reCtrl = new ReservasCCtrl();
const rotaReservasC = new Router();

rotaReservasC
.get('/',reCtrl.consultar)
.get('/:termo',reCtrl.consultar)
.post('/',reCtrl.gravar)
.patch('/',reCtrl.atualizar)
.put('/',reCtrl.atualizar)
.delete('/',reCtrl.excluir)

export default rotaReservasC;