import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { Encuesta } from 'App/Dominio/Datos/Entidades/Encuesta';
import { PreguntaEncuesta } from 'App/Dominio/Datos/Entidades/PreguntaEncuesta';
import { RespuestaEncuesta } from 'App/Dominio/Datos/Entidades/RespuestaEncuesta';
import { DateTime } from 'luxon';


export class TblEncuestas extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public titulo: string;

  @column.dateTime({ autoCreate: true })
  public fecha: DateTime;

  setEncuestaDbFromEncuesta(modulo: Encuesta) {
    this.titulo = modulo.titulo
  }
}

export class TblPreguntasEncuestas extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public titulo: string;
  @column()
  public encuesta_id: number;
  @column()
  public nombre: string;
  @column()
  public tipo: string;
  @column()
  public tipodato: string;
  @column()
  public valorminimo: number;
  @column()
  public valormaximo: number;
  @column()
  public obligatorio: boolean;
  @column()
  public listavalores: string;

  setPreguntaDbFromPregunta(pregunta: PreguntaEncuesta) {
    this.encuesta_id = pregunta.encuesta_id
    this.nombre = pregunta.nombre
    this.tipo = pregunta.tipo
    this.tipodato = pregunta.tipodato
    this.valorminimo = pregunta.valorminimo
    this.valormaximo = pregunta.valormaximo
    this.obligatorio = pregunta.obligatorio
    this.listavalores = JSON.stringify(pregunta.listavalores);
  }
}

export class TblRespuestasEncuestas extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public id_pregunta: number;

  @column()
  public id_encuesta: number;

  @column()
  public valor: string;

  setRespuestaDbFromRespuesta(respuesta: RespuestaEncuesta) {
    this.id = respuesta.id
    this.id_pregunta = respuesta.id_pregunta
    this.id_encuesta = respuesta.id_encuesta
    this.valor = respuesta.valor
  }
}