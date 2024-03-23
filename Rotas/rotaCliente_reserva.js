import { Router } from "express";
import Cliente_ReservaCtrl from "../Controle/cliente_reservaCtrl.js";

const rotaClienteReserva = new Router()
const ClienteReserva = new Cliente_ReservaCtrl()

rotaClienteReserva

.post('/', ClienteReserva.gravar)
.put('/', ClienteReserva.atualizar)
.get('/', ClienteReserva.consultar)
.get('/:termo', ClienteReserva.consultar)
.delete('/', ClienteReserva.excluir)

export default rotaClienteReserva

