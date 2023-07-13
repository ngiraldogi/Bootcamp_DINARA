import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TblDispositivosServicios extends BaseSchema {
  protected tableName = 'tbl_dispositivos_servicios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('dsr_dispositivo_id').references('id').inTable('tbl_dispositivos')
      table.integer('dsr_servicio_id').references('id').inTable('tbl_servicios')
      table.integer('dsr_interaccion')
      table.boolean('dsr_estado').defaultTo(true)
      table.timestamp('dsr_created_at', { useTz: true })
      table.timestamp('dsr_updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
