import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { Modulo } from 'App/Dominio/Datos/Entidades/Modulo';


export class TblModulos extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({columnName:'mod_nombre'})
  public nombre: string;

  @column({columnName:'mod_acciones'})
  public acciones: string;
  
  @column({columnName:'mod_name'})
  public name: string;
  
  @column({columnName:'mod_filename'})
  public filename: string;

  @column({columnName:'mod_tipo'})
  public tipo: string;
  
  @column({columnName:'mod_ruta'})
  public ruta: string;
  
  @column({columnName:'mod_estado'})
  public estado: boolean;
  
  @column({columnName:'mod_orden'})
  public orden: number;
  
  @column({columnName:'mod_tabla_modulo'})
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