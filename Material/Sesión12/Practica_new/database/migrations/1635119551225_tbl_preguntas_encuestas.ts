import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TblPreguntasEncuestas extends BaseSchema {
  protected tableName = 'tbl_preguntas_encuestas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('encuesta_id').notNullable()
      table.string('nombre').notNullable()
      table.string('tipo').notNullable()
      table.string('tipodato').notNullable()
      table.integer('valorminimo')
      table.integer('valormaximo')
      table.boolean('obligatorio')
      table.string('listavalores')
      table.timestamp('fecha', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
