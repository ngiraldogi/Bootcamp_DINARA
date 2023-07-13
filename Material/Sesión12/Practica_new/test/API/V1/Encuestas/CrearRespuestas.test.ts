import test from 'japa'
import supertest from 'supertest'
import { DateTime } from 'luxon'
import { obtenerTokenAutorizacion } from '../TestsAuths'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api/v1`

test.group('Encuestas', (group) => {

  group.timeout(10000)

  test('Espera que guarde respuestas', async (assert) => {
    const { text } = await supertest(BASE_URL).post('/encuestas/respuestas').set('Authorization', `Bearer ${await obtenerTokenAutorizacion()}`)
    .send({
      encuesta_id: 1,
      respuestas: [{
        pregunta_id: 34,
        valor: '6'
      }]
    })
    .expect(200)
    assert.equal(true, text.includes('"mansaje":'))
  })
})
