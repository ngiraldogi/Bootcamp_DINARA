import { CategoriaEncuesta } from "../Datos/Entidades/CategoriaEncuesta";

export interface RepositorioCategoriaEncuesta{
    crearCategoriaEncuesta(categoria:CategoriaEncuesta):Promise<boolean>
    listarCategoriasEncuesta(inactivos:boolean):Promise<CategoriaEncuesta[]>
    actualizarCategoriaEncuesta(categoria:CategoriaEncuesta):Promise<boolean>
    obtenerCategoriaEncuestaPorId(id:number):Promise<CategoriaEncuesta>
}