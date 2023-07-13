import test from 'japa'
import supertest from 'supertest'
import { obtenerTokenAutorizacion } from '../TestsAuths'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api/v1`

test.group('servicios', (group) => {

  group.timeout(10000)

  test('Busca los servicios mas frecuentes con el identificador del celular', async (assert) => {
    const { text } = await supertest(BASE_URL).get('/servicios/453677ty67').expect(200)
    assert.equal(true, text.includes('['))
  })

  test('Envie json con informacion del servicio y id del telefono', async (assert) => {
    const { text } = await supertest(BASE_URL).post('/servicios/interaccion').send({
      "servicio_id": 0,
      "dispositivo": "string"
    }).expect(200)
    assert.equal(true, text.includes('true'))
  })
})
