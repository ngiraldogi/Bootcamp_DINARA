import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { CategoriaTablero } from 'App/Dominio/Datos/Entidades/CategoriaTablero';
import { TblTableros } from './Tableros';


export class TblCategoriasTableros extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({columnName:'cat_titulo'})
  public titulo: string;

  @column({columnName:'cat_iconapp'})
  public iconapp: string;

  @column({columnName:'cat_estado'})
  public estado: string;

  @hasMany(() => TblTableros, {
    localKey: 'id',
    foreignKey: 'categorias_id',
  })
  public tableros: HasMany<typeof TblTableros>;

  setCategoriaTableroDbFromCategoriaTablero(categoriaTablero: CategoriaTablero) {
    this.titulo = categoriaTablero.titulo
    this.id = categoriaTablero.id
    this.iconapp = categoriaTablero.iconapp
    return this
  }
}


