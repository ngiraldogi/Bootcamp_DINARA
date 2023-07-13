/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.get('/listar-usuarios', 'UsuariosController.getListarUsuarios')
  Route.get('/listar-todo', 'UsuariosController.getListarUsuariosTodos')
  Route.get('/listar-perfil', 'UsuariosController.getListarUsuariosYPerfil')
  Route.get('/listar-publicaciones', 'UsuariosController.getListarUsuariosYPublicacion')
  Route.get('/listar-usuarios-grupos', 'UsuariosController.getListarUsuariosGrupos')
  Route.get('/buscar-por-id/:id', 'UsuariosController.getbuscarPorId') //el parametro pasa por la url directo
  Route.get('/filtrar-usuarios', 'UsuariosController.filtrarUsuarios')
  
  Route.post('/registro-usuarios', 'UsuariosController.setRegistrarUsuarios')
  Route.post('/registro-perfil', 'PerfilsController.setRegistrarPerfil')
  Route.post('/registro-publicacion', 'PublicacionesController.setRegistroPublicacion')
  Route.post('/registro-grupo', 'GruposController.setRegistrarGrupo')
  Route.post('/registro-usuario-grupo', 'GrupoUsuariosController.setRegistrarUsuarioGrupo')

  Route.put('/actualizar-usuario/:id', 'UsuariosController.actualizarUsuario')

  Route.delete('/eliminar-usuario/:id', 'UsuariosController.eliminarUsuario')

}).prefix('/alcaldia')