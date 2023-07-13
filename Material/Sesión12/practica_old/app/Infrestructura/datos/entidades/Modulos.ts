import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { Modulo } from 'App/Dominio/Datos/Entidades/Modulo';


export class TblModulos extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string;

  @column()
  public acciones: string;
  
  @column()
  public name: string;
  
  @column()
  public filename: string;

  @column()
  public tipo: string;
  
  @column()
  public ruta: string;
  
  @column()
  public estado: boolean;
  
  @column()
  public orden: number;
  
  @column()
  public tabla_modulo: string;

  setModuloDbFromModulo(modulo:Modulo){
    this.nombre = modulo.nombre
    this.acciones = modulo.acciones.toString()
    this.name = modulo.name
    this.filename = modulo.filename
    this.tipo = modulo.tipo
    this.ruta = modulo.ruta
    this.estado = modulo.estado
    this.orden = modulo.orden
    this.tabla_modulo = modulo.tabla_modulo 

  }

  
}