import Route from '@ioc:Adonis/Core/Route'
const accion_path = "../../Presentacion/categoria_tablero/ControladorCategoriaTablero"

Route.group(() => {
  Route.get('categoria_tablero/listar', accion_path+'.listar')
  Route.post('categoria_tablero', accion_path+'.crear')
  Route.get('categoria_tablero/:id', accion_path+'.buscar')
  Route.put('categoria_tablero/:id', accion_path+'.actualizar')
  Route.get('tablero/categorias_listar', accion_path+'.tablero')
}).prefix('/api/v1/')