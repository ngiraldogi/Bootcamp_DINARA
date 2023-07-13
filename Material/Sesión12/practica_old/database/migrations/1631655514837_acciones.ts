import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Acciones extends BaseSchema {
  protected tableName = 'tbl_acciones'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre', 255).notNullable()
      table.string('name', 255).notNullable()
      table.string('filename').notNullable()
      table.boolean('estado').defaultTo('true')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}