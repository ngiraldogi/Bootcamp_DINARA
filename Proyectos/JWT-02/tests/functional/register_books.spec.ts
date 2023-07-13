import { test } from '@japa/runner'
import { obtenerTokenAutorizacion } from './TestAuths'

test('Registrar libros', async ({client, assert}) => { 
    const token = await obtenerTokenAutorizacion()   
    let body = {
        titulo: "Programacion3",
        isbn: "1234767813",
        editorialId: 1,
        autorId: 1
    }
    const response = await client.post('api/libro/register').json(body)
        .header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body()) //.isArray(response.body())
})