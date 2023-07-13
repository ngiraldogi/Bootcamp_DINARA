import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Usuarios extends BaseSchema {
  protected tableName = 'usuarios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_usuario').primary()
      table.integer('tipo_documento').references('id_tipo_doc').inTable('tipo_documentos').notNullable()
      table.string('numero_documento', 30).notNullable().unique()
      table.string('nombres_usuario', 180).notNullable()
      table.string('correo', 250).notNullable().unique()
      table.string('contrasena', 255).notNullable()
      table.string('telefono', 30)
      table.string('direccion', 80)
      table.integer('perfil').references('id_perfil').inTable('perfils')
      table.timestamps(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
