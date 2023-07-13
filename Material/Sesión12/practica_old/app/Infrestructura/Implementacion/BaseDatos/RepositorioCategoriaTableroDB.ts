import Database from '@ioc:Adonis/Lucid/Database'
import { CategoriaTablero } from 'App/Dominio/Datos/Entidades/CategoriaTablero';
import { TblCategoriasTableros } from 'App/Infrestructura/datos/entidades/CategoriasTablero';
import { Respuesta } from 'App/Infrestructura/datos/respuestas/Respuesta';

import { RepositorioCategoriaTablero } from "../../../Dominio/Repositorios/RepositorioCategoriaTablero";


export class RepositorioCategoriaTableroDb implements RepositorioCategoriaTablero {
    private tabla = 'tbl_categorias_tableros'
    async actualizarCategoriaTablero(categoriaTablero: CategoriaTablero, id: number): Promise<any> {
        try {
            await TblCategoriasTableros
                .query()
                .where('id', id)
                .update({
                    titulo: categoriaTablero.titulo,
                    iconapp: categoriaTablero.iconapp,
                })
        } catch (error) {
            return new Respuesta("Categoria Acciones").retorno()
        }
    }

    async crearCategoriaTablero(categoriaTablero: CategoriaTablero): Promise<any> {

        return categoriaTablero
        try {
            var entity = new TblCategoriasTableros()
            entity.setCategoriaTableroDbFromCategoriaTablero(categoriaTablero)
            await entity.save()
            return new Respuesta().retorno()
        } catch (error) {
            return new Respuesta("Categoria Acciones").retorno()
        }

    }
    obtenerCategoriasTablero(): any {
        try {
            var CategoriasTablero = Database.from(this.tabla).select('*')
            return CategoriasTablero;
        } catch (error) {
            return new Respuesta("Categoria Acciones").retorno()
        }

    }
    obtenerCategoriaTableroPorId(id: Number): any {
        try {
            var categoriaTablero = TblCategoriasTableros.find(id)
            return categoriaTablero
        } catch (error) {
            return new Respuesta("Categoria Acciones").retorno()
        }
    }

}