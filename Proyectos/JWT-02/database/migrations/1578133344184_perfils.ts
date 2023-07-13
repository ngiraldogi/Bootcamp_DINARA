import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Perfils extends BaseSchema {
  protected tableName = 'perfils'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_perfil').primary()
      table.string('nombre_perfil', 80).notNullable().unique()
      table.timestamps(false) 
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
