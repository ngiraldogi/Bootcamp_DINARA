import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import UsuariosController from "App/Controllers/Http/UsuariosController";

//aqui se valida si el token es valido y lo deja seguir para hacer otras funcionalidades
export default class AuthJwt {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const authorizationHeader = ctx.request.header("authorization");
    //Revisa el header del token
    if (authorizationHeader == undefined) {
      return ctx.response.status(400).json({ message: "Falta el token de autorización" });
    }
    const token = authorizationHeader;

    try {
      const usuariosController = new UsuariosController();
      usuariosController.verificarToken(token);
      await next();
    } catch (error) {
      ctx.response.status(400).json({ message: "Falla en el token de autorización" });
    }
  }
}
