import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne, hasMany, HasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Perfil from './Perfil' /*importamos el modelo Perfil (o sino sale error)*/
import Publicaciones from './Publicacione' /*importamos el modelo Publicaciones*/
import Grupo from './Grupo' /*importamos el modelo Grupo*/

export default class Usuario extends BaseModel {
  static save() {
      throw new Error('Method not implemented.')
  }
  @column({ isPrimary: true }) public codigo_usuario: number
  @column() public nombre_usuario: string
  @column() public contrasena: string
  @column() public email: string
  @column() public telefono: string
  
  /*relacion de 1:1 con Perfil*/
  @hasOne(() => Perfil, {
    localKey: 'codigo_usuario',
    foreignKey: 'codigo_usuario'
  })
  public perfil: HasOne<typeof Perfil>

  /*relacion de 1:n con Publicaciones*/
  @hasMany(() => Publicaciones, {
    localKey: 'codigo_usuario',
    foreignKey: 'codigo_usuario'
  })
  public publicaciones: HasMany<typeof Publicaciones>

  /*relacion de n:m con Grupo*/
  @manyToMany(() => Grupo, {
    localKey: 'codigo_usuario', /*llave primaria de la tabla usuarios*/
    pivotForeignKey: 'codigo_usuario', /*llave foranea de la nueva tabla [usuario_grupo] */
    relatedKey: 'codigo_grupo', /*llave primaria de la tabla grupos*/
    pivotRelatedForeignKey: 'codigo_grupo', /*llave foranea de la nueva tabla [usuario_grupo] */
    pivotTable: 'usuario_grupo' /*nombre de la nueva tabla N:M*/
  })
  public usuario_grupos: ManyToMany<typeof Grupo>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}