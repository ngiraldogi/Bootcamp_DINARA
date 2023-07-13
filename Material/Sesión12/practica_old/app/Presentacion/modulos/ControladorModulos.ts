import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioModulos } from "App/Dominio/Datos/Servicios/ServicioModulos";
import { RepositorioModulosDb } from "App/Infrestructura/Implementacion/BaseDatos/RepositorioModulosDB";
import { TranslateModulo } from "../datos/dto/ModuloDto";

export default class ControladorModulos {
    private servicio: ServicioModulos
    constructor() {
        this.servicio = new ServicioModulos(new RepositorioModulosDb())
    }
    /**
    * @swagger
    * /api/v1/modulos/listar:
    *   get:
    *     tags:
    *       - Modulos
    *     summary: Modulos
    *     responses:
    *       200:
    *           message: ok
    */

    public async listar() {
        var modulos = await this.servicio.obtenerModulos()
        return { "modulos": modulos }
    }


    /**
   * @swagger
   * /api/v1/modulos:
   *   post:
   *     tags:
   *       - Modulos
   *     description: Crear una Accion
   *     produces: application/json
   *     parameters:
   *       - name: accion
   *         description: accion
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Modulo'
   *     responses:
   *       200:
   *         description: Successfully created
   */
    public async crear({ request }: HttpContextContract) {
        var json = request.raw();
        var modulo = TranslateModulo.toModuloFromString(json!!.toString())
        return this.servicio.crearModulo(modulo)
    }
    /**
    * @swagger
    * /api/v1/modulos/{id}:
    *   get:
    *     tags:
    *       - Modulos
    *     summary: Consultar por id
    *     parameters:
    *       - name: id
    *         in: path
    *         type: int
    *     responses:
    *       200:
    *         description: Consultar por id
    *         example:
    *           message: OK
    */

    public async buscar({ request }: HttpContextContract) {
        var id = request.param('id')
        return this.servicio.obtenerModuloPorId(id)
    }

    /**
   * @swagger
   * /api/v1/modulos/{id}:
   *   put:
   *     tags:
   *       - Modulos
   *     summary: Actualizar por id
   *     produces: application/json
   *     parameters:
   *       - name: modulo
   *         description: modulo
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Modulo'
   *       - name: id
   *         in: path
   *         type: int
   *     responses:
   *       200:
   *         description: Consultar por id
   *         example:
   *           message: OK
   */
    public async actualizar({ request }: HttpContextContract) {
        var id = request.param('id')
        var json = request.raw()
        var modulo = TranslateModulo.toModuloFromString(json!!.toString())
        return this.servicio.actualizarModulo(modulo, id)
    }

}