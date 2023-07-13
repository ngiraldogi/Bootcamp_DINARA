import { RepositorioCategoriaEncuesta } from "App/Dominio/Repositorios/RepositorioCategoriaEncuesta";
import { CategoriaEncuesta } from "../Entidades/CategoriaEncuesta";

export class ServicioCategoriaEncuesta{
    constructor(private repositorio:RepositorioCategoriaEncuesta){
    }

    public async crearCategoriaEncuesta(categoria:CategoriaEncuesta):Promise<boolean>{
        return this.repositorio.crearCategoriaEncuesta(categoria)
    }

    public async listarCategoriasEncuesta(inactivos = false):Promise<CategoriaEncuesta[]>{
        return this.repositorio.listarCategoriasEncuesta(inactivos)
    }

    public async actualizarEstadoCategoriaEncuesta(id:number):Promise<boolean>{
        let encuesta = await this.repositorio.obtenerCategoriaEncuestaPorId(id)
        encuesta.estado = !encuesta.estado
        return await this.repositorio.actualizarCategoriaEncuesta(encuesta)
    }
}