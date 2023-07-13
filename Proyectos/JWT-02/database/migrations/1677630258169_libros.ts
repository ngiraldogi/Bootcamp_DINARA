import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Libros extends BaseSchema {
  protected tableName = 'libros'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_libro')
      table.string('titulo', 200).notNullable().unique()
      table.string('isbn', 40).notNullable().unique()
      table.integer('id_editorial').references('id_editorial').inTable('editoriales').notNullable()
      table.integer('id_autor').references('id_autor').inTable('autores').notNullable()
      table.integer('id_usuario')
      table.timestamps(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
