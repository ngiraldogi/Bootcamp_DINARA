import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import {TblEncuestas} from 'App/Infrestructura/datos/entidades/Encuestas'
import { DateTime } from 'luxon'

export default class EncuestaSeeder extends BaseSeeder {
  public async run () {
    await TblEncuestas.createMany([
      {
        id: 1,
        titulo: 'Encuesta de satisfacción de evento',
        fecha: DateTime.local()
      },
      {
        id: 2,
        titulo: 'electrodomésticos',
        fecha: DateTime.local()
      },
      {
        id: 3,
        titulo: 'Vehículos',
        fecha: DateTime.local()
      }
    ])
  }
}
