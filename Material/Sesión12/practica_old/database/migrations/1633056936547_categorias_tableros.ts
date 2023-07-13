import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CategoriasTableros extends BaseSchema {
  protected tableName = 'tbl_categorias_tableros'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('titulo', 255).notNullable()
      table.string('iconapp', 255).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
