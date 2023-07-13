import { ServicioCategoriaEncuesta } from "App/Dominio/Datos/Servicios/ServicioCategoriaEncuesta";
import { RepositorioCategoriaEncuestaDB } from "App/Infrestructura/Implementacion/BaseDatos/RepositorioCategoriaEncuestaDB";
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ControladorCategoriaEncuesta {
    private service: ServicioCategoriaEncuesta
    constructor() {
        this.service = new ServicioCategoriaEncuesta(new RepositorioCategoriaEncuestaDB)
    }
    public async listar({request}:HttpContextContract) {
        const parametrosQuery = request.qs()
        let inactivos = parametrosQuery['inactivos']
        inactivos = inactivos == 'true' ? true : false; 
        return { "categorias": await this.service.listarCategoriasEncuesta(inactivos) }
    }

    public async cambiarEstado({request, response}:HttpContextContract){
        const id = request.param('id')
        await this.service.actualizarEstadoCategoriaEncuesta(id)
        response.status(200).send({
            mensaje: "almacenado",
            estado: 1
        })
    }
}