import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Publicaciones from 'App/Models/Publicacione'

export default class PublicacionesController {

    async setRegistroPublicacion({request, response}: HttpContextContract) {
        try{
            const dataPublicaciones = request.only([
                'codigo_publicacion', 'codigo_usuario', 'titulo', 'cuerpo'
            ])
            const codigoPublicacion = dataPublicaciones.codigo_publicacion;
            const codigoPublicacionExistente: Number = await this.getValidarPublicacionExistente(codigoPublicacion);
            if(codigoPublicacionExistente === 0){
                await Publicaciones.create(dataPublicaciones)
                response.status(200).json({"msg": "Publicacion registrada correctamente"})
            }
            else{
                response.status(400).json({"msg": "El codigo de la publicacion ya se encuentra registrado"})
            }
        }
        catch(error){
            console.log(error)
            response.status(500).json({"msg": "Error en el servidor al registrar la publicacion"})
        }
    }

    private async getValidarPublicacionExistente(codigo_publicacion: Number): Promise<Number> {
        const total = await Publicaciones.query().where({'codigo_publicacion': codigo_publicacion}).count('* as total').from('publicaciones')
        return parseInt(total[0].$extras['total'])
    }
}