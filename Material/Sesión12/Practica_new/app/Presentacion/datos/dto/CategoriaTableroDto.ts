import { CategoriaTablero } from "App/Dominio/Datos/Entidades/CategoriaTablero";

/** 
*  @swagger
*  definitions:
*    CategoriaTablero:
*      type: object
*      properties:
*        titulo:
*          type: string
*        iconapp:
*          type: string
*      required:
*        - titulo
*/

export class CategoriaTableroDto {
    id: string;
    titulo: string;
}

// Converts JSON strings to/from your types
export class TranslateCategoriaTablero {
    public static toCategoriaTableroFromString(json: string){
        //console.log(json)
        return JSON.parse(json);
    }

    public static categoriaTableroToJson(value: CategoriaTablero): string {
        return JSON.stringify(value);
    }
}