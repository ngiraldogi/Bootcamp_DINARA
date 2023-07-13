import test from 'japa'
import supertest from 'supertest'
import { obtenerTokenAutorizacion } from '../TestsAuths'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api/v1`

test.group('Buscador', (group) => {

  group.timeout(10000)

  test('Espere a que realice la búsqueda', async (assert) => {
    const { text } = await supertest(BASE_URL).post('/buscador').send({
      frase: "hue"
  }).expect(200)
    assert.equal(true, text.includes('"categorias":'))
  })
})
