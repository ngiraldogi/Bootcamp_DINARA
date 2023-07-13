import { Exception } from '@adonisjs/core/build/standalone';
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
                    enc_titulo: encuesta.titulo,
                    enc_fecha: encuesta.fecha,
                    enc_estado:encuesta.estado,
                    enc_iconapp:encuesta.iconapp
                })
            return new Respuesta().retorno()
        } catch (error) {
            return new Respuesta("Encuestas").retorno()
        }
    }

    async crearEncuesta(encuesta: Encuesta): Promise<any> {
        console.log(encuesta)
        var entity = new TblEncuestas()
        entity.setEncuestaDbFromEncuesta(encuesta)
        console.log(entity)
        try {
            await entity.save()
            return new Respuesta().retorno()
        } catch (error) {            
            return new Respuesta("Encuestas").retorno()
        }
    }

    async obtenerEncuestas(): Promise<any> {
        try {
            let encuestasArray: any = []
            var Encuestas = await Database.from(this.tabla).select('*').where('enc_estado', true)
            Encuestas.forEach(element => {
                encuestasArray.push({                  
                    "id": element.id,
                    "titulo": element.enc_titulo,
                    "fecha": element.fecha,
                    "estado": element.enc_estado,
                    "orden": element.enc_orden,
                    "categoria_id": element.enc_categoria_id,
                    "iconapp":element.enc_iconapp
                })
            });
            return encuestasArray;
        } catch (error) {
            return new Respuesta("Encuestas").retorno()
        }
    }

    async obtenerEncuestasTodas(): Promise<any> {
        try {
            let encuestasArray: any = []
            var Encuestas = await Database.from(this.tabla).select('*')
            Encuestas.forEach(element => {
                encuestasArray.push({                  
                    "id": element.id,
                    "titulo": element.enc_titulo,
                    "fecha": element.fecha,
                    "estado": element.enc_estado,
                    "orden": element.enc_orden,
                    "categoria_id": element.enc_categoria_id,
                    "iconapp":element.enc_iconapp
                })
            });
            return encuestasArray;
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
        let preguntasArray: any = []
        var encuestas = await Database.from("tbl_preguntas_encuestas").select('*').where('pre_encuesta_id', id)
       /* for (const key in encuestas) {
            encuestas[key].listavalores = JSON.parse(encuestas[key].listavalores)
        }*/
        encuestas.forEach(element => {
            preguntasArray.push({     

               "id" : element.id,
               "encuesta_id": element.pre_encuesta_id,
               "nombre": element.pre_nombre,
               "tipo": element.pre_tipo,
               "tipodato": element.pre_tipodato,
               "valorminimo": element.pre_valorminimo,
               "valormaximo": element.pre_valormaximo,
               "obligatorio": element.pre_obligatorio,
               "listavalores": element.pre_listavalores,
               "fecha": element.fecha  
            })
        });
        return preguntasArray
    }

    async crearRespuestaEncuesta(respuesta: RespuestaEncuesta): Promise<any> {
        console.log(respuesta)
        var entidadRespuesta = new TblRespuestasEncuestas()
        entidadRespuesta.setRespuestaDbFromRespuesta(respuesta)
        try {
            await entidadRespuesta.save()
            return new Respuesta().retorno()
        } catch (error) {  
            console.log(error)
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
            return new Respuesta("Respuesta Encuestas").retorno()
        }
    }
    async obtenerRespuestaPorEncuestaId(id: number): Promise<RespuestaEncuesta[]> {
        var respuestas = await Database.from("tbl_respuestas_encuestas").select('*').where('res_id_encuesta', id)
        let respuestasArray: any = []
        respuestas.forEach(element => {
            respuestasArray.push({     

                "id": element.id,
                "valor": element.res_valor,
                "id_encuesta": element.res_id_encuesta,
                "id_pregunta": element.res_id_pregunta
            })
        });
        return respuestasArray

    }

    public async obtenerEncuestasPorCategoria(idCategoria: number): Promise<Encuesta[]> {
        let encuestasDb = await TblEncuestas.query().select('*').where('enc_categoria_id','=', idCategoria).orderBy('enc_orden', 'asc')
        let encuestas = encuestasDb.map(encuestasDb=>{
            return encuestasDb.setEncuestaFromEncuestaDb()
        })
        return encuestas
    }

    public async cambiarOrdenEncuesta(idEncuesta: number, orden: number):Promise<boolean> {
        let encuestaDb = await TblEncuestas.find(idEncuesta)
        if(!encuestaDb){
            throw new Exception(`No sé encontró la encuesta con id: ${idEncuesta}`)
        }
        encuestaDb.orden = orden
        await encuestaDb.save()
        return true
    }

    async filtrarEncuestas(datos: any): Promise<any> {
        try {
            var Encuestas = await Database.from(this.tabla).select('*').where('enc_titulo', 'iLike', '%'+datos.nombre+'%')
            let encuestasArray: any = []
            Encuestas.forEach(element => {
                encuestasArray.push({     
    
                    "id": element.id,
                    "titulo": element.enc_titulo,
                    "fecha": element.fecha,
                    "estado": element.enc_estado,
                    "orden": element.enc_orden,
                    "categoria_id": element.enc_categoria_id,
                    "iconapp":element.enc_iconapp
                })
            });
            return encuestasArray

        } catch (error) {
            return new Respuesta("Encuestas").retorno()
        }
    }

}