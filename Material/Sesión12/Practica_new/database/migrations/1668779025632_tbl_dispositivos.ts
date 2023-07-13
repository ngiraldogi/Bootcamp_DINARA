import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TblDispositivos extends BaseSchema {
  protected tableName = 'tbl_dispositivos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('dis_identificador').notNullable()
      table.boolean('dis_estado').defaultTo(true)
      table.timestamp('dis_created_at', { useTz: true })
      table.timestamp('dis_updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
