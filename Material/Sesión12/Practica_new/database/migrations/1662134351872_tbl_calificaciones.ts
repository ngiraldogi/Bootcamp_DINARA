import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TblCalificaciones extends BaseSchema {
  protected tableName = 'tbl_calificaciones'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.tinyint('cal_calificacion').notNullable()
      table.string('cal_que_te_gusta', 255)
      table.string('cal_que_no_te_gusta', 255)
      table.string('cal_que_te_gustaria', 255)
      table.string('cal_id_dispositivo', 50)
      table.string('cal_id_usuario', 35)
      
      table.timestamp('cal_fecha', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
