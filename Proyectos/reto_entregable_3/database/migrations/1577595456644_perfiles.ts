import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Perfiles extends BaseSchema {
  protected tableName = 'perfiles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('description_profile', 255).notNullable()
      table.timestamps(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
