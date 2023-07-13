import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { CategoriaTablero } from 'App/Dominio/Datos/Entidades/CategoriaTablero';
import { TblTableros } from './Tableros';


export class TblCategoriasTableros extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public titulo: string;

  @column()
  public iconapp: string;

  @hasMany(() => TblTableros, {
    localKey: 'id',
    foreignKey: 'categoria_id',
  })
  public categoria_id: HasMany<typeof TblTableros>;

  setCategoriaTableroDbFromCategoriaTablero(categoriaTablero: CategoriaTablero) {
    this.titulo = categoriaTablero.titulo
    this.id = categoriaTablero.id
    this.iconapp = categoriaTablero.iconapp
    return this
  }
}


