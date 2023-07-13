import { RepositorioServicios } from "App/Dominio/Repositorios/RepositorioServicios";

export class ServicioServicios{

    constructor(private repositorio: RepositorioServicios){

    }

    buscar(dispositivo:string){
       return this.repositorio.buscar(dispositivo)
    }

    guardarInteraccion(servicio: number, dispositivo:string){
        return this.repositorio.guardarInteraccion(servicio, dispositivo)
     }

}