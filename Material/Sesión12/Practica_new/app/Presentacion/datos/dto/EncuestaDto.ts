import { Encuesta } from "App/Dominio/Datos/Entidades/Encuesta";
import { PreguntaEncuesta } from "App/Dominio/Datos/Entidades/PreguntaEncuesta";
import { RespuestaEncuesta } from "App/Dominio/Datos/Entidades/RespuestaEncuesta";

/** 
*  @swagger
*  definitions:
*    Encuesta:
*      type: object
*      properties:
*        id:
*          type: uint
*        titulo:
*          type: string
*        fecha:
*          type: string
*        estado:
*          type: boolean
*      required:
*        - titulo
*        - fecha
*        - estado
*/

export class EncuestaDto {
    id: string;
    titulo: string;
    fecha: string;
    estado: boolean;
}

// Converts JSON strings to/from your types
export class TranslateEncuesta {
    public static toEncuestaFromString(json: string): Encuesta {
        return JSON.parse(json);
    }

    public static encuestaToJson(value: Encuesta): string {
        return JSON.stringify(value);
    }
}


// Converts JSON strings to/from your types
export class TranslatePreguntaEncuesta {
    public static toPreguntaEncuestaFromString(json: string): PreguntaEncuesta {
        return JSON.parse(json);
    }

    public static preguntaEncuestaToJson(value: PreguntaEncuesta): string {
        return JSON.stringify(value);
    }
}


// Converts JSON strings to/from your types
export class TranslateRespuestaEncuesta {
    public static toRespuestaEncuestaFromString(json: string): RespuestaEncuesta {
        return JSON.parse(json);
    }

    public static preguntaEncuestaToJson(value: RespuestaEncuesta): string {
        return JSON.stringify(value);
    }
}