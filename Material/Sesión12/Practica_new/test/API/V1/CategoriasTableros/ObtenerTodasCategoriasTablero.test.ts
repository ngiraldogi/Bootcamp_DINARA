import test from 'japa'
import supertest from 'supertest'
import { obtenerTokenAutorizacion } from '../TestsAuths'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api/v1/categorias_tablero/listartodas`

test.group('Categorias Tablero', (group) => {

  group.timeout(10000)

  test('Espera que obtenga todas las categorias de tableros', async (assert) => {
    const { text } = await supertest(BASE_URL).get('/').set('Authorization', `Bearer ${await obtenerTokenAutorizacion()}`).expect(200)
    assert.equal(true, text.includes('"categorias":'))
  })
})
