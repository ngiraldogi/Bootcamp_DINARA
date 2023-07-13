import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioCategoriaTablero } from "App/Dominio/Datos/Servicios/ServicioCategoriaTablero";
import { RepositorioCategoriaTableroDb } from "App/Infrestructura/Implementacion/BaseDatos/RepositorioCategoriaTableroDB";
import { TranslateCategoriaTablero } from '../datos/dto/CategoriaTableroDto';

export default class ControladorCategoriaTablero {
    private service: ServicioCategoriaTablero
    constructor() {
        this.service = new ServicioCategoriaTablero(new RepositorioCategoriaTableroDb())
    }

    /**
    * @swagger
    * /api/v1/categoria_tablero/listar:
    *   get:
    *     tags:
    *       - Categoria Tablero
    *     summary: CategoriaTablero de un usuario
    *     responses:
    *       200:
    *           message: ok
    */
    public async listar() {
        return { "categorias": await this.service.obtenerCategoriaTablero() }
    }

    /**
   * @swagger
   * /api/v1/tablero/categorias_listar:
   *   get:
   *     tags:
   *       - Tableros
   *     summary: Categoria Tablero de un usuario
   *     responses:
   *       200:
   *           message: ok
   */
    public async tablero() {
        var categorias = await this.service.obtenerCategoriaTablero()
        var result = { categorias: categorias }
        return result
    }

    /**
     * @swagger
     * /api/v1/categoria_tablero:
     *   post:
     *     tags:
     *       - Categoria Tablero
     *     description: Crear una categoria con accion
     *     produces: application/json
     *     parameters:
     *       - name: categoria
     *         description: categoria
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/CategoriaTablero'
     *     responses:
     *       200:
     *         description: Successfully created
     */
    public async crear({ request }: HttpContextContract) {
        var json = request.raw();
        var categoriaTablero = TranslateCategoriaTablero.toCategoriaTableroFromString(json!!.toString())
        return this.service.crearCategoriaTablero(categoriaTablero)
    }

    /**
     * @swagger
     * /api/v1/categoria_tablero/{id}:
     *   get:
     *     tags:
     *       - Categoria Tablero
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
        return this.service.obtenerCategoriaTableroPorId(id)
    }
    /**
    * @swagger
    * /api/v1/categoria_tablero/{id}:
    *   put:
    *     tags:
    *       - Categoria Tablero
    *     summary: Actualizar por id
    *     produces: application/json
    *     parameters:
    *       - name: accion
    *         description: accion
    *         in: body
    *         required: true
    *         schema:
    *           $ref: '#/definitions/CategoriaTablero'
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
        var accion = TranslateCategoriaTablero.toCategoriaTableroFromString(json!!.toString())
        return this.service.actualizarCategoriaTablero(accion, id)
    }
}