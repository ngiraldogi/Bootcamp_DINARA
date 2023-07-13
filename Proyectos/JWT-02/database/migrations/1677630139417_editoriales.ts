import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Editorials extends BaseSchema {
  protected tableName = 'editoriales'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_editorial').primary()
      table.string('nombre_editorial', 200).notNullable().unique()
      table.timestamps(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
