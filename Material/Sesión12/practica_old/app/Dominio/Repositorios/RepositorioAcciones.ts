import { Accion } from "../Datos/Entidades/Accion";

export interface RepositorioAcciones {
    crearAccion(accion: Accion): Promise<Number>
    obtenerAcciones(): Promise<Accion[]>
    obtenerAccionPorId(id: Number): Promise<Accion>
    actualizarAccion(accion: Accion, id:number): Promise<void>
}