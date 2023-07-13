import test from 'japa'
import { TranslateEncuesta } from 'App/Presentacion/datos/dto/EncuestaDto'
import { Encuesta } from 'App/Dominio/Datos/Entidades/Encuesta'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api/v1/encuestas`

test.group('Encuesta Dto', () => {

  test('Espera obtener una encuesta de un json string', (assert) => {
    const encuestaJsonString = `
    {
        "id": 1,
        "titulo": "foo",
        "fecha": "2022-09-22",
        "estado": true
    }
    `
    const encuesta = TranslateEncuesta.toEncuestaFromString(encuestaJsonString);
    assert.instanceOf(encuesta, Encuesta)
  })

  test('Espera obtener un json a partir de una encuesta', (assert)=>{
    const encuesta = new Encuesta()
    encuesta.id = 1,
    encuesta.titulo = 'foo',
    encuesta.fecha = '2022-09-22',
    encuesta.estado = true,
    encuesta.iconapp = 'algunaUrl',
    encuesta.orden = 1

    assert.instanceOf(TranslateEncuesta.encuestaToJson(encuesta), String)
  })
})
