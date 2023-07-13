import { RepositorioModulos } from "App/Dominio/Repositorios/RepositorioModulos";
import { Modulo } from "../Entidades/Modulo";

export class ServicioModulos{

    constructor(private repositorio: RepositorioModulos){

    }

    crearModulo(modulo:Modulo){
        return this.repositorio.crearModulo(modulo)
    }
    obtenerModulos(){
        return this.repositorio.obtenerModulos()
    }
    obtenerModulosTodos(){
        return this.repositorio.obtenerModulosTodos()
    }
    actualizarModulo(modulo:Modulo, id:number){
        return this.repositorio.actualizarModulo(modulo, id)
    }
    obtenerModuloPorId(id:number){
        return this.repositorio.obtenerModuloPorId(id)
    }
}