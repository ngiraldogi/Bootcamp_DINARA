import { Tablero } from "App/Dominio/Datos/Entidades/Tablero";

/** 
*  @swagger
*  definitions:
*    Tablero:
*      type: object
*      properties:
*        id:
*          type: uint
*        nombre:
*          type: string
*        descripcion:
*          type: string
*        iconoapp:
*          type: string
*        embedcode:
*          type: string
*      required:
*        - nombre
*        - descripcion
*        - iconoapp
*        - embedcode
*/

export class TableroDto {
    id: string;
    nombre: string;
    descripcion: string;
    iconoapp: string;
    embedcode: string;
}

// Converts JSON strings to/from your types
export class TranslateTablero {
    public static toTableroFromString(json: string){
        return JSON.parse(json);
    }

    public static tableroToJson(value: Tablero): string {
        return JSON.stringify(value);
    }
}