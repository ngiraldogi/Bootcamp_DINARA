import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tableros extends BaseSchema {
  protected tableName = 'tbl_tableros'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('nombre').notNullable()
      table.string('descripcion')
      table.string('iconoapp').notNullable()
      table.string('linktablero').notNullable()
      table.integer('categorias_id').notNullable()
      table.boolean('estado')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }

}
