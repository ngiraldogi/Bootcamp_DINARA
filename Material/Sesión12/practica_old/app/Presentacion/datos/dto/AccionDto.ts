import { Accion } from "App/Dominio/Datos/Entidades/Accion";

/** 
*  @swagger
*  definitions:
*    Accion:
*      type: object
*      properties:
*        id:
*          type: uint
*        nombre:
*          type: string
*        name:
*          type: string
*        filename:
*          type: string
*        estado:
*          type: boolean
*      required:
*        - nombre
*        - name
*        - filename
*        - estado
*/

export class AccionDto {
    id: string;
    nombre: string;
    name: string;
    filename: string;
    estado: boolean;
}

// Converts JSON strings to/from your types
export class TranslateAccion {
    public static toAccionFromString(json: string): Accion {
        return JSON.parse(json);
    }

    public static accionToJson(value: Accion): string {
        return JSON.stringify(value);
    }
}