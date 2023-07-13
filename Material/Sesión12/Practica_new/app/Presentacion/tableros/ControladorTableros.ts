import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ServicioTableros } from "App/Dominio/Datos/Servicios/ServicioTableros";
import { RepositorioCategoriaTableroDb } from "App/Infrestructura/Implementacion/BaseDatos/RepositorioCategoriaTableroDB";
import { RepositorioTablerosDB } from "App/Infrestructura/Implementacion/BaseDatos/RepositorioTablerosDB";
import { TranslateTablero } from "../datos/dto/TableroDto";

const NodeCache = require("node-cache");
const cache = new NodeCache({useClones: false});

export default class ControladorTableros {
  private servicio: ServicioTableros;
  constructor() {
    this.servicio = new ServicioTableros(
      new RepositorioTablerosDB(),
      new RepositorioCategoriaTableroDb()
    );
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
   *           description: Acción ejecutada correctamente.
   *           content:
   *               application/json:
   *                   schema:
   *                       type: object
   *                       properties:
   *                           tableros:
   *                               type: array
   *                               items:
   *                                 properties:
   *                                   id:
   *                                       type: number
   *                                       descripcion: identificación del tablero
   *                                   nombre:
   *                                       type: string
   *                                       descripcion: nombre de tablero
   *                                   descripcion:
   *                                       type: string
   *                                       descripcion: descripacion del tablero
   *                                   iconoapp:
   *                                       type: string
   *                                       descripcion: icono del tablero
   *                                   linktablero:
   *                                       type: string
   *                                       descripcion: enlace directo al tablero
   *                                   categorias_id:
   *                                       type: number
   *                                       descripcion: identificacion de categoria del tablero
   *                                   estado:
   *                                       type: boolean
   *                                       descripcion: estado del tablero
   *                                   categoria:
   *                                       type: string
   *                                       descripcion: categoria del tablero
   *                   example:
   *                     {
   *                        "tableros": [
   *                            {
   *                            "id": 1,
   *                            "nombre": "Beneficios",
   *                            "descripcion": "",
   *                            "iconoapp": "img/tablero/3-a.png",
   *                            "linktablero": "https://public.tableau.com/app/profile/medata/viz/Beneficiosvs2/Dashboard1",
   *                            "categorias_id": 1,
   *                            "estado": true,
   *                            "categoria": "Gubernamental"
   *                            },
   *                            {
   *                            "id": 2,
   *                            "nombre": "Encuesta de cuidadores y animales de compañía",
   *                            "descripcion": null,
   *                            "iconoapp": "img/tablero/14-a.png",
   *                            "linktablero": "https://public.tableau.com/app/profile/medata/viz/V0_1__Prototipo_Animalesdecompaa/pets\n",
   *                            "categorias_id": 2,
   *                            "estado": true,
   *                            "categoria": "Medio Ambiente"
   *                           }
   *                        ]
   *                    }
   *
   */

  public async listar() {
    let tableros;
    const key = 'tableros';
    if (cache.has(key)) {
      tableros = cache.get(key);
    } else {
      tableros = await this.servicio.obtenerTableros();
      for (const key in tableros) {
        var categoria = await this.servicio.buscarCategoriaTablero(
          tableros[key].categorias_id
        );
        tableros[key].categoria = categoria.titulo;
      }
            cache.set(key, tableros);
    }

    return { tableros}



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
    var json = request.all();
    // var tablero = TranslateTablero.toTableroFromString(json + "")
    return this.servicio.crearTablero(json);
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
   *           description: Acción ejecutada correctamente.
   *           content:
   *               application/json:
   *                   schema:
   *                       type: object
   *                       properties:
   *                                   id:
   *                                       type: number
   *                                       descripcion: identificación del tablero
   *                                   nombre:
   *                                       type: string
   *                                       descripcion: nombre de tablero
   *                                   descripcion:
   *                                       type: string
   *                                       descripcion: descripacion del tablero
   *                                   iconoapp:
   *                                       type: string
   *                                       descripcion: icono del tablero
   *                                   linktablero:
   *                                       type: string
   *                                       descripcion: enlace directo al tablero
   *                                   categorias_id:
   *                                       type: number
   *                                       descripcion: identificacion de categoria del tablero
   *                                   estado:
   *                                       type: boolean
   *                                       descripcion: estado del tablero
   *                   example:
   *                     {
   *                            "id": 1,
   *                            "nombre": "Beneficios",
   *                            "descripcion": "",
   *                            "iconoapp": "img/tablero/3-a.png",
   *                            "linktablero": "https://public.tableau.com/app/profile/medata/viz/Beneficiosvs2/Dashboard1",
   *                            "categorias_id": 1,
   *                            "estado": true
   *                      }
   */

  public async buscar({ request }: HttpContextContract) {
    var id = request.param("id");
    let resp;
    const key = 'tablero_' + id;
    if (cache.has(key)) {
        resp = cache.get(key);
    } else {
        resp = await this.servicio.obtenerTableroPorId(id);
        cache.set(key, resp);
    }
    return resp;
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
    var tablero = TranslateTablero.toTableroFromString(json + "");
    this.borrarCache
    return this.servicio.actualizarTablero(tablero, id);
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
   *           description: Acción ejecutada correctamente.
   *           content:
   *               application/json:
   *                   schema:
   *                       type: array
   *                       items:
   *                         properties:
   *                                   id:
   *                                       type: number
   *                                       descripcion: identificación del tablero
   *                                   nombre:
   *                                       type: string
   *                                       descripcion: nombre de tablero
   *                                   descripcion:
   *                                       type: string
   *                                       descripcion: descripacion del tablero
   *                                   iconoapp:
   *                                       type: string
   *                                       descripcion: icono del tablero
   *                                   linktablero:
   *                                       type: string
   *                                       descripcion: enlace directo al tablero
   *                                   categorias_id:
   *                                       type: number
   *                                       descripcion: identificacion de categoria del tablero,
   *                                   estado:
   *                                       type: boolean
   *                                       descripcion: estado del tablero
   *                   example:
   *                     [
   *                            {
   *                            "id": 1,
   *                            "nombre": "Beneficios",
   *                            "descripcion": "",
   *                            "iconoapp": "img/tablero/3-a.png",
   *                            "linktablero": "https://public.tableau.com/app/profile/medata/viz/Beneficiosvs2/Dashboard1",
   *                            "categorias_id": 2,
   *                            "estado": true
   *                            },
   *                            {
   *                            "id": 2,
   *                            "nombre": "Encuesta de cuidadores y animales de compañía",
   *                            "descripcion": null,
   *                            "iconoapp": "img/tablero/14-a.png",
   *                            "linktablero": "https://public.tableau.com/app/profile/medata/viz/V0_1__Prototipo_Animalesdecompaa/pets\n",
   *                            "categorias_id": 2,
   *                            "estado": true
   *                           }
   *                    ]
   */
  public async buscarPorCategoria({ request }: HttpContextContract) {
    var id = request.param("id");
    let resp;
    const key = 'tablero_cat_' + id;
    if (cache.has(key)) {
        resp = cache.get(key);
    } else {
        resp = await this.servicio.buscarTablerosPorCategoria(id);
        cache.set(key, resp);
    }
    return resp;
  }

  /**
   * @swagger
   * /api/v1/tableros/categoriatodas/{id}:
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
   *           description: Acción ejecutada correctamente.
   *           content:
   *               application/json:
   *                   schema:
   *                       type: array
   *                       items:
   *                          properties:
   *                                   id:
   *                                       type: number
   *                                       descripcion: identificación del tablero
   *                                   nombre:
   *                                       type: string
   *                                       descripcion: nombre de tablero
   *                                   descripcion:
   *                                       type: string
   *                                       descripcion: descripacion del tablero
   *                                   iconoapp:
   *                                       type: string
   *                                       descripcion: icono del tablero
   *                                   linktablero:
   *                                       type: string
   *                                       descripcion: enlace directo al tablero
   *                                   categorias_id:
   *                                       type: number
   *                                       descripcion: identificacion de categoria del tablero,
   *                                   estado:
   *                                       type: boolean
   *                                       descripcion: estado del tablero
   *                   example:
   *                     [
   *                            {
   *                            "id": 1,
   *                            "nombre": "Beneficios",
   *                            "descripcion": "",
   *                            "iconoapp": "img/tablero/3-a.png",
   *                            "linktablero": "https://public.tableau.com/app/profile/medata/viz/Beneficiosvs2/Dashboard1",
   *                            "categorias_id": 2,
*                               "estado": false
   *                            },
   *                            {
   *                            "id": 2,
   *                            "nombre": "Encuesta de cuidadores y animales de compañía",
   *                            "descripcion": null,
   *                            "iconoapp": "img/tablero/14-a.png",
   *                            "linktablero": "https://public.tableau.com/app/profile/medata/viz/V0_1__Prototipo_Animalesdecompaa/pets\n",
   *                            "categorias_id": 2,
   *                            "estado": false
   *                           }
   *                    ]
   */
  public async buscarPorCategoriaTodas({ request }: HttpContextContract) {
    var id = request.param("id");
    return this.servicio.buscarTablerosPorCategoriaTodas(id);
  }

  public async prueba({ request }: HttpContextContract) {
    var id = request.param("id");
    var token = await this.servicio.obtenerToken(id);

    return { mensaje: token };
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
