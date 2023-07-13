import { Modulo } from "App/Dominio/Datos/Entidades/Modulo";
/** 
*  @swagger
*  definitions: 
*    Modulo:
*      type: object
*      properties:
*        id:
*          type: int
*        nombre:
*          type: string
*        acciones:
*          type: int[]
*        name:
*          type: string
*        filename:
*          type: string
*        tipo:
*          type: string
*        ruta:
*          type: string
*        estado:
*          type: boolean
*        orden:
*          type: uint
*        tabla_modulo: 
*          type: string 
*      required:
*        - nombre
*         -acciones
*        - name
*        - filename
*        - tipo
*        - ruta
*        - estado
*        - orden
*/
export class ModuloDto {
    id: number;
    nombre: string;
    acciones: number[];
    name: string;
    filename: string;
    tipo: string;
    ruta: string;
    estado: boolean;
    orden: number;
    tabla_modulo: string;
}
export class TranslateModulo {
    public static toModuloFromString(json: string): Modulo {
        return JSON.parse(json);
    }
    public static moduloToJson(value: Modulo): string {
        return JSON.stringify(value)
    }


}