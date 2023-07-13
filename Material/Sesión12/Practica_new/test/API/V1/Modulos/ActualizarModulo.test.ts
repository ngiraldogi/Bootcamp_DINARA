import test from 'japa'
import supertest from 'supertest'
//import { DateTime } from 'luxon'
import { obtenerTokenAutorizacion } from '../TestsAuths'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api/v1/modulos`

test.group('Modulos', (group) => {

  group.timeout(10000)
  
  test('Espera que actualice un modulo', async (assert) => {
    const { text } = await supertest(BASE_URL).put('/1').set('Authorization', `Bearer ${await obtenerTokenAutorizacion()}`)
    .send({
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