import test from 'japa'
import supertest from 'supertest'
import { obtenerTokenAutorizacion } from '../TestsAuths'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api/v1/tableros`

test.group('Tableros', (group) => {

  group.timeout(10000)

  test('Espera que liste los tableros', async (assert) => {
    const { text } = await supertest(BASE_URL).get('/listar').set('Authorization', `Bearer ${await obtenerTokenAutorizacion()}`).expect(200)
    assert.equal(true, text.includes('"tableros":'))
  })
})



