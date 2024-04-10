import { Router } from "express";
import ReservasCCtrl from "../Controle/reservasCCtrl.js";

const rotaReservasC = new Router();
const reCtrl = new ReservasCCtrl();


rotaReservasC
.get('/',reCtrl.consultar)
.get('/:termo',reCtrl.consultar)
.post('/',reCtrl.gravar)
.patch('/',reCtrl.atualizar)
.put('/',reCtrl.atualizar)
.delete('/',reCtrl.excluir)

export default rotaReservasC;