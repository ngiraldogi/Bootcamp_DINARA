import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Modulos extends BaseSchema {
  protected tableName = 'tbl_modulos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('nombre').notNullable()
      table.string('acciones').notNullable()
      table.string('name').notNullable()
      table.string('filename').notNullable()
      table.string('tipo').notNullable()
      table.string('ruta').notNullable()
      table.boolean('estado').notNullable()
      table.integer('orden').notNullable()
      table.string('tabla_modulo').notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
