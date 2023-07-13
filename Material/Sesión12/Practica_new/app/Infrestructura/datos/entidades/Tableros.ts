import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { Tablero } from 'App/Dominio/Datos/Entidades/Tablero';

export class TblTableros extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({columnName:'tab_nombre'})
  public nombre: string;

  @column({columnName:'tab_descripcion'})
  public descripcion: string;

  @column({columnName:'tab_iconoapp'})
  public iconoapp: string;

  @column({columnName:'tab_categorias_id'})
  public categorias_id: number;
  
  @column({columnName:'tab_linktablero'})
  public linktablero: string;

  @column({columnName:'tab_estado'})
  public estado: boolean;

  setTablerosDbFromTablero(tablero: Tablero) {
    this.nombre = tablero.nombre
    this.descripcion = tablero.descripcion
    this.iconoapp = tablero.iconoapp
    this.linktablero = tablero.linktablero
    this.estado = tablero.estado
  }
  setCategoria(categoria: number){
    this.categorias_id = categoria
  }
}


