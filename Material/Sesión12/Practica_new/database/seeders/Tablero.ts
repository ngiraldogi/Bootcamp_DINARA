import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import {TblTableros} from 'App/Infrestructura/datos/entidades/Tableros'

export default class TableroSeeder extends BaseSeeder {
  public async run () {
    await TblTableros.createMany([
      {
        id: 1,
        nombre: 'Beneficios',
        descripcion: 'descripcion',
        iconoapp: 'img/tablero/3-a.png',
        categorias_id: 1,
        linktablero: 'http://tableros/img/imagen.png'       
      },
      {
        id: 2,
        nombre: 'Encuesta de cuidadores y animales de compañía',
        descripcion: 'descripcion',
        iconoapp: 'img/tablero/3-a.png',
        categorias_id: 2,
        linktablero: 'http://tableros/img/imagen.png'       
      },
      {
        id: 3,
        nombre: 'Programa Buen Comienzo',
        descripcion: 'descripcion',
        iconoapp: 'img/tablero/3-a.png',
        categorias_id: 2,
        linktablero: 'http://tableros/img/imagen.png'       
      }
    ])
  }
}
