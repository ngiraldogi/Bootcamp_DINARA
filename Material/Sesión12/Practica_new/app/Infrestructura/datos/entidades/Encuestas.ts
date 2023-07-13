import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { Encuesta } from 'App/Dominio/Datos/Entidades/Encuesta';
import { PreguntaEncuesta } from 'App/Dominio/Datos/Entidades/PreguntaEncuesta';
import { RespuestaEncuesta } from 'App/Dominio/Datos/Entidades/RespuestaEncuesta';
import { DateTime } from 'luxon';


export class TblEncuestas extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({columnName:'enc_titulo'})
  public titulo: string;

  @column({columnName:'enc_orden'})
  public orden: number;

  @column({columnName: 'enc_categoria_id', serializeAs: null})
  public categoriaId: number;

  @column({columnName:'enc_iconapp'})
    public iconapp: string;

  @column({columnName:'enc_estado'})
  public estado: boolean;

  @column.dateTime({ autoCreate: true, columnName:'enc_fecha' })
  public fecha: DateTime;

  setEncuestaDbFromEncuesta(modulo: Encuesta) {
    this.titulo = modulo.titulo
    this.orden = modulo.orden
    this.categoriaId = modulo.categoriaId
    this.estado = modulo.estado
    this.iconapp = modulo.iconapp
  }
  setEncuestaFromEncuestaDb():Encuesta {
    let encuesta = new Encuesta()
    encuesta.id = this.id
    encuesta.titulo = this.titulo 
    encuesta.orden = this.orden 
    encuesta.categoriaId = this.categoriaId 
    encuesta.estado = this.estado
    encuesta.iconapp = this.iconapp
    return encuesta
  }
}

export class TblPreguntasEncuestas extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column({columnName:'pre_titulo'})
  public titulo: string;
  @column({columnName:'pre_encuesta_id'})
  public encuesta_id: number;
  @column({columnName:'pre_nombre'})
  public nombre: string;
  @column({columnName:'pre_tipo'})
  public tipo: string;
  @column({columnName:'pre_tipodato'})
  public tipodato: string;
  @column({columnName:'pre_valorminimo'})
  public valorminimo: number;
  @column({columnName:'pre_valormaximo'})
  public valormaximo: number;
  @column({columnName:'pre_obligatorio'})
  public obligatorio: boolean;
  @column({columnName:'pre_listavalores'})
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

  @column({columnName:'res_id_pregunta'})
  public id_pregunta: number;

  @column({columnName:'res_id_encuesta'})
  public id_encuesta: number;

  @column({columnName:'res_valor'})
  public valor: string;

  setRespuestaDbFromRespuesta(respuesta: RespuestaEncuesta) {
    this.id = respuesta.id
    this.id_pregunta = respuesta.id_pregunta
    this.id_encuesta = respuesta.id_encuesta
    this.valor = respuesta.valor
  }
}