import { ServicioCalificaciones } from "App/Dominio/Datos/Servicios/ServicioCalificaciones";
import { RepositorioCalificacionesDB } from "App/Infrestructura/Implementacion/BaseDatos/RepositorioCalificacionesDB";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { CalificacionDto } from "../datos/dto/CalificacionDto";

export default class ControladorCalificaciones {
  private servicio: ServicioCalificaciones;

  public constructor() {
    this.servicio = new ServicioCalificaciones(
      new RepositorioCalificacionesDB()
    );
  }

  /**
   * @swagger
   * /api/v1/calificaciones/listar:
   *   parameters:
   *     - name: pagina
   *       in: query
   *       description: Indica la página a consultar
   *       required: false
   *     - name: limite
   *       in: query
   *       description: Número de elementos por página
   *       required: false
   *   get:
   *     tags:
   *       - Calificaciones
   *     summary: Lista las calificaciones de la app paginadas
   *     responses:
   *       200:
   *           description: Acción ejecutada correctamente.
   *           content:
   *               application/json:
   *                   schema:
   *                       type: object
   *                       properties:
   *                           calificaciones:
   *                               type: array
   *                               items:
   *                                 properties:
   *                                   calificacion:
   *                                       type: number
   *                                       description: Número de estrellas asignadas en la calificación
   *                                   que_te_gusta:
   *                                       type: string
   *                                       nullable: true
   *                                       description: Aspectos positivos que el usuario persive de la app
   *                                   que_no_te_gusta:
   *                                       type: string
   *                                       nullable: true
   *                                       description: Aspectos negativos que el usuario persive de la app
   *                                   que_te_gustaria:
   *                                       type: string
   *                                       nullable: true
   *                                       description: Aspectos a mejorar de la app segun el usuario
   *                                   id_dispositivo:
   *                                       type: string
   *                                       nullable: true
   *                                       description: Identificador del dispositivo de donde se calificó
   *                                   id_usuario:
   *                                       type: string
   *                                       nullable: true
   *                                       description: Identificador del usuario que calificó
   *
   *                   example:
   *                     {
   *                       "calificaciones": [
   *                           {
   *                               "calificacion": 5,
   *                               "que_te_gusta": "Puedo pagar mis impuestos sin salir de casa",
   *                               "que_no_te_gusta": "No lo sé",
   *                               "que_te_gustaria": "",
   *                               "id_usuario": "",
   *                               "id_dispositivo": ""
   *                           },
   *                           {
   *                               "calificacion": 4,
   *                               "que_te_gusta": "Prueba",
   *                               "que_no_te_gusta": "Prueba",
   *                               "que_te_gustaria": "Prueba",
   *                               "id_usuario": "prueba",
   *                               "id_dispositivo": "fd2079dfc234c925"
   *                           }
   *                          ]
   *                        }
   */
  public async obtener({ request, response }: HttpContextContract) {
    const pagina = request.param("pagina") || 1;
    const limite = request.param("limite") || 5;

    const calificaciones = await this.servicio.obtenerCalificaciones(
      pagina,
      limite
    );

    let calificacionesDto = calificaciones.map((calificacion) => {
      let calificacionDto = new CalificacionDto();
      calificacionDto.establecerDto(calificacion);
      return calificacionDto;
    });
    response.status(200).send({
      calificaciones: calificacionesDto,
    });
  }

  /**
   * @swagger
   * /api/v1/calificaciones/crear:
   *   post:
   *     tags:
   *       - Calificaciones
   *     summary: Almacena una nueva calificación de la app
   *     parameters:
   *      - in: body
   *        description: Calificación a crear
   *        schema:
   *           type: object
   *           required:
   *              - calificacion
   *           properties:
   *               calificacion:
   *                   type: number
   *                   description: Número de estrellas asignadas en la calificación
   *               que_te_gusta:
   *                   type: string
   *                   nullable: true
   *                   description: Aspectos positivos que el usuario persive de la app
   *               que_no_te_gusta:
   *                   type: string
   *                   nullable: true
   *                   description: Aspectos negativos que el usuario persive de la app
   *               que_te_gustaria:
   *                   type: string
   *                   nullable: true
   *                   description: Aspectos a mejorar de la app segun el usuario
   *               id_dispositivo:
   *                   type: string
   *                   nullable: true
   *                   description: Identificador del dispositivo de donde se calificó
   *               id_usuario:
   *                   type: string
   *                   nullable: true
   *                   description: Identificador del usuario que calificó
   *     responses:
   *       201:
   *           description: La calificación se almacenó correctamente.
   *           content:
   *               application/json:
   *                   schema:
   *                       type: object
   *                       properties:
   *                           calificaciones:
   *                               type: array
   *                               items:
   *                                 properties:
   *                                   mensaje:
   *                                       type: string
   *                                       description: Mensaje
   *                                   estado:
   *                                       type: integer
   *                                       description: Código HTTP
   *                   example:
   *                     {
   *                       "mensaje" : " ... ",
   *                       "estado" : 201
   *                     }
   */
  public async guardar({ request, response }: HttpContextContract) {
    let json = request.raw();
    if (!json) {
      return response.status(400).send({
        mensaje: "El cuerpo de la petición no puede estar vacío",
      });
    }
    const peticion: CalificacionDto = JSON.parse(json);
    await this.servicio.guardarCalificacion(
      peticion.calificacion,
      peticion.que_te_gusta,
      peticion.que_no_te_gusta,
      peticion.que_te_gustaria,
      peticion.id_dispositivo,
      peticion.id_usuario
    );
    return response.status(201).send({
      mensaje: "Se envió la calificación exitosamente",
      estado: 201,
    });
  }
}
