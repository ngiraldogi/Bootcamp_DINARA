import test from 'japa'
import supertest from 'supertest'
import { obtenerTokenAutorizacion } from '../TestsAuths'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api/v1/calificaciones`

test.group('Calificaciones', (group) => {

  group.timeout(10000)

  test('Espera que guarde una calificacion', async (assert) => {
    const { text } = await supertest(BASE_URL).post('/guardar').set('Authorization', `Bearer ${await obtenerTokenAutorizacion()}`)
    .send({
      id: 6,
      calificacion: 5,
      que_te_gusta: 'Prueba super App J',
      que_no_te_gusta: 'Prueba super App',
      que_te_gustaria: 'Prueba super App',
      id_dispositivo: 'fd2079dfc234c925',
      id_usuario: 'prueba'
    })
    .expect(201)
    assert.equal(true, text.includes('"mensaje":'))
  })
})
