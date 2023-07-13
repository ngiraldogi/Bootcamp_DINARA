import Route from '@ioc:Adonis/Core/Route'
const encuesta_path = "../../Presentacion/encuestas/ControladorEncuestas"

Route.group(() => {
  Route.get('encuestas/listar', encuesta_path + '.listar')
  Route.get('encuestas/listar/categoria/:idCategoria', encuesta_path + '.obtenerEncuestasPorCategoria')
  Route.get('encuestas/listartodas', encuesta_path + '.listartodas')
  Route.post('encuestas', encuesta_path + '.crear')
  Route.post('encuestas/pregunta', encuesta_path + '.crearPregunta')
  Route.post('encuestas/respuesta', encuesta_path + '.crearRespuesta')
  Route.post('encuestas/respuestas', encuesta_path + '.crearRespuestas')
  Route.get('encuestas/:id', encuesta_path + '.buscar')
  Route.get('encuestas/:id/preguntas', encuesta_path + '.buscarPreguntas')
  Route.get('encuestas/:id/respuestas', encuesta_path + '.buscarRespuestas')
  Route.put('encuestas/:id', encuesta_path + '.actualizar')
  Route.put('encuestas/:idEncuesta/orden/:orden', encuesta_path + '.cambiarOrdenEncuesta')
  Route.post('encuestas/filtrar', encuesta_path + '.filtrar')
}).prefix('/api/v1/').middleware('autenticarJwt')