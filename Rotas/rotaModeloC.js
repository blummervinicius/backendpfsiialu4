import { Router } from "express";
import ModeloCCtrl from "../Controle/modeloCCtrl.js";

const rotaModeloC = new Router();
const modeloCCtrl = new ModeloCCtrl();

rotaModeloC
.get('/:termo', modeloCCtrl.consultar)
.post('/', modeloCCtrl.gravar)
//.patch('/', modeloCCtrl.atualizar)
//.put('/', modeloCCtrl.atualizar)
//.delete('/', modeloCCtrl.excluir)

export default rotaModeloC;