import { Calificacion } from "../Datos/Entidades/Calificacion";

export interface RepositorioCalificaciones{
    guardarCalificacion(calificacion:Calificacion):Promise<Calificacion>
    obtenerCalificaciones(pagina:number, limite:number):Promise<Calificacion[]>
}