import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CategoriasTableros extends BaseSchema {
  protected tableName = 'tbl_categorias_tableros'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('cat_titulo', 255).notNullable()
      table.string('cat_iconapp', 255).notNullable()
      table.boolean('cat_estado').defaultTo(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
