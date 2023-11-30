import { Cliente } from "./cliente"
import { Conductor } from "./conductor"
import { Rutas } from "./rutas"
import { Trailer } from "./trailer"
import { Vehiculo } from "./vehiculo"

export class PlannerInfo {
    placa?: Vehiculo
    arrastre?: Trailer
    cliente?: Cliente
    ruta?: Rutas
    fecha?: Date
    conductor?: Conductor
    duracion?: number
    fin?: Date
    estatus?: string
    dateCreated?: Date
}