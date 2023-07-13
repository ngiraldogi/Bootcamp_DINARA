import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { Tablero } from 'App/Dominio/Datos/Entidades/Tablero';

export class TblTableros extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string;

  @column()
  public descripcion: string;

  @column()
  public iconoapp: string;

  @column()
  public categorias_id: number;
  
  @column()
  public linktablero: string;

  setTablerosDbFromTablero(tablero: Tablero) {
    this.nombre = tablero.nombre
    this.descripcion = tablero.descripcion
    this.iconoapp = tablero.iconoapp
    this.linktablero = tablero.linktablero
  }
  setCategoria(categoria: number){
    this.categorias_id = categoria
  }
}


