import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import {TblCategoriasTableros} from 'App/Infrestructura/datos/entidades/CategoriasTablero'

export default class CategoriasTableroSeeder extends BaseSeeder {
  public async run () {
    await TblCategoriasTableros.createMany([
      {
        id: 1,
        titulo: 'Gubernamental',
        iconapp: 'http://imagenes/iconapp.png'
      },
      {
        id: 2,
        titulo: 'Medio Ambiente',
        iconapp: 'http://imagenes/iconapp.png'
      },
      {
        id: 3,
        titulo: 'Infraestructura y Catastro',
        iconapp: 'http://imagenes/iconapp.png'
      },
      {
        id: 4,
        titulo: 'Salud',
        iconapp: 'http://imagenes/iconapp.png'
      }
    ])
  }
}
