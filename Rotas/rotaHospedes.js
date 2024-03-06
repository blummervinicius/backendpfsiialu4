import { Router } from "express";
import HospedesCtrl from "../Controle/hospedesCtrl.js";

const hosCtrl = new HospedesCtrl();
const rotaHospedes = new Router();

rotaHospedes
.get('/',hosCtrl.consultar)
.get('/:termo',hosCtrl.consultar)
.post('/',hosCtrl.gravar)
.patch('/',hosCtrl.atualizar)
.put('/',hosCtrl.atualizar)
.delete('/',hosCtrl.excluir);

export default rotaHospedes;