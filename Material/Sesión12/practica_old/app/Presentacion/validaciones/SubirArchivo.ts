import Application from '@ioc:Adonis/Core/Application'
import { RequestContract } from '@ioc:Adonis/Core/Request'

export class SubirArchivo {
    constructor(private request: RequestContract) { }


    public cargar(): string {
        const coverImage = this.request.file('archivo')
        if (coverImage) {
            coverImage.move(Application.tmpPath('uploads'))
            return "coverImage.fileName!!";
        }
        throw { "codigo": 0, "mensaje": "Archivo Requerido" }
    }
}