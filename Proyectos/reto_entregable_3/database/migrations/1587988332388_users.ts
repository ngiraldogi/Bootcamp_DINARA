import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable()
      table.string('last_name', 255).notNullable()
      table.string('identification_type', 50).notNullable()
      table.string('identification_number', 50).notNullable()
      table.string('address', 255).nullable()
      table.string('neighborhood', 255).nullable()
      table.string('city', 255).nullable()
      table.string('state', 255).nullable()
      table.string('email', 255).notNullable()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      table.integer('perfil_id').unsigned().references('id').inTable('perfiles')
      table.timestamps(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
