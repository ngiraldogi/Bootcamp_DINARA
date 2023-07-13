import test from 'japa'
import { CalificacionDto } from 'App/Presentacion/datos/dto/CalificacionDto'
import { Calificacion } from 'App/Dominio/Datos/Entidades/Calificacion'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api/v1/encuestas`

test.group('Calificacion Dto', (group) => {
  
  test('Espera obtener una calificacion a partir de un DTO', async (assert) => {
    const calificacion = new Calificacion()
    calificacion.calificacion = 5
    calificacion.queTeGusta =  'foo'  
    calificacion.queNoTeGusta = 'foo'
    calificacion.queTeGustaria = 'foo'
    calificacion.idDispositivo =  'abcdfgh'
    calificacion.idUsuario = 'abcdfgh'
    const calificacionDto = new CalificacionDto()
    calificacionDto.establecerDto(calificacion)
    assert.instanceOf(calificacionDto, CalificacionDto)
  })
})