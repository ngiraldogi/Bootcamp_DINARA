import test from 'japa'
import supertest from 'supertest'
import { obtenerTokenAutorizacion } from '../TestsAuths'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api/v1/categorias_tablero`

test.group('Categorias Tablero', (group) => {

  group.timeout(10000)
  
  test('Espera que actualice una categoria de tablero', async (assert) => {
    const { text } = await supertest(BASE_URL).put('/1').set('Authorization', `Bearer ${await obtenerTokenAutorizacion()}`)
    .send({
        titulo: 'Gubernamental',
        iconapp: 'http://imagenes/iconapp.png'
    })
    .expect(200)
    assert.equal(true, text.includes('"mansaje":'))
  })
})