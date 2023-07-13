import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import {TblModulos} from 'App/Infrestructura/datos/entidades/Modulos'

export default class ModuloSeeder extends BaseSeeder {
  public async run () {
    await TblModulos.createMany([
      {
        id: 1,
        nombre: 'Encuestas',
        acciones: '1',
        name: 'Encuestas',
        filename: 'http://filename/filename.png',
        tipo: 'news',
        ruta: 'Encuestas',
        estado: true,
        orden: 1,
        tabla_modulo: 'modulo'
      },
      {
        id: 2,
        nombre: 'Noticias y eventos de ciudad',
        acciones:'1',
        name: 'Noticias y eventos de ciudad',
        filename: 'http://filename/filename.png',
        tipo: 'news',
        ruta: 'Noticias y eventos de ciudad',
        estado: true,
        orden: 1,
        tabla_modulo: 'modulo'
      }
    ])
  }
}
