import test from 'japa'
import supertest from 'supertest'
import { DateTime } from 'luxon'
import { obtenerTokenAutorizacion } from '../TestsAuths'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api/v1`

test.group('Encuestas', (group) => {

  group.timeout(10000)

  test('Espera que guarde una pregunta', async (assert) => {
    const { text } = await supertest(BASE_URL).post('/encuestas/pregunta').set('Authorization', `Bearer ${await obtenerTokenAutorizacion()}`)
    .send({
      encuesta_id:1,
      nombre: 'Pruegunta prueba',
      tipo: 'basico',
      tipodato: 'texto',
      valorminimo: 18,
      valormaximo: 100,
      obligatorio: false,
      listavalores: [{id:1, nombre: ''}]
    })
    .expect(200)
    assert.equal(true, text.includes('"mansaje":'))
  })
})
