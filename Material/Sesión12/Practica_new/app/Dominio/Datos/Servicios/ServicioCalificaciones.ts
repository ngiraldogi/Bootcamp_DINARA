import { RepositorioCalificaciones } from "App/Dominio/Repositorios/RepositorioCalificaciones";
import { Calificacion } from "../Entidades/Calificacion";

export class ServicioCalificaciones{
    private repositorio:RepositorioCalificaciones
    public constructor(repositorio:RepositorioCalificaciones){
        this.repositorio = repositorio
    }

    public guardarCalificacion(
        estrellas:number, 
        queTeGusta?:string, 
        queNoTeGusta?:string,
        queTeGustaria?:string,
        idDispositivo?:string,
        idUsuario?:string
    ):Promise<Calificacion>{
        const calificacion = new Calificacion()
        calificacion.calificacion = estrellas
        calificacion.queTeGusta = queTeGusta
        calificacion.queNoTeGusta = queNoTeGusta
        calificacion.queTeGustaria = queTeGustaria
        calificacion.idDispositivo = idDispositivo
        calificacion.idUsuario = idUsuario

        return this.repositorio.guardarCalificacion(calificacion)
    }

    public obtenerCalificaciones(pagina:number, limite:number){
        return this.repositorio.obtenerCalificaciones(pagina, limite)
    }
}