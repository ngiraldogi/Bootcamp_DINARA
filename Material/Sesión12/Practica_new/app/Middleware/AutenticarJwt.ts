import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env';

export default class AutenticarAdministrador {

  private adminylogUrl:String = Env.get('URL_ADMINYLOG');
  private adminylogVerificarEndpoint:String = '/api/v1/token/verificar'

  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const authorizationHeader = ctx.request.header('authorization')

    if(authorizationHeader == undefined){
      return ctx.response.status(400).send({
        mensaje: "Falta el token de autorización",
        estado: 401,
      })
    }
    
    const keyToken = authorizationHeader.split(' ')
    const key = keyToken[1]

    if(key == Env.get('KEY')){
      await next()
    }else{
      const cuerpoPeticion = {
        token: authorizationHeader
      }
  
     try{
        await axios.post(`${this.adminylogUrl}${this.adminylogVerificarEndpoint}`, cuerpoPeticion)
        await next()
      }catch(error){ if(error.response){
        if(error.response.data){
          return ctx.response.status(error.response.status).send(error.response.data)
        }else{
          return ctx.response.status(400).send({
            mensaje: "Se presento un problema con la conexión a la base de datos",
            error,
            estado: 401,
          })
        }
      }else{
        return ctx.response.status(400).send({
          mensaje: "Se presento un problema con la conexión a la base de datos",
          error,
          estado: 401,
        })
      }
      }
    }

 
  }
}
