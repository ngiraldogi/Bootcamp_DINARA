import Route from '@ioc:Adonis/Core/Route'
const accion_path = "../../Presentacion/buscador/ControladorBuscador"

Route.group(() => {
  Route.post('/buscador', accion_path+'.buscar')
 
}).prefix('/api/v1')
