import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Grupo from 'App/Models/Grupo'
import Usuario from 'App/Models/Usuario'
import UsuarioGrupo from 'App/Models/UsuarioGrupo'

export default class GrupoUsuariosController {

    public async setRegistrarUsuarioGrupo ({request, response}: HttpContextContract) {
        try {
            const dataGrupoUsuario = request.only(['codigo_usuario', 'codigo_grupo', 'fecha_inicio'])
            const codigoUsuario = dataGrupoUsuario.codigo_usuario
            const codigoGrupo = dataGrupoUsuario.codigo_grupo
            const datosExistentes: Number = await this.getValidarDatosGrupoYUsuario(codigoGrupo, codigoUsuario)
            switch (datosExistentes) {
                case 0:
                    //await Database.table('usuario_grupos').insert(dataGrupoUsuario) //de esta manera no es la correcta ya que no se esta usando el modelo
                    await UsuarioGrupo.create(dataGrupoUsuario) // para usar el modelo se debe crear un id en la tabla usuario_grupos que lo pide
                    response.status(200).json({"msg": "Usuario registrado correctamente en el grupo"})
                    break
                case 1:
                    response.status(400).json({"msg": "El codigo del grupo no se encuentra registrado"})
                    break
                case 2:
                    response.status(400).json({"msg": "El codigo del usuario no se encuentra registrado"})
                    break
            }
        }
        catch (error) {
            console.log(error)
            response.status(500).json({"msg": "Error en el servidor al registrar el usuario en el grupo"})
        }
    }

    private async getValidarDatosGrupoYUsuario(codigo_grupo: Number, codigo_usuario: Number): Promise<Number> {
        let total = await Grupo.query().where({'codigo_grupo': codigo_grupo}).count('* as total1').from('grupos')
        let cantidadDatos = parseInt(total[0].$extras['total1'])
        if (cantidadDatos !== 0) {
            let total = await Usuario.query().where({'codigo_usuario': codigo_usuario}).count('* as total2').from('usuarios')
            cantidadDatos = parseInt(total[0].$extras['total2'])
            console.log(cantidadDatos)
            if (cantidadDatos !== 0) {
                return 0;
            }
            else {
                return 2; /*si el metodo retorna 2, significa que el codigo de usuario no se encuentra registrado*/
            }
        }
        else {
            return 1; /*si el metodo retorna 1, significa que el codigo de grupo no se encuentra registrado*/
        }
    }
}