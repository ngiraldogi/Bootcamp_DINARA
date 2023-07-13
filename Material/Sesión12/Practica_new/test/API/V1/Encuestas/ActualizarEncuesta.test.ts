import test from 'japa'
import supertest from 'supertest'
import { DateTime } from 'luxon'
import { obtenerTokenAutorizacion } from '../TestsAuths'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api/v1/encuestas`

test.group('Encuestas', (group) => {

  group.timeout(10000)
  
  test('Espera que actualice una encuesta', async (assert) => {
    const { text } = await supertest(BASE_URL).put('/1').set('Authorization', `Bearer ${await obtenerTokenAutorizacion()}`)
    .send({
        titulo: 'Encuesta de satisfacción de evento',
        fecha: DateTime.local()
    })
    .expect(200)
    assert.equal(true, text.includes('"mansaje":'))
  })
})