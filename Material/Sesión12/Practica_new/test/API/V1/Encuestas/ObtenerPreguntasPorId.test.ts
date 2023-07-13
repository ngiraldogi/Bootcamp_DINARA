import test from 'japa'
import supertest from 'supertest'
import { obtenerTokenAutorizacion } from '../TestsAuths'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api/v1/encuestas`

test.group('Encuestas', (group) => {

  group.timeout(10000)

  test('Espera que liste las preguntas', async (assert) => {
    const { text } = await supertest(BASE_URL).get('/1/preguntas').set('Authorization', `Bearer ${await obtenerTokenAutorizacion()}`).expect(200)
    assert.equal(true, text.includes('"preguntas":'))
  })
})



