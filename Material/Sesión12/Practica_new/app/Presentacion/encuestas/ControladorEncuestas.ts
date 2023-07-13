import { Exception } from '@adonisjs/core/build/standalone';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { RespuestaEncuesta } from 'App/Dominio/Datos/Entidades/RespuestaEncuesta';
import { ServicioEncuestas } from "App/Dominio/Datos/Servicios/ServicioEncuestas";
import { RepositorioEncuestasDb } from "App/Infrestructura/Implementacion/BaseDatos/RepositorioEncuestasDB";
import { TranslateEncuesta, TranslatePreguntaEncuesta, TranslateRespuestaEncuesta } from '../datos/dto/EncuestaDto';

export default class ControladorEncuestas {
    private servicio: ServicioEncuestas
    constructor() {
        this.servicio = new ServicioEncuestas(new RepositorioEncuestasDb())
    }
    /**
    * @swagger
    * /api/v1/encuestas/listar:
    *   get:
    *     tags:
    *       - Encuestas
    *     summary: Encuestas de un usuario
    *     responses:
    *       200:
    *           description: Acción ejecutada correctamente.
    *           content:
    *               application/json:
    *                   schema:
    *                       type: object
    *                       properties:
    *                           encuestas:
    *                               type: array
    *                               items:
    *                                 properties:
    *                                   id:
    *                                       type: number
    *                                       descripcion: identificación del tablero
    *                                   titulo:
    *                                       type: string
    *                                       descripcion: titulo de encuesta
    *                                   fecha:
    *                                       type: string
    *                                       descripcion: fecha de encuesta
    *                   example:
    *                     {
    *
    *                        "encuestas": [
    *                            {
    *                            "id": 2,
    *                            "titulo": "Encuesta de satisfacción de evento",
    *                            "fecha": "2021-10-26T14:16:03.445Z"
    *                            },
    *                            {
    *                            "id": 6,
    *                            "titulo": "electrodomésticos",
    *                            "fecha": null
    *                            }
    *                        ]
    *                      }
    *
    */
    public async listar({request}:HttpContextContract) {
        const parametrosQuery = request.qs()
        let inactivos = parametrosQuery['inactivos']
        inactivos = inactivos == 'true' ? true : false;
        return { "encuestas": await this.servicio.obtenerEncuestas() }
    }

        /**
    * @swagger
    * /api/v1/encuestas/listartodas:
    *   get:
    *     tags:
    *       - Encuestas
    *     summary: Encuestas de un usuario
    *     responses:
    *       200:
    *           description: Acción ejecutada correctamente.
    *           content:
    *               application/json:
    *                   schema:
    *                       type: object
    *                       properties:
    *                           encuestas:
    *                               type: array
    *                               items:
    *                                 properties:
    *                                   id:
    *                                       type: number
    *                                       descripcion: identificación del tablero
    *                                   titulo:
    *                                       type: string
    *                                       descripcion: titulo de encuesta
    *                                   fecha:
    *                                       type: string
    *                                       descripcion: fecha de encuesta
    *                   example:
    *                     {
    *
    *                        "encuestas": [
    *                            {
    *                            "id": 2,
    *                            "titulo": "Encuesta de satisfacción de evento",
    *                            "fecha": "2021-10-26T14:16:03.445Z"
    *                            },
    *                            {
    *                            "id": 6,
    *                            "titulo": "electrodomésticos",
    *                            "fecha": null
    *                            }
    *                        ]
    *                      }
    *
    */
         public async listartodas() {
            return { "encuestas": await this.servicio.obtenerEncuestasTodas() }
        }

    /**
       * @swagger
       * /api/v1/encuestas:
       *   post:
       *     tags:
       *       - Encuestas
       *     description: Crear una Encuesta
       *     consumes:
       *       - application/json
       *     produces: application/json
       *     parameters:
       *       - name: encuesta
       *         description: encuesta
       *         in: body
       *         required: true
       *         schema:
       *           $ref: '#/definitions/Encuesta'
       *     responses:
       *       200:
       *         description: Successfully created
       *         content:
       *               application/json:
       *                   schema:
       *                       type: object
       *                       properties:
       *                          estatus:
       *                              type: number
       *                              descripcion: estado de la peticion
       *                          mansaje:
       *                              type: string
       *                              descripcion: respuesta del servidor
       *                   example:
       *                     {
       *
       *                          "estatus": 1,
       *                          "mansaje": "almacenado"
       *
       *                    }
       */
    public async crear({ request }: HttpContextContract) {
        var json = request.raw();
        var encuesta = TranslateEncuesta.toEncuestaFromString(json + "")
        return this.servicio.crearEncuestas(encuesta)
    }

