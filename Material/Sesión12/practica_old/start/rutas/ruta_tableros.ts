import Route from '@ioc:Adonis/Core/Route'
const accion_path = "../../Presentacion/tableros/ControladorTableros"

Route.group(() => {
  Route.get('/tableros/listar', accion_path+'.listar')
  Route.post('/tableros', accion_path+'.crear')
  Route.get('/tableros/:id', accion_path+'.buscar')
  Route.put('/tableros/:id', accion_path+'.actualizar')
  Route.get('/tableros/categoria/:id', accion_path+'.buscarPorCategoria')
}).prefix('/api/v1')