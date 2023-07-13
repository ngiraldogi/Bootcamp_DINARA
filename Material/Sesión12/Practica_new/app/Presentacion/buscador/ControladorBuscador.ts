import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioBuscador } from "App/Dominio/Datos/Servicios/ServicioBuscador";
import { RepositorioBuscadorDb } from "App/Infrestructura/Implementacion/BaseDatos/RepositorioBuscadorDB";

const NodeCache = require("node-cache");
const cache = new NodeCache({useClones: false});

export default class ControladorModulos {
    private servicio: ServicioBuscador
    constructor() {
        this.servicio = new ServicioBuscador(new RepositorioBuscadorDb())
  }

  /**
   * @swagger
   * /api/v1/buscador:
   *   post:
   *     tags:
   *       - Buscador
   *     summary: Busca categorias y servicios por una frase ingresada.
   *     consumes:
   *       - application/json
   *     produces: application/json
   *     parameters:
   *       - name: frase
   *         description: frase a buscar
   *         in: body
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             frase:
   *               type: string
   *               descripcion: frase a buscar
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
   *                                   nombre:
   *                                       type: string
   *                                       descripcion: nombre de categoria
   *                                   filename:
   *                                       type: string
   *                                       descripcion: icono de categoria
   *                                   tipo:
   *                                       type: string
   *                                       descripcion: tipo de categoria
   *                                   ruta:
   *                                       type: string
   *                                       descripcion: ruta de categoria
   *                                   estado:
   *                                       type: boolean
   *                                       descripcion: estado de categoria
   *                                   orden:
   *                                       type: number
   *                                       descripcion: orden de categoria
   *                           servicios:
   *                               type: array
   *                               items:
   *                                 properties:
   *                                   id:
   *                                      type: number
   *                                      descripcion: identificacion del servicio
   *                                   nombre:
   *                                      type: string
   *                                      descripcion: nombre del servicio
   *                                   filename:
   *                                      type: string
   *                                      descripcion: icono del servicio
   *                                   orden:
   *                                      type: number
   *                                      descripcion: orden del servicio
   *                                   json:
   *                                      type: object
   *                                      properties:
   *                                        id_tipo_reporte:
   *                                          type: number
   *                                          descripcion: identificador del tipo de reporte
   *                                        nombre:
   *                                          type: string
   *                                          descripcion: nombre del tipo de reporte
   *                                        descripcion:
   *                                          type: string
   *                                          descripcion: descripcion tipo de reporte
   *                                        orden:
   *                                          type: number
   *                                          descripcion: orden tipo de reporte
   *                                        despues:
   *                                          type: number
   *                                          descripcion: siguiente tipo de reporte
   *                                        icono:
   *                                          type: string
   *                                          descripcion: icono del tipo de reporte
   *                                        json-plantilla:
   *                                          type: object
   *                                        url_servicio:
   *                                           type: string
   *                                           descripcion: url del servicio
   *                                        id_padre:
   *                                           type: number
   *                                           nulleable: true
   *                                           descripcion: identificador del padre
   *                                        version:
   *                                            type: number
   *                                            descripcion: version del tipo de servicio
   *                                   tipo:
   *                                      type: number
   *                                      descripcion: tipo de servicio
   *                   example:
   *                          {
   *                               "categorias": [
   *                                   {
   *                                       "id": 7,
   *                                       "nombre": "HuecosMed",
   *                                       "filename": "ciudadanos.png",
   *                                       "tipo": "",
   *                                       "ruta": "Reportes",
   *                                       "estado": true,
   *                                       "orden": 20
   *                                   }
   *                               ],
   *                               "servicios": [
   *                                   {
   *                                       "id": 1,
   *                                       "nombre": "Huecos y Baches",
   *                                      "filename": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKUAAACuCAYAAABX7M0ZAAAABHNCSVQICAgIfAhkiAAAIABJREFUeF7tnQe4VdXRhkeRJqKgghSlWRJQIuov9oI1tth7FGyoqBQriApEUEhUQESKKNUQOyggJhYUjF0ssSNcRHrvXf95D/fALrNOujajNwLnJFwsyA9DDO7T0TklJUQ4ES1K55fIAqe+7o/JKDerxJeiZ7cfWuIeSIZlLaotmT6SzzOMq1rAO0u3kwZpJf0E75TiiTBxherhlPiRth+Y7z1AGgxVJRIRNCU486VwJ6IN4528oe6ANRWtuV3Kdg9QZJTR1sWHn1DvpAKUXAgiVFyRIeN5Qnexfad87wFCh7A9AkaXDTLhZ/x/nNeQtxaZENwAAAAASUVORK5CYII=",
   *                                      "ruta": "huecos",
   *                                      "estado": true,
   *                                      "orden": 1,
   *                                      "json": {
   *                                          "id_tipo_reporte": 2,
   *                                          "nombre": "Huecos y Baches",
   *                                          "descripcion": "Reporta huecos y baches en la vía pública.",
   *                                          "orden": "2",
   *                                          "despues": 1,
   *                                          "icono": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKUAAACuCAYAAABX7M0ZAAAABHNCSVQICAgIfAhkiAAAIABJREFUeF7tnQe4VdXRhkeRJqKgghSlWRJQIuov9oI1tth7FGyoqBQriApEUEhUQESKKNUQOyggJhYUjF0ssSNcRHrvXf95D/fALrNOufyhv1nJP8ETMcF4xNXpRJrvpEwY2yX/e+B3hQrxlps2xXLeRIh0fR4ax5M7K5oBSuo4s/IJFhinGli8+QFakhA1H1V0/nf/9icoRQ+wgjajNwLnJFwsyA9DDO7T0TklJUQ4ES1K55fIAqe+7o/JKDerxJeiZ7cfWuIeSIZlLaotmT6SzzOMq1rAO0u3kwZpJf0E75TiiTBxherhlPiRth+Y7z1AGgxVJRIRNCU486VwJ6IN4528oe6ANRWtuV3Kdg9QZJTR1sWHn1DvpAKUXAgiVFyRIeN5Qnexfad87wFCh7A9AkaXDTLhZ/x/nNeQtxaZENwAAAAASUVORK5CYII=",
   *                                          "json_plantilla": {
   *                                              "TITULO": "huecos",
   *                                              "plantilla": "3",
   *                                              "title_alert": "",
   *                                              "alert": "",
   *                                              "title_ok": "Su reporte se ha realizado",
   *                                              "ok": "Gracias, en este momento enviaremos su reporte al área encargada para gestionar la solución.",
   *                                              "secciones": {
   *                                                  "mapa": {
   *                                                      "titulo": "Ubicación del reporte",
   *                                                      "labeldireccion": "Dirección del daño en la vía",
   *                                                      "placeholderdir": "",
   *                                                      "ayudadir": "Puede digitar la dirección donde se encuentra el daño o ubicar el PIN en el mapa",
   *                                                      "requeridodir": "1",
   *                                                      "labelref": "Digite un punto de referencia de la dirección",
   *                                                      "placeholderref": "Ejemplo: Cerca al consumo de la 80...",
   *                                                      "ayudaref": "El punto de referencia permitirá ubicar fácilmente la ubicación del daño.",
   *                                                      "requeridoref": "0",
   *                                                      "labelheaderform": "Datos del reporte",
   *                                                      "labelformImages": "Fotografía (s) de evidencia"
   *                                                  },
   *                                                  "fotos": {
   *                                                      "cantidad": 1,
   *                                                      "requeridas": 1
   *                                                  },
   *                                                  "reporte": {
   *                                                      "titulo": "Datos del reporte",
   *                                                      "selects": [],
   *                                                      "cajas": [
   *                                                          {
   *                                                              "label": "Ingresa el correo electrónico de quién reporta",
   *                                                              "placeholder": "",
   *                                                              "ayuda": "",
   *                                                              "requerido": 1,
   *                                                              "alias": "correo",
   *                                                              "tipocampo": "C"
   *                                                          }
   *                                                      ]
   *                                                  }
   *                                              }
   *                                          },
   *                                          "url_servicio": "https://www.medellin.gov.co/api-reportesmed/reporte",
   *                                          "id_padre": null,
   *                                          "version": 1
   *                                      },
   *                                      "tipo": 1
   *                                  }
   *                              ]
   *                          }
   */

      public async buscar({ request }: HttpContextContract) {
        const data = request.all()
        return this.servicio.buscar(data.frase)

    }

}
