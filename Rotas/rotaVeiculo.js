import { Router } from "express";
import VeiculoCtrl from "../Controle/veiculoCtrl.js";


const veiCtrl = new VeiculoCtrl();
const rotaVeiculo = new Router();

rotaVeiculo
.get('/', veiCtrl.consultar)
.get('/:termo', veiCtrl.consultar)
.post('/', veiCtrl.gravar)
.patch('/', veiCtrl.atualizar)
.put('/', veiCtrl.atualizar)
.delete('/', veiCtrl.excluir)

export default rotaVeiculo;