import { Exception } from "@adonisjs/core/build/standalone";
import { CategoriaEncuesta } from "App/Dominio/Datos/Entidades/CategoriaEncuesta";
import { RepositorioCategoriaEncuesta } from "App/Dominio/Repositorios/RepositorioCategoriaEncuesta";
import { TblCategoriasEncuestas } from "App/Infrestructura/datos/entidades/CategoriasEncuesta";

export class RepositorioCategoriaEncuestaDB implements RepositorioCategoriaEncuesta{

    public async obtenerCategoriaEncuestaPorId(id: number): Promise<CategoriaEncuesta> {
        let categoriaDb = await TblCategoriasEncuestas.find(id)
        if(!categoriaDb){
            throw new Exception(`No se encontró la categoria con id ${id}`)
        }
        return categoriaDb.setCategoriaEncuestaFromCategoriaEncuestaDb()
    }
    
    public async crearCategoriaEncuesta(categoria: CategoriaEncuesta): Promise<boolean> {
        let categoriaDb = new TblCategoriasEncuestas()
        categoriaDb.setCategoriaEncuestaDbFromCategoriaEncuesta(categoria);
        await categoriaDb.save()
        return true
    }
    public async listarCategoriasEncuesta(inactivos = false): Promise<CategoriaEncuesta[]> {
        let categoriasDb:TblCategoriasEncuestas[]
        if(inactivos){
            categoriasDb = await TblCategoriasEncuestas.all()
        }else{
            categoriasDb = await TblCategoriasEncuestas.query().where('cat_estado', '=', true)
        }
        let categorias = categoriasDb.map(categoriaDb =>{
            return categoriaDb.setCategoriaEncuestaFromCategoriaEncuestaDb()
        })
        return categorias
    }
    public async actualizarCategoriaEncuesta(categoria: CategoriaEncuesta): Promise<boolean> {
        let categoriaDb = await TblCategoriasEncuestas.find(categoria.id)
        if(!categoriaDb){
            throw new Exception('No se encontró el id de la categoria a actualizar')
        }
        categoriaDb.setCategoriaEncuestaDbFromCategoriaEncuesta(categoria)
        await categoriaDb.save()
        return true
    }
}