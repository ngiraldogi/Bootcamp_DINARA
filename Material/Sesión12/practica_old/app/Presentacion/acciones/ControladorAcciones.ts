import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioAcciones } from "App/Dominio/Datos/Servicios/ServicioAcciones";
import { RepositorioAccionesDb } from "App/Infrestructura/Implementacion/BaseDatos/RepositorioAccionesDB";
import { TranslateAccion } from '../datos/dto/AccionDto';

export default class ControladorAcciones {
    private servicio: ServicioAcciones
    constructor() {
        this.servicio = new ServicioAcciones(new RepositorioAccionesDb())
    }
    /**
    * @swagger
    * /api/v1/acciones/listar:
    *   get:
    *     tags:
    *       - Acciones
    *     summary: Acciones de un usuario
    *     responses:
    *       200:
    *           message: ok
    */
    public async listar() {
        return { "acciones": await this.servicio.obtenerAcciones() }
    }

    /**
       * @swagger
       * /api/v1/acciones:
       *   post:
       *     tags:
       *       - Acciones
       *     description: Crear una Accion
       *     consumes:
       *       - application/json
       *     produces: application/json
       *     parameters:
       *       - name: accion
       *         description: accion
       *         in: body
       *         required: true
       *         schema:
       *           $ref: '#/definitions/Accion'
       *     responses:
       *       200:
       *         description: Successfully created
       */
    public async crear({ request }: HttpContextContract) {
        var json = request.raw();
        var accion = TranslateAccion.toAccionFromString(json!!.toString())
        return this.servicio.crearAccion(accion)
    }

    /**
     * @swagger
     * /api/v1/acciones/{id}:
     *   get:
     *     tags:
     *       - Acciones
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
        return this.servicio.obtenerAccionPorId(id)
    }
    /**
    * @swagger
    * /api/v1/acciones/{id}:
    *   put:
    *     tags:
    *       - Acciones
    *     summary: Actualizar por id
    *     produces: application/json
    *     parameters:
    *       - name: accion
    *         description: accion
    *         in: body
    *         required: true
    *         schema:
    *           $ref: '#/definitions/Accion'
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
        var json = request.raw();
        var accion = TranslateAccion.toAccionFromString(json!!.toString())
        return this.servicio.actualizarAccion(accion, id)
    }
}