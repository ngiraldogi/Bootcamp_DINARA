import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioModulos } from "App/Dominio/Datos/Servicios/ServicioModulos";
import { RepositorioModulosDb } from "App/Infrestructura/Implementacion/BaseDatos/RepositorioModulosDB";
import { TranslateModulo } from "../datos/dto/ModuloDto";

const NodeCache = require("node-cache");
const cache = new NodeCache({useClones: false});

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
    *           description: Acción ejecutada correctamente.
    *           content:
    *               application/json:
    *                   schema:
    *                       type: object
    *                       properties:
    *                           modulos:
    *                               type: array
    *                               items:
    *                                 properties:
    *                                   id:
    *                                       type: number
    *                                       descripcion: identificación del modulo
    *                                   nombre:
    *                                       type: string
    *                                       descripcion: nombre del modulo
    *                                   acciones:
    *                                       type: array
    *                                       descripcion: acciones
    *                                   name:
    *                                       type: string
    *                                       descripcion: nombre del modulo
    *                                   filename:
    *                                       type: string
    *                                       descripcion: filename del modulo
    *                                   tipo:
    *                                       type: string
    *                                       descripcion: tipo del modulo
    *                                   ruta:
    *                                       type: string
    *                                       descripcion: ruta del modulo
    *                                   estado:
    *                                       type: boolean
    *                                       descripcion: estado del modulo
    *                                   orden:
    *                                       type: number
    *                                       descripcion: orden del modulo
    *                                   tabla_modulo:
    *                                       type: string
    *                                       descripcion: tabla del modulo
    *                   example:
    *                     {
    *                        "modulos": [
    *                            {
    *                            "id": 5,
    *                            "nombre": "Encuestas",
    *                            "acciones": [
    *                                1
    *                            ],
    *                            "name": "Encuestas",
    *                            "filename": "https://tysa.co/alcaldiawilson/iconos/Boton-Medellin-Opina.png",
    *                            "tipo": "news",
    *                            "ruta": "Encuestas",
    *                            "estado": true,
    *                            "orden": 5,
    *                            "tabla_modulo": "modulo"
    *                            },
    *                            {
    *                            "id": 1,
    *                            "nombre": "Noticias y modulos de ciudad",
    *                            "acciones": [
    *                                1
    *                            ],
    *                            "name": "Noticias",
    *                            "filename": "https://tysa.co/alcaldiawilson/iconos/Boton-Noticias.png",
    *                            "tipo": "news",
    *                            "ruta": "News",
    *                            "estado": true,
    *                            "orden": 1,
    *                            "tabla_modulo": "modulo"
    *                            }
    *                        ]
    *                      }
    */

    public async listar() {
        let resp = {};
        const key = 'modulos_1';
        if (cache.has(key)) {
            resp = cache.get(key);
        } else {
            resp = await this.servicio.obtenerModulos();
                cache.set(key, resp);
        }

        return { "modulos": resp }
    }

      /**
    * @swagger
    * /api/v1/modulos/listartodos:
    *   get:
    *     tags:
    *       - Modulos
    *     summary: Modulos
    *     responses:
    *       200:
    *           description: Acción ejecutada correctamente.
    *           content:
    *               application/json:
    *                   schema:
    *                       type: object
    *                       properties:
    *                           modulos:
    *                               type: array
    *                               items:
    *                                 properties:
    *                                   id:
    *                                       type: number
    *                                       descripcion: identificación del modulo
    *                                   nombre:
    *                                       type: string
    *                                       descripcion: nombre del modulo
    *                                   acciones:
    *                                       type: array
    *                                       descripcion: acciones
    *                                   name:
    *                                       type: string
    *                                       descripcion: nombre del modulo
    *                                   filename:
    *                                       type: string
    *                                       descripcion: filename del modulo
    *                                   tipo:
    *                                       type: string
    *                                       descripcion: tipo del modulo
    *                                   ruta:
    *                                       type: string
    *                                       descripcion: ruta del modulo
    *                                   estado:
    *                                       type: boolean
    *                                       descripcion: estado del modulo
    *                                   orden:
    *                                       type: number
    *                                       descripcion: orden del modulo
    *                                   tabla_modulo:
    *                                       type: string
    *                                       descripcion: tabla del modulo
    *                   example:
    *                     {
    *                        "modulos": [
    *                            {
    *                            "id": 5,
    *                            "nombre": "Encuestas",
    *                            "acciones": [
    *                                1
    *                            ],
    *                            "name": "Encuestas",
    *                            "filename": "https://tysa.co/alcaldiawilson/iconos/Boton-Medellin-Opina.png",
    *                            "tipo": "news",
    *                            "ruta": "Encuestas",
    *                            "estado": true,
    *                            "orden": 5,
    *                            "tabla_modulo": "modulo"
    *                            },
    *                            {
    *                            "id": 1,
    *                            "nombre": "Noticias y modulos de ciudad",
    *                            "acciones": [
    *                                1
    *                            ],
    *                            "name": "Noticias",
    *                            "filename": "https://tysa.co/alcaldiawilson/iconos/Boton-Noticias.png",
    *                            "tipo": "news",
    *                            "ruta": "News",
    *                            "estado": true,
    *                            "orden": 1,
    *                            "tabla_modulo": "modulo"
    *                            }
    *                        ]
    *                      }
    */

    public async listartodos() {
        let resp = {};
        const key = 'modulos_2';
        if (cache.has(key)) {
            resp = cache.get(key);
        } else {
            resp = await this.servicio.obtenerModulosTodos();
                cache.set(key, resp);
        }
        return { "modulos": resp }
    }

    /**
   * @swagger
   * /api/v1/modulos:
   *   post:
   *     tags:
   *       - Modulos
   *     description: Crear un modulo
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
        var modulo = TranslateModulo.toModuloFromString(json + "")
        this.borrarCache()
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
    *           description: Acción ejecutada correctamente.
    *           content:
    *               application/json:
    *                   schema:
    *                       type: object
    *                       properties:
    *                                   id:
    *                                       type: number
    *                                       descripcion: identificación del modulo
    *                                   nombre:
    *                                       type: string
    *                                       descripcion: nombre del modulo
    *                                   acciones:
    *                                       type: array
    *                                       descripcion: acciones
    *                                   name:
    *                                       type: string
    *                                       descripcion: nombre del modulo
    *                                   filename:
    *                                       type: string
    *                                       descripcion: filename del modulo
    *                                   tipo:
    *                                       type: string
    *                                       descripcion: tipo del modulo
    *                                   ruta:
    *                                       type: string
    *                                       descripcion: ruta del modulo
    *                                   estado:
    *                                       type: boolean
    *                                       descripcion: estado del modulo
    *                                   orden:
    *                                       type: number
    *                                       descripcion: orden del modulo
    *                                   tabla_modulo:
    *                                       type: string
    *                                       descripcion: tabla del modulo
    *                   example:
    *                     {
    *                            "id": 5,
    *                            "nombre": "Encuestas",
    *                            "acciones": [
    *                                1
    *                            ],
    *                            "name": "Encuestas",
    *                            "filename": "https://tysa.co/alcaldiawilson/iconos/Boton-Medellin-Opina.png",
    *                            "tipo": "news",
    *                            "ruta": "Encuestas",
    *                            "estado": true,
    *                            "orden": 5,
    *                            "tabla_modulo": "modulo"
    *                      }
    */

    public async buscar({ request }: HttpContextContract) {
        const id = request.param('id')
        let resp;
        const key = 'modulo_' + id;
        if (cache.has(key)) {
            resp = cache.get(key);
        } else {
            resp = await this.servicio.obtenerModuloPorId(id);
            cache.set(key, resp);
        }
        return resp;

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
        var json = request.raw()
        var modulo = TranslateModulo.toModuloFromString(json + "")
        this.borrarCache()
        return this.servicio.actualizarModulo(modulo, id)
    }

    public obtenerCache = async () => {
        const llaves = cache.keys();
        const estadisticas = cache.getStats();
        return { llaves, estadisticas }

    }

    public borrarCache = () => {
        cache.flushAll(); //datos
        cache.flushStats(); //Estadisticas
        return JSON.stringify({ "resp": true, "mensaje": "Cache borrada" });
    }

}
