import { RepositorioAcciones } from "App/Dominio/Repositorios/RepositorioAcciones";
import { Accion } from "../Entidades/Accion";

export class ServicioAcciones {
    constructor(private repositorio: RepositorioAcciones) {
    }

    crearAccion(accion: Accion) {
        return this.repositorio.crearAccion(accion)
    }

    obtenerAcciones(): Promise<Accion[]> {
        return this.repositorio.obtenerAcciones()
    }

    obtenerAccionPorId(id: Number): Promise<Accion> {
        return this.repositorio.obtenerAccionPorId(id)
    }


    actualizarAccion(accion: Accion, id: number): Promise<void> {
        return this.repositorio.actualizarAccion(accion, id)
    }

}