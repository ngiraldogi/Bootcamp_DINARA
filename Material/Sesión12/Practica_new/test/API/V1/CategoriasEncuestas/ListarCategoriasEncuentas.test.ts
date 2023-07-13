import test from 'japa'
import supertest from 'supertest'
import { obtenerTokenAutorizacion } from '../TestsAuths'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api/v1/categorias_encuestas`

test.group('Categorias encuentas', (group) => {

  group.timeout(10000)

  test('Espera que liste las categorias encuestas', async (assert) => {
    const { text } = await supertest(BASE_URL).get('/listar').set('Authorization', `Bearer ${await obtenerTokenAutorizacion()}`).expect(200)
    assert.equal(true, text.includes('"categorias":'))
  })
})



