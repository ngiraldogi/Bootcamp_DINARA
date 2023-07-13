import { Tablero } from "App/Dominio/Datos/Entidades/Tablero";

/** 
*  @swagger
*  definitions:
*    Tablero:
*      type: object
*      properties:
*        nombre:
*          type: string
*        descripcion:
*          type: string
*        iconoapp:
*          type: string
*        linktablero:
*          type: string
*        categorias_id:
*          type: number
*        categoria:
*          type: string
*        estado:
*          type: boolean
*      required:
*        - nombre
*        - descripcion
*        - iconoapp
*        - embedcode
*        - estado
*/

export class TableroDto {
    id: string;
    nombre: string;
    descripcion: string;
    iconoapp: string;
    embedcode: string;
    estado: boolean;
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