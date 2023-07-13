import Route from '@ioc:Adonis/Core/Route'
const accion_path = "../../Presentacion/categoria_tablero/ControladorCategoriaTablero"

Route.group(() => {
  Route.get('categorias_tablero/listar', accion_path+'.listar')
  Route.get('categorias_tablero/listartodas', accion_path+'.listartodas')
  Route.post('categorias_tablero', accion_path+'.crear')
  Route.get('categorias_tablero/:id', accion_path+'.buscar')
  Route.put('categorias_tablero/:id', accion_path+'.actualizar')
  Route.get('tablero/categorias_listar', accion_path+'.tablero')  
  
  Route.get('categoria_tablero/cache', accion_path+'.obtenerCache')
  Route.delete('categoria_tablero/cache', accion_path+'.borrarCache')
}).prefix('/api/v1/').middleware('autenticarJwt')