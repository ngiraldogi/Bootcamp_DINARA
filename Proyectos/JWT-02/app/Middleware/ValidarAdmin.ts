import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsuariosController from 'App/Controllers/Http/UsuariosController'
import Usuario from 'App/Models/Usuario'

export default class ValidarAdmin {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const authorizationHeader: any = ctx.request.header('authorization') //any: para que acepte cualquier tipo de dato

    try{
      const usuariosController = new UsuariosController()
      const {id} = await usuariosController.obtenerPayload(authorizationHeader)
      const usuario = await Usuario.find(id)

      if(!usuario){
        return ctx.response.status(401).json({
          msj: "Token no válido"
        })
      }

      if(usuario.perfil != 1){
        return ctx.response.status(401).json({
          msj: "No tiene permisos para realizar esta acción"
        })
      }
      await next()
    }catch(error){
      console.log(error);
      ctx.response.status(400).send("Falla relacionada con el token de autorización")
    }
  }
}
