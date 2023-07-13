import Route from '@ioc:Adonis/Core/Route'
const accion_path = "../../Presentacion/categorias_encuestas/ControladorCategoriaEncuesta"

Route.group(() => {
  Route.get('categorias_encuestas/listar', accion_path+'.listar')
  Route.put('categorias_encuestas/:id', accion_path+'.cambiarEstado')
}).prefix('/api/v1/').middleware('autenticarJwt')