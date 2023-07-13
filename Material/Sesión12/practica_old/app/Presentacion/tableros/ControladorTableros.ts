import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioTableros } from 'App/Dominio/Datos/Servicios/ServicioTableros';
import { RepositorioCategoriaTableroDb } from 'App/Infrestructura/Implementacion/BaseDatos/RepositorioCategoriaTableroDB';
import { RepositorioTablerosDB } from "App/Infrestructura/Implementacion/BaseDatos/RepositorioTablerosDB";
import { TranslateTablero } from '../datos/dto/TableroDto';

export default class ControladorTableros {
    private servicio: ServicioTableros
    constructor() {
        this.servicio = new ServicioTableros(new RepositorioTablerosDB(), new RepositorioCategoriaTableroDb())
    }

    /**
    * @swagger
    * /api/v1/tableros/listar:
    *   get:
    *     tags:
    *       - Tableros
    *     summary: Tableros
    *     responses:
    *       200:
    *           message: ok
    */

    public async listar() {
        var tableros = await this.servicio.obtenerTableros()
        for (const key in tableros) {
            var categoria = await this.servicio.buscarCategoriaTablero(tableros[key].categorias_id)
            tableros[key].categoria = categoria.titulo
        }
        return { "tableros": tableros }
    }

    /**
   * @swagger
   * /api/v1/tableros:
   *   post:
   *     tags:
   *       - Tableros
   *     description: Crear un Talero
   *     produces: application/json
   *     parameters:
   *       - name: tablero
   *         description: tablero
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Tablero'
   *     responses:
   *       200:
   *         description: Successfully created
   */
    public async crear({ request }: HttpContextContract) {
        var json = request.raw();
        var tablero = TranslateTablero.toTableroFromString(json!!.toString())
        return this.servicio.crearTablero(tablero)

    }
    /**
    * @swagger
    * /api/v1/tableros/{id}:
    *   get:
    *     tags:
    *       - Tableros
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
        return this.servicio.obtenerTableroPorId(id)
    }

    /**
   * @swagger
   * /api/v1/tableros/{id}:
   *   put:
   *     tags:
   *       - Tableros
   *     summary: Actualizar por id
   *     produces: application/json
   *     parameters:
   *       - name: tablero
   *         description: tablero
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Tablero'
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
        var tablero = TranslateTablero.toTableroFromString(json!!.toString())
        return this.servicio.actualizarTablero(tablero, id)
    }


    /**
    * @swagger
    * /api/v1/tableros/categoria/{id}:
    *   get:
    *     tags:
    *       - Tableros
    *     summary: Consultar todos los tableros por categoria id
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
    public async buscarPorCategoria({ request }: HttpContextContract) {
        var id = request.param('id')
        return this.servicio.buscarTablerosPorCategoria(id)
    }

}