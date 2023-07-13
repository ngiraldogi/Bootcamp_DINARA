import test from 'japa'
import supertest from 'supertest'
import { obtenerTokenAutorizacion } from '../TestsAuths'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api/v1/tableros`

test.group('Tableros', (group) => {

  group.timeout(10000)
  
  test('Espera que guarde un tablero', async (assert) => {
    const { text } = await supertest(BASE_URL).post('/').set('Authorization', `Bearer ${await obtenerTokenAutorizacion()}`)
    .send({
        id: 6,
        nombre: 'Encuesta de cuidadores y animales de compañía',
        descripcion: 'descripcion',
        iconoapp: 'img/tablero/3-a.png',
        categorias_id: 2,
        linktablero: 'http://tableros/img/imagen.png' 
    })
    .expect(200)
    assert.equal(true, text.includes('"mansaje":'))
  })
})