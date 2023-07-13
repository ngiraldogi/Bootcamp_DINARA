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
    *           message: ok
    */
    public async listar() {
        return { "encuestas": await this.servicio.obtenerEncuestas() }
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
       */
    public async crear({ request }: HttpContextContract) {
        var json = request.raw();
        var encuesta = TranslateEncuesta.toEncuestaFromString(json!!.toString())
        return this.servicio.crearEncuestas(encuesta)
    }

    public async crearPregunta({ request }: HttpContextContract) {
        var json = request.raw();
        var encuesta = TranslatePreguntaEncuesta.toPreguntaEncuestaFromString(json!!.toString())
        return this.servicio.crearPreguntaEncuesta(encuesta)
    }

    public async crearRespuesta({ request }: HttpContextContract) {
        var json = request.raw();
        var encuesta = TranslateRespuestaEncuesta.toRespuestaEncuestaFromString(json!!.toString())
        return this.servicio.crearRespuestaEncuesta(encuesta)
    }

    public async crearRespuestas({ request }: HttpContextContract) {
        var json = request.raw();
        var array: RespuestaEncuesta[] = JSON.parse(json!!)
        for (const key in array) {
            await this.servicio.crearRespuestaEncuesta(array[key])
        }
        return { "code": 200 }
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
     *         description: Consultar por id
     *         example:
     *           message: OK
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
    *         description: Consultar por id
    *         example:
    *           message: OK
    */
    public async actualizar({ request }: HttpContextContract) {
        var id = request.param('id')
        var json = request.raw();
        var encuesta = TranslateEncuesta.toEncuestaFromString(json!!.toString())
        return this.servicio.actualizarEncuestas(encuesta, id)
    }
}