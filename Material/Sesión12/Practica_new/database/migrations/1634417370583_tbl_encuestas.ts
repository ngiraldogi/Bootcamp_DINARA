import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TblEncuestas extends BaseSchema {
  protected tableName = 'tbl_encuestas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('titulo', 255).notNullable()
      table.integer('orden').defaultTo(1).notNullable()
      table.integer('categoria_id').unsigned().references('id').inTable('tbl_categorias_encuestas')
      table.boolean('estado').defaultTo(true)
      table.string('iconapp', 255)
      table.timestamp('fecha', { useTz: true })
      
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
