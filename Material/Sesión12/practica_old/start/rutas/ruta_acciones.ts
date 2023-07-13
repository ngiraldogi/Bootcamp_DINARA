import Route from '@ioc:Adonis/Core/Route'
const accion_path = "../../Presentacion/acciones/ControladorAcciones"

Route.group(() => {
  Route.get('/acciones/listar', accion_path+'.listar')
  Route.post('/acciones', accion_path+'.crear')
  Route.get('/acciones/:id', accion_path+'.buscar')
  Route.put('/acciones/:id', accion_path+'.actualizar')
}).prefix('/api/v1')