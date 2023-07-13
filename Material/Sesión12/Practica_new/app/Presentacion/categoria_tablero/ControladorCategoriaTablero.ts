import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ServicioCategoriaTablero } from "App/Dominio/Datos/Servicios/ServicioCategoriaTablero";
import { RepositorioCategoriaTableroDb } from "App/Infrestructura/Implementacion/BaseDatos/RepositorioCategoriaTableroDB";
import { TranslateCategoriaTablero } from "../datos/dto/CategoriaTableroDto";

const NodeCache = require("node-cache");
const cache = new NodeCache({useClones: false});

export default class ControladorCategoriaTablero {
  private service: ServicioCategoriaTablero;
  constructor() {
    this.service = new ServicioCategoriaTablero(
      new RepositorioCategoriaTableroDb()
    );
  }

  /**
   * @swagger
   * /api/v1/categorias_tablero/listar:
   *   get:
   *     tags:
   *       - Categoria Tablero
   *     summary: CategoriaTablero de un usuario
   *     responses:
   *       200:
   *           description: Acción ejecutada correctamente.
   *           content:
   *               application/json:
   *                   schema:
   *                       type: object
   *                       properties:
   *                           categorias:
   *                               type: array
   *                               items:
   *                                 properties:
   *                                   id:
   *                                       type: number
   *                                       descripcion: identificación de la acción
   *                                   titulo:
   *                                       type: string
   *                                       descripcion: titulo de categoria
   *                                   iconapp:
   *                                       type: string
   *                                       descripcion: icono de categoria
   *                                   estado:
   *                                       type: boolean
   *                                       descripcion: estado de categoria
   *                   example:
   *                     {
   *                        "categorias": [
   *                            {
   *                            "id": 1,
   *                            "titulo": "Gubernamental",
   *                            "iconapp": "https://cdn0.iconfinder.com/data/icons/dota-2-2/32/Recipe-256.png",
   *                            "estado": true
   *                            },
   *                            {
   *                            "id": 2,
   *                            "titulo": "Medio Ambiente",
   *                            "iconapp": "https://cdn0.iconfinder.com/data/icons/dota-2-2/32/Recipe-256.png",
   *                            "estado": true
   *                            }
   *                        ]
   *                    }
   */
  public async listar() {
    let categorias;
    const key = 'categorias_tablero_1';
    if (cache.has(key)) {
      categorias = cache.get(key);
    } else {
      categorias = await this.service.obtenerCategoriaTablero();
      cache.set(key, categorias);
    }

    return { categorias}
  }

