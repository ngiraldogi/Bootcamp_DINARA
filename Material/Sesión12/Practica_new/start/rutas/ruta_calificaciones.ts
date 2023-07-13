import Route from '@ioc:Adonis/Core/Route'
const accion_path = "../../Presentacion/calificaciones/ControladorCalificaciones"

Route.group(() => {
  Route.get('/calificaciones/listar', accion_path+'.obtener')
  Route.post('/calificaciones/guardar', accion_path+'.guardar')
}).prefix('/api/v1')/* .middleware('autenticarJwt') */