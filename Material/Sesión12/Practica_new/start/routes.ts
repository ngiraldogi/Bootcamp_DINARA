import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ response }) => {
  response.redirect().toPath('/docs')
})

Route.get('/api/v1/version', async () => {
  return { version: 'kuala_v6' }
})