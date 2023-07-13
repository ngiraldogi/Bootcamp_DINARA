import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TblServicios extends BaseSchema {
  protected tableName = 'tbl_servicios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('ser_nombre').notNullable()
      table.string('ser_ruta').notNullable()
      table.text('ser_icono')
      table.string('ser_tags', 255)
      table.json('ser_datos')
      table.integer('ser_orden')
      table.integer('ser_tipo')
      table.boolean('ser_estado').defaultTo(true)
      table.timestamp('ser_created_at', { useTz: true })
      table.timestamp('ser_updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
