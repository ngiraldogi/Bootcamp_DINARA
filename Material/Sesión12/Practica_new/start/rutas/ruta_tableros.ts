import Route from '@ioc:Adonis/Core/Route'
const accion_path = "../../Presentacion/tableros/ControladorTableros"

Route.group(() => {
  Route.get('/tableros/listar', accion_path+'.listar')
  Route.post('/tableros', accion_path+'.crear')
  Route.get('/tableros/:id', accion_path+'.buscar')
  Route.put('/tableros/:id', accion_path+'.actualizar')
  Route.get('/tableros/categoria/:id', accion_path+'.buscarPorCategoria')
  Route.get('/tableros/categoriatodas/:id', accion_path+'.buscarPorCategoriaTodas')
  
  Route.get('/tablero/renderizar/:id', accion_path+'.prueba')// 1:Ruta login, 2: Ruta tableros  
  Route.get('/tablero/cache', accion_path+'.obtenerCache')
  Route.delete('/tablero/cache', accion_path+'.borrarCache')
}).prefix('/api/v1')