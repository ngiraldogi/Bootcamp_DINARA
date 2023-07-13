import { Encuesta } from "../Datos/Entidades/Encuesta";
import { PreguntaEncuesta } from "../Datos/Entidades/PreguntaEncuesta";
import { RespuestaEncuesta } from "../Datos/Entidades/RespuestaEncuesta";

export interface RepositorioEncuestas {
    crearEncuesta(encuesta: Encuesta): Promise<number>
    crearPreguntaEncuesta(encuesta: PreguntaEncuesta): Promise<any>
    crearRespuestaEncuesta(respuesta: RespuestaEncuesta): Promise<any>
    crearRespuestasEncuesta(respuestas: RespuestaEncuesta[]): Promise<any>

    obtenerEncuestasPorCategoria(idCategoria:number) :Promise<Encuesta[]>
    obtenerEncuestas(): Promise<Encuesta[]>
    obtenerEncuestasTodas(): Promise<Encuesta[]>
    obtenerPreguntasEncuestas(): Promise<PreguntaEncuesta[]>
    obtenerEncuestaPorId(id: number): Promise<Encuesta>
    obtenerPreguntasPorEncuestaId(id: number): Promise<PreguntaEncuesta>
    obtenerRespuestaPorEncuestaId(id: number): Promise<RespuestaEncuesta[]>

    actualizarEncuesta(encuesta: Encuesta, id:number): Promise<void>
    cambiarOrdenEncuesta(idEncuesta:number, orden:number);
    filtrarEncuestas(datos: any): Promise<any>
}