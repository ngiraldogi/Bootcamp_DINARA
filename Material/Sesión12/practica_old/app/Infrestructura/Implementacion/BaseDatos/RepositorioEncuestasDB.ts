import Database from '@ioc:Adonis/Lucid/Database'
import { Encuesta } from 'App/Dominio/Datos/Entidades/Encuesta';
import { PreguntaEncuesta } from 'App/Dominio/Datos/Entidades/PreguntaEncuesta';
import { RespuestaEncuesta } from 'App/Dominio/Datos/Entidades/RespuestaEncuesta';
import { TblEncuestas, TblPreguntasEncuestas, TblRespuestasEncuestas } from 'App/Infrestructura/datos/entidades/Encuestas';
import { Respuesta } from 'App/Infrestructura/datos/respuestas/Respuesta';
import { RepositorioEncuestas } from "../../../Dominio/Repositorios/RepositorioEncuestas";


export class RepositorioEncuestasDb implements RepositorioEncuestas {

    private tabla = 'tbl_encuestas'
    async actualizarEncuesta(encuesta: Encuesta, id: number): Promise<any> {
        try {
            await TblEncuestas
                .query()
                .where('id', id)
                .update({
                    titulo: encuesta.titulo,
                    fecha: encuesta.fecha,
                })
            return new Respuesta().retorno()
        } catch (error) {
            return new Respuesta("Encuestas").retorno()
        }
    }

    async crearEncuesta(encuesta: Encuesta): Promise<any> {
        var entity = new TblEncuestas()
        entity.setEncuestaDbFromEncuesta(encuesta)
        try {
            await entity.save()
            return new Respuesta().retorno()
        } catch (error) {
            return new Respuesta("Encuestas").retorno()
        }
    }

    async obtenerEncuestas(): Promise<any> {
        try {
            var Encuestas = await Database.from(this.tabla).select('*')
            return Encuestas;
        } catch (error) {
            return new Respuesta("Encuestas").retorno()
        }
    }

    async obtenerEncuestaPorId(id: Number): Promise<any> {
        var Encuestas = await TblEncuestas.find(id)
        return Encuestas
    }

    async crearPreguntaEncuesta(encuesta: PreguntaEncuesta): Promise<any> {
        var entity = new TblPreguntasEncuestas()
        entity.setPreguntaDbFromPregunta(encuesta)
        try {
            await entity.save()
            return new Respuesta().retorno()
        } catch (error) {
            return new Respuesta("Encuestas").retorno()
        }
    }

    obtenerPreguntasEncuestas(): Promise<PreguntaEncuesta[]> {
        throw 1
    }

    async obtenerPreguntasPorEncuestaId(id: number): Promise<any> {
        var encuestas = await Database.from("tbl_preguntas_encuestas").select('*').where('encuesta_id', id)
        for (const key in encuestas) {
            encuestas[key].listavalores = JSON.parse(encuestas[key].listavalores)
        }
        return encuestas
    }

    async crearRespuestaEncuesta(respuesta: RespuestaEncuesta): Promise<any> {
        var entidadRespuesta = new TblRespuestasEncuestas()
        entidadRespuesta.setRespuestaDbFromRespuesta(respuesta)
        try {
            await entidadRespuesta.save()
            return new Respuesta().retorno()
        } catch (error) {  
            return new Respuesta("Respuesta Encuestas").retorno()
        }
    }
    async crearRespuestasEncuesta(respuestas: RespuestaEncuesta[]): Promise<any> {
        try {
            for (const key in respuestas) {
                var entity = new TblRespuestasEncuestas()
                entity.setRespuestaDbFromRespuesta(respuestas[key])
                await entity.save()
                return new Respuesta().retorno()
            }
        } catch (error) {
            return error
            return new Respuesta("Respuesta Encuestas").retorno()
        }
    }
    async obtenerRespuestaPorEncuestaId(id: number): Promise<RespuestaEncuesta[]> {
        var respuestas = await Database.from("tbl_respuestas_encuestas").select('*').where('id_encuesta', id)
        return respuestas
    }

}