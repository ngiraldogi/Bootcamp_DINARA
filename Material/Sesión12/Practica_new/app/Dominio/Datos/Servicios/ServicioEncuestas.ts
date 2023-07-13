import { RepositorioEncuestas } from "App/Dominio/Repositorios/RepositorioEncuestas";
import { Encuesta } from "../Entidades/Encuesta";
import { PreguntaEncuesta } from "../Entidades/PreguntaEncuesta";
import { RespuestaEncuesta } from "../Entidades/RespuestaEncuesta";

export class ServicioEncuestas {
    constructor(private repositorio: RepositorioEncuestas) {
    }

    crearEncuestas(encuesta: Encuesta) {
        return this.repositorio.crearEncuesta(encuesta)
    }

    crearPreguntaEncuesta(encuesta: PreguntaEncuesta) {
        return this.repositorio.crearPreguntaEncuesta(encuesta)
    }


    crearRespuestaEncuesta(respuesta: RespuestaEncuesta) {
        return this.repositorio.crearRespuestaEncuesta(respuesta)
    }

    crearRespuestasEncuesta(respuestas: RespuestaEncuesta[]) {
        return this.repositorio.crearRespuestasEncuesta(respuestas)
    }

    obtenerEncuestas(): Promise<Encuesta[]> {
        return this.repositorio.obtenerEncuestas()
    }

    obtenerEncuestasTodas(): Promise<Encuesta[]> {
        return this.repositorio.obtenerEncuestasTodas()
    }

    obtenerPreguntasEncuestas(): Promise<PreguntaEncuesta[]> {
        return this.repositorio.obtenerPreguntasEncuestas()
    }

    obtenerEncuestaPorId(id: number): Promise<Encuesta> {
        return this.repositorio.obtenerEncuestaPorId(id)
    }

    obtenerPreguntasPorEncuestaId(id: number): Promise<PreguntaEncuesta> {
        return this.repositorio.obtenerPreguntasPorEncuestaId(id)
    }

    obtenerRespuestasPorEncuestaId(id: number): Promise<RespuestaEncuesta[]> {
        return this.repositorio.obtenerRespuestaPorEncuestaId(id)
    }

    actualizarEncuestas(encuesta: Encuesta, id: number): Promise<any> {
        return this.repositorio.actualizarEncuesta(encuesta,id)
    }

    obtenerEncuestasPorCategoria(idCategoria:number): Promise<Encuesta[]>{
        return this.repositorio.obtenerEncuestasPorCategoria(idCategoria)
    }

    cambiarOrdenEncuesta(idEncuesta:number, orden:number): Promise<boolean>{
        return this.repositorio.cambiarOrdenEncuesta(idEncuesta, orden)
    }

    filtrarEncuestas( datos: any){
        return this.repositorio.filtrarEncuestas(datos);
    }

}