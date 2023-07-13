import Route from '@ioc:Adonis/Core/Route'
const accion_path = "../../Presentacion/servicios/ControladorServicios"

Route.group(() => {
  Route.get('/', accion_path+'.listar')
  Route.get('/:dispositivo', accion_path+'.buscar')
  Route.post('/', accion_path+'.guardar')
  Route.post('/interaccion', accion_path+'.interaccion' )
 
}).prefix('/api/v1/servicios')
