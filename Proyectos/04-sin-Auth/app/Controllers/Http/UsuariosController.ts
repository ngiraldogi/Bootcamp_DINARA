import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import jwt from 'jsonwebtoken'
const bcryptjs = require('bcryptjs');
import Env from '@ioc:Adonis/Core/Env'

export default class UsuariosController {
    public async registrarUsuario({ request }: HttpContextContract) {
        const { nombre, correo, contrasena } = request.all();
        const salt = bcryptjs.genSaltSync(); //Aqui se encripta la contraseña (numero de vueltas) - numero de vueltas a la encriptacion (entre mas alto mejor) - 10 es el valor por defecto
        const usuario = new Usuario();
        usuario.nombre = nombre;
        usuario.correo = correo;
        usuario.contrasena = bcryptjs.hashSync(contrasena, salt); 
        await usuario.save();
        return {usuario, mensaje: 'Usuario registrado correctamente'};
    }

    public async loginUsuario({ request, response }: HttpContextContract) {
        const correo = request.input('correo');
        const contrasena = request.input('contrasena');
        try{
            //Comprobar si el usuario existe
            const user = await Usuario.findByOrFail('correo', correo);
            if(!user){
                return response.status(400).json({mensaje: 'Usuario no encontrado'});
            }
            const validarPassword = await bcryptjs.compareSync(contrasena, user.contrasena);
            if(!validarPassword){
                return response.status(400).json({mensaje: 'Contraseña incorrecta'});
            }
            //Lo que sigue es para generar el token (jwt) 
            const payload = {
                "nombre": user.nombre,
                "id": user.id
            }
            const token:string = this.generarToken(payload);
            response.status(200).json({
                token,
                user,
                mensaje: 'Usuario logueado correctamente'
            }) 
        }catch{
            return response.status(500).json({mensaje: 'Error en el servidor, credenciales incorrectas'});
        }
    }   

    private generarToken(payload: any): string {
        const opciones = {
            expiresIn: '5 mins'
        }
        return jwt.sign(payload, Env.get('JWT_SECRET_KEY'), opciones); //recibe tres parametros (el payload, la llave secreta (puede ser cualquiera) que lo toma del archivo .env, opciones de duracion del token)
    }

    //Aca se recibe la autorizacion que se hace en postman
    public verificarToken(authorizationHeader: string){
        let token = authorizationHeader.split(' ')[1];
        token = jwt.verify(token, Env.get('JWT_SECRET_KEY'),(error) => {
            if(error){
                throw new Error('Token expirado');
            }
        })
        return true
    }        
}