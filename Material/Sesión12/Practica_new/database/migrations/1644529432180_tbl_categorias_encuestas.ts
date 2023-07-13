import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TblCategoriasEncuestas extends BaseSchema {
  protected tableName = 'tbl_categorias_encuestas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('cat_nombre')
      table.boolean('cat_estado')
      table.timestamp('cat_creado', { useTz: true }).defaultTo(this.now())
      table.timestamp('cat_modificado', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
