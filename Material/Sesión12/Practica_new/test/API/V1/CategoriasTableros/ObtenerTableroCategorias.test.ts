import test from 'japa'
import supertest from 'supertest'
import { obtenerTokenAutorizacion } from '../TestsAuths'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api/v1/tablero/categorias_listar`

test.group('Categorias Tablero categorias', (group) => {

  group.timeout(10000)

  test('Espera que obtenga las categorias tableros', async (assert) => {
    const { text } = await supertest(BASE_URL).get('/').set('Authorization', `Bearer ${await obtenerTokenAutorizacion()}`).expect(200)
    assert.equal(true, text.includes('"categorias":'))
  })
})