    public async crearPregunta({ request }: HttpContextContract) {
        var json = request.raw();
        var encuesta = TranslatePreguntaEncuesta.toPreguntaEncuestaFromString(json + "")
        return this.servicio.crearPreguntaEncuesta(encuesta)
    }

    public async crearRespuesta({ request }: HttpContextContract) {
        var json = request.raw();
        var encuesta = TranslateRespuestaEncuesta.toRespuestaEncuestaFromString(json + "")
        return this.servicio.crearRespuestaEncuesta(encuesta)
    }

    public async crearRespuestas({ request }: HttpContextContract) {
        var json = request.raw();
        //console.log(json)
        var array: RespuestaEncuesta[] = JSON.parse(json!!)

        array["respuestas"].forEach(async r => {

            var arreglorest: RespuestaEncuesta
            arreglorest = new RespuestaEncuesta()
            arreglorest.id_pregunta = r.pregunta_id
            arreglorest.valor = r.valor
            arreglorest.id_encuesta = array["encuesta_id"]
            await this.servicio.crearRespuestaEncuesta(arreglorest)
        });

        return { "estatus": 1, "mansaje": "almacenado" }
    }


    /**
     * @swagger
     * /api/v1/encuestas/{id}:
     *   get:
     *     tags:
     *       - Encuestas
     *     summary: Consultar por id
     *     parameters:
     *       - name: id
     *         in: path
     *         type: int
     *     responses:
     *       200:
     *           description: Acción ejecutada correctamente.
     *           content:
     *               application/json:
     *                   schema:
     *                       type: object
     *                       properties:
     *                                   id:
     *                                       type: number
     *                                       descripcion: identificación del tablero
     *                                   titulo:
     *                                       type: string
     *                                       descripcion: titulo de encuesta
     *                                   fecha:
     *                                       type: string
     *                                       descripcion: fecha de encuesta
     *                   example:
     *                     {
     *
     *                            "id": 2,
     *                            "titulo": "Encuesta de satisfacción de evento",
     *                            "fecha": "2021-10-26T14:16:03.445Z"
     *
     *                      }
     */
    public async buscar({ request }: HttpContextContract) {
        var id = request.param('id')
        return this.servicio.obtenerEncuestaPorId(id)
    }

    public async buscarPreguntas({ request }: HttpContextContract) {
        var id = request.param('id')
        return { "preguntas": await this.servicio.obtenerPreguntasPorEncuestaId(id) }
    }

    public async buscarRespuestas({ request }: HttpContextContract) {
        var id = request.param('id')
        return { "respuestas": await this.servicio.obtenerRespuestasPorEncuestaId(id) }
    }


    /**
    * @swagger
    * /api/v1/encuestas/{id}:
    *   put:
    *     tags:
    *       - Encuestas
    *     summary: Actualizar por id
    *     produces: application/json
    *     parameters:
    *       - name: encuesta
    *         description: encuesta
    *         in: body
    *         required: true
    *         schema:
    *           $ref: '#/definitions/Encuesta'
    *       - name: id
    *         in: path
    *         type: int
    *     responses:
       *       200:
       *         description: Successfully created
       *         content:
       *               application/json:
       *                   schema:
       *                       type: object
       *                       properties:
       *                          estatus:
       *                              type: number
       *                              descripcion: estado de la peticion
       *                          mansaje:
       *                              type: string
       *                              descripcion: respuesta del servidor
       *                   example:
       *                     {
       *
       *                          "estatus": 1,
       *                          "mansaje": "almacenado"
       *
       *                    }
    */
    public async actualizar({ request }: HttpContextContract) {
        var id = request.param('id')
        var json = request.raw();
        var encuesta = TranslateEncuesta.toEncuestaFromString(json + "")
        return this.servicio.actualizarEncuestas(encuesta, id)
    }

    public async obtenerEncuestasPorCategoria({ request, response }: HttpContextContract){
        const idCategoria = request.param('idCategoria')
        if(idCategoria == null || idCategoria == undefined ){
            throw new Exception('El parámetro de url "idCategoria" es requerdo', 400)
        }
        const encuestas = await this.servicio.obtenerEncuestasPorCategoria(idCategoria)
        response.status(200).send({
            "encuestas": encuestas
        })
    }

    public async cambiarOrdenEncuesta({ request, response }: HttpContextContract){
        const idEncuesta = request.param('idEncuesta')
        const orden = request.param('orden')
        if(idEncuesta == null || idEncuesta == undefined || orden == null || orden == undefined){
            throw new Exception('Los parámetros de url "idEncuesta" y "orden" son requeridos', 400)
        }
        await this.servicio.cambiarOrdenEncuesta(idEncuesta, orden)
        response.status(200).send({
            estado: 1,
            mensaje: "almacenado"
        })
    }

    public async filtrar({ request }: HttpContextContract) {
        var json = request.all();
        return this.servicio.filtrarEncuestas(json)
    }
}
