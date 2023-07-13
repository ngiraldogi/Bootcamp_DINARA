import test from 'japa'
import supertest from 'supertest'
import { obtenerTokenAutorizacion } from '../TestsAuths'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api/v1/categorias_tablero`

test.group('Categorias Tablero', (group) => {

  group.timeout(10000)
  
  test('Espera que obtenga una categoria de tablero por id', async (assert) => {
    const { text } = await supertest(BASE_URL).get('/1').set('Authorization', `Bearer ${await obtenerTokenAutorizacion()}`).expect(200)
    assert.equal(true, text.includes('"id":'))
  })
})