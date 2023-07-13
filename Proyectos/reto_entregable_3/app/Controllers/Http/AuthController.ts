import { Response } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
    public async login({ request, auth, response }: HttpContextContract) {

        const email = request.input('email')
        const password = request.input('password')

        try {
            const token = await auth.use('api').attempt(email, password, {
                expiresIn: '60 mins',
            });
            return {
                token,
                message: 'Usuario logueado correctamente'
            }
        }catch (error) {
            return response.unauthorized("Credenciales incorrectas")
        }
    }

    public async register({ request, auth}: HttpContextContract) {
        
        // const name = request.input('name')
        // const last_name = request.input('last_name')
        // const identification_type = request.input('identification_type')
        // const identification_number = request.input('identification_number')
        // const address = request.input('address')
        // const neighborhood = request.input('neighborhood')
        // const city = request.input('city')
        // const state = request.input('state')
        // const email = request.input('email')
        // const password = request.input('password')

        const dataUser = request.only(['name', 'last_name', 'identification_type', 'identification_number', 'address', 'neighborhood', 'city', 'state', 'email', 'password'])

        try {

            const identificacionUser = dataUser.identification_number;
            const userExistente: number = await this.getValidarUserExistente(identificacionUser);
            //console.log(userExistente);
            if(userExistente == 0){
                await User.create(dataUser);
                return {
                    token,
                    message: 'Usuario creado correctamente'
                }
            }else{
                response.status(400).send({message: 'El usuario ya se encuentra registrado'})
            }
            // //crea un nuevo usuario
            // const user = new User()
            // user.name = name
            // user.last_name = last_name
            // user.identification_type = identification_type
            // user.identification_number = identification_number
            // user.address = address
            // user.neighborhood = neighborhood
            // user.city = city
            // user.state = state
            // user.email = email
            // user.password = password
            // await user.save()
        } catch (error) {
            Response.status(500).json({message: 'Error en el servidor al registrar el usuario'});
        }
    }

    private async getValidarUserExistente(cedula: string): Promise<number> {
        const total = await User.query().where({'identification_number': cedula}) //Esta es otra forma de hacer la consulta, en este caso solo consulta si existe el cliente (si existe devuelve 1, si no existe devuelve 0)
        return total.length; //Retorna el total de registros encontrados
    }
}

