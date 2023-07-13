//import { Request } from '@adonisjs/core/build/standalone';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'


export default class UsuariosController {

    public async getListarUsuarios() : Promise<Usuario[]> {
        const user = await Usuario.all()
        return user;
    }

    public async getListarUsuariosYPerfil() : Promise<Usuario[]> {
        const user = await Usuario.query().preload('perfil')
        return user;
    }

    public async getListarUsuariosYPublicacion() : Promise<Usuario[]> {
        const user = await Usuario.query().preload('publicaciones')
        return user;
    }

    public async getListarUsuariosGrupos() : Promise<Usuario[]> {
        const user = await Usuario.query().preload('usuario_grupos')
        return user;
    }

    //esta funcion se encarga de buscar un usuario por su id
    public async getbuscarPorId({ request }: HttpContextContract) {
        const id = request.param('id');
        const user = await Usuario.find(id); //el ORM se encarga de buscar por el id en la base de datos
        return user;
    }

    //esta funcion se encarga de actualizar un usuario por su id
    public async actualizarUsuario({ request }: HttpContextContract) {
        // const id = request.param('id');
        // const user = request.all(); //es lo que la persona digito (ya cambio en el formulario)
        // //Lo siguiente se hace con el ORM
        // await Usuario.query().where('codigo_usuario', id).update({
        //     nombre_usuario: user.nombre,
        //     contrasena: user.contrasena,
        //     email: user.email,
        //     telefono: user.telefono
        // });
        // return {"mensaje":"Actualado correctamente","estado":200}
        const id = request.param('id');
        const usuario = await Usuario.findOrFail(id)
        const datos = request.all();
      
        usuario.nombre_usuario = datos.nombre
        usuario.contrasena = datos.contrasena
        usuario.email = datos.email
        usuario.telefono = datos.telefono
        console.log(usuario)
        await usuario.save()
        return {"mensaje":"Actualizado correctamente","estado":200};
    }

    //esta funcion se encarga de eliminar un usuario por su id
    public async eliminarUsuario({ request }: HttpContextContract) {
        const id = request.param('id'); //el parametro id se define en la ruta y en la funcion, seria lo mismo que el codigo_usuario
        await Usuario.query().where('codigo_usuario', id).delete();
        return {"mensaje":"Usuario eliminado correctamente","estado":200}
    }

    //esta funcion se encarga de filtrar los usuarios por su nombre
    public async filtrarUsuarios({ request }: HttpContextContract) {
        const {search} = request.all(); //{search}: se desestructura el objeto request.all() para obtener el valor de la propiedad search //{search} es lo mismo que request.all().search
        const users = await Usuario.query().where('nombre_usuario', 'like', `%${search}%`);
        return users;
    }

    public async setRegistrarUsuarios({request, response}: HttpContextContract) {
        const dataUsuario = request.only(['codigo_usuario', 'nombre_usuario', 'contrasena', 'email', 'telefono'])
        try{
            const codigoUsuario = dataUsuario.codigo_usuario;
            const usuarioExistente: Number = await this.getValidarUsuarioExistente(codigoUsuario)
            //console.log(usuarioExistente)
            if (usuarioExistente === 0) {
                await Usuario.create(dataUsuario)
                response.status(200).json({"msg": "Usuario registrado correctamente"})
            }
            else {
                response.status(400).json({"msg": "El codigo de usuario ya se encuentra registrado"})
            }
        }
        catch (error) {
            console.log(error)
            response.status(500).json({"msg": "Error en el servidor al registrar el usuario"})
        }
    }

    private async getValidarUsuarioExistente(codigo_usuario: Number): Promise<Number> {
        let total = await Usuario.query().where({'codigo_usuario': codigo_usuario}).count('* as total').from('usuarios')
        return parseInt(total[0].$extras['total'])
    }
}