import Route from '@ioc:Adonis/Core/Route'
const accion_path = "../../Presentacion/modulos/ControladorModulos"

Route.group(() => {
  Route.get('/modulos/listar', accion_path+'.listar')
  Route.get('/modulos/listartodos', accion_path+'.listartodos')
  Route.post('/modulos', accion_path+'.crear')
  Route.get('/modulos/:id', accion_path+'.buscar')
  Route.put('/modulos/:id', accion_path+'.actualizar')

  Route.get('/modulo/cache', accion_path+'.obtenerCache')
  Route.delete('/modulo/cache', accion_path+'.borrarCache')
}).prefix('/api/v1').middleware('autenticarJwt')
