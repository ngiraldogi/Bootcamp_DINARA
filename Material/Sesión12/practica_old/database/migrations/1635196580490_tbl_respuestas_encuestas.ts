import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TblRespuestasEncuestas extends BaseSchema {
  protected tableName = 'tbl_respuestas_encuestas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('valor').notNullable()
      table.integer('id_encuesta').notNullable()
      table.integer('id_pregunta').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