  /**
   * @swagger
   * /api/v1/categorias_tablero/listartodas:
   *   get:
   *     tags:
   *       - Categoria Tablero
   *     summary: CategoriaTablero de un usuario
   *     responses:
   *       200:
   *           description: Acción ejecutada correctamente.
   *           content:
   *               application/json:
   *                   schema:
   *                       type: object
   *                       properties:
   *                           categorias:
   *                               type: array
   *                               items:
   *                                 properties:
   *                                   id:
   *                                       type: number
   *                                       descripcion: identificación de la acción
   *                                   titulo:
   *                                       type: string
   *                                       descripcion: titulo de categoria
   *                                   iconapp:
   *                                       type: string
   *                                       descripcion: icono de categoria
   *                                   estado:
   *                                       type: boolean
   *                                       descripcion: estado de categoria
   *                   example:
   *                     {
   *                        "categorias": [
   *                            {
   *                            "id": 1,
   *                            "titulo": "Gubernamental",
   *                            "iconapp": "https://cdn0.iconfinder.com/data/icons/dota-2-2/32/Recipe-256.png",
   *                            "estado": true
   *                            },
   *                            {
   *                            "id": 2,
   *                            "titulo": "Medio Ambiente",
   *                            "iconapp": "https://cdn0.iconfinder.com/data/icons/dota-2-2/32/Recipe-256.png",
   *                            "estado": true
   *                            }
   *                        ]
   *                    }
   */
  public async listartodas() {
    let categorias;
    const key = 'categorias_tablero_2';
    if (cache.has(key)) {
      categorias = cache.get(key);
    } else {
      categorias = await this.service.obtenerCategoriaTodas() ;
      cache.set(key, categorias);
    }

    return { categorias}
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
   *           description: Acción ejecutada correctamente.
   *           content:
   *               application/json:
   *                   schema:
   *                       type: object
   *                       properties:
   *                           categorias:
   *                               type: array
   *                               properties:
   *                                   id:
   *                                       type: number
   *                                       descripcion: identificación del tablero
   *                                   titulo:
   *                                       type: string
   *                                       descripcion: titulo de categoria tablero
   *                                   iconapp:
   *                                       type: string
   *                                       descripcion: icono de categoria tablero
   *                                   estado:
   *                                       type: boolean
   *                                       descripcion: estado de categoria tablero
   *
   *                   example:
   *                     {
   *                        "categorias": [
   *                             {
   *                            "id": 1,
   *                             "titulo": "Gubernamental",
   *                             "iconapp": "https://cdn0.iconfinder.com/data/icons/dota-2-2/32/Recipe-256.png",
   *                             "estado": true
   *                             },
   *                             {
   *                             "id": 2,
   *                             "titulo": "Medio Ambiente",
   *                             "iconapp": "https://cdn0.iconfinder.com/data/icons/dota-2-2/32/Recipe-256.png",
   *                             "estado": true
   *                             },
   *                             {
   *                             "id": 3,
   *                             "titulo": "Infraestructura y Catastro",
   *                             "iconapp": "https://cdn0.iconfinder.com/data/icons/dota-2-2/32/Recipe-256.png",
   *                             "estado": true
   *                             },
   *                             {
   *                             "id": 4,
   *                             "titulo": "categoria tablero",
   *                             "iconapp": "http://iamgenes/img.png",
   *                             "estado": true
   *                             }
   *                         ]
   *                    }
   */
  public async tablero() {
    let categorias;
    const key = 'categorias_tablero_3';
    if (cache.has(key)) {
      categorias = cache.get(key);
    } else {
      categorias =await this.service.obtenerCategoriaTablero();
      cache.set(key, categorias);
    }

    return { categorias}
  }

  /**
   * @swagger
   * /api/v1/categorias_tablero:
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
    var categoriaTablero =
      TranslateCategoriaTablero.toCategoriaTableroFromString(json + "");
    return this.service.crearCategoriaTablero(categoriaTablero);
  }

  /**
   * @swagger
   * /api/v1/categorias_tablero/{id}:
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
   *         description: Successfully created
   *         content:
   *               application/json:
   *                   schema:
   *                       type: object
   *                       properties:
   *                          id:
   *                              type: number
   *                              descripcion: identificación de la acción
   *                          titulo:
   *                              type: string
   *                              descripcion: titulo de categoria
   *                          iconapp:
   *                              type: string
   *                              descripcion: icono de categoria
   *                          estado:
   *                              type: boolean
   *                              descripcion: estado de categoria
   *                   example:
   *                     {
   *
   *                          "id": 1,
   *                          "titulo": "Gubernamental",
   *                          "iconapp": "http://iamgenes/img.png",
   *                          "estado": true
   *
   *                    }
   */
  public async buscar({ request }: HttpContextContract) {
    var id = request.param("id");
    let resp;
    const key = 'cat_tab_' + id;
    if (cache.has(key)) {
        resp = cache.get(key);
    } else {
        resp = await this.service.obtenerCategoriaTableroPorId(id);
        cache.set(key, resp);
    }
    return resp;
  }
  /**
   * @swagger
   * /api/v1/categorias_tablero/{id}:
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
   *           $ref: '#/definitions/CategoriaTabler'
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
    var id = request.param("id");
    var json = request.raw();
    this.borrarCache();
    var accion = TranslateCategoriaTablero.toCategoriaTableroFromString(
      json + ""
    );
    return this.service.actualizarCategoriaTablero(accion, id);
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
