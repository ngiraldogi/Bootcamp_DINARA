import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { Accion } from 'App/Dominio/Datos/Entidades/Accion';

export class TblAcciones extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string;

  @column()
  public name: string;
  
  @column()
  public filename: string;

  @column()
  public estado: boolean;

  setAccionDbFromAccion(accion:Accion){
    this.name =accion.name
    this.nombre = accion.nombre
    this.estado = accion.estado
    this.filename = accion.filename
    return this
  }
}


