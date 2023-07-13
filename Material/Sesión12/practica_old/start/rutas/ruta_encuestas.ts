import Route from '@ioc:Adonis/Core/Route'
const encuesta_path = "../../Presentacion/encuestas/ControladorEncuestas"

Route.group(() => {
  Route.get('encuestas/listar', encuesta_path + '.listar')
  Route.post('encuestas', encuesta_path + '.crear')
  Route.post('encuestas/pregunta', encuesta_path + '.crearPregunta')
  Route.post('encuestas/respuesta', encuesta_path + '.crearRespuesta')
  Route.post('encuestas/respuestas', encuesta_path + '.crearRespuestas')
  Route.get('encuestas/:id', encuesta_path + '.buscar')
  Route.get('encuestas/:id/preguntas', encuesta_path + '.buscarPreguntas')
  Route.get('encuestas/:id/respuestas', encuesta_path + '.buscarRespuestas')
  Route.put('encuestas/:id', encuesta_path + '.actualizar')
}).prefix('/api/v1/')