import test from 'japa'
import supertest from 'supertest'
import { obtenerTokenAutorizacion } from '../TestsAuths'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api/v1/modulos`

test.group('Modulos', (group) => {

  group.timeout(10000)
  
  test('Espera que guarde un modulo', async (assert) => {
    const { text } = await supertest(BASE_URL).post('/').set('Authorization', `Bearer ${await obtenerTokenAutorizacion()}`)
    .send({
        id: 6,
        nombre: 'Encuestas',
        acciones: [1],
        name: 'Encuestas',
        filename: 'http://filename/filename.png',
        tipo: 'news',
        ruta: 'Encuestas',
        estado: true,
        orden: 1,
        tabla_modulo: 'modulo'
    })
    .expect(200)
    assert.equal(true, text.includes('"mansaje":'))
  })
})