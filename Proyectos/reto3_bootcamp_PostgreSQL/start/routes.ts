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
  Route.post('/registro-cliente', 'ClientesController.setRegistrarClientes');

  Route.get('/listar-clientes', 'ClientesController.getListarClientes');

  Route.put('/actualizar-cliente/:id', 'ClientesController.actualizarClientes');

  Route.delete('/eliminar-cliente/:id', 'ClientesController.eliminarCliente');
}).prefix('reto3');