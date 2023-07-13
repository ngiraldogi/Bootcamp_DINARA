import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Editorial from 'App/Models/Editorial'; //va el nombre del .ts

export default class EditorialsController {
    public async registrar({ request }: HttpContextContract){
        const { nombre } = request.all();
        const editorial = new Editorial();
        editorial.nombreEditorial = nombre;
        await editorial.save();
        return {editorial, "msj": "Editorial registrada con éxito"};
    }

    public async getListarEditorial(): Promise<Editorial[]>{
        const editoriales = await Editorial.all();
        return editoriales;
    }
}
