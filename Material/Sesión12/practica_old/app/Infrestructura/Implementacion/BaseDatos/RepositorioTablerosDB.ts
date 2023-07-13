import Database from '@ioc:Adonis/Lucid/Database'
import { Tablero } from 'App/Dominio/Datos/Entidades/Tablero';
import { TblCategoriasTableros } from 'App/Infrestructura/datos/entidades/CategoriasTablero';
import { TblTableros } from 'App/Infrestructura/datos/entidades/Tableros';
import { Respuesta } from 'App/Infrestructura/datos/respuestas/Respuesta';
import { RepositorioTableros } from "../../../Dominio/Repositorios/RepositorioTableros";


export class RepositorioTablerosDB implements RepositorioTableros {

    private tabla = 'tbl_tableros'
    async actualizarTablero(tablero: Tablero, id: number): Promise<any> {
        try {
            await TblTableros
                .query()
                .where('id', id)
                .update({
                    nombre: tablero.nombre,
                    descripcion: tablero.descripcion,
                    iconoapp: tablero.iconoapp,
                })
            return new Respuesta().retorno()
        } catch (error) {
            return new Respuesta("Tableros").retorno()
        }
    }

    async crearTablero(tableroRequest: Tablero): Promise<any> {
        try {
            var tableros = new TblTableros
            if (await TblTableros.findBy("nombre", tableroRequest.nombre) != null)
                return new Respuesta("Tableros").exitente()

            var categorias = new TblCategoriasTableros
            categorias.titulo = tableroRequest.categoria
            categorias.iconapp = "https://cdn0.iconfinder.com/data/icons/dota-2-2/32/Recipe-256.png"
            var categoria_id = await TblCategoriasTableros.findBy("titulo", tableroRequest.categoria)
            tableros.setTablerosDbFromTablero(tableroRequest)
            if (categoria_id != null) {
                categorias.id = categoria_id?.id
            } else {
                await categorias.save()
            }
            tableros.setCategoria(categorias.id)
            await tableros.save()
            return new Respuesta().retorno()
        } catch (error) {
            return new Respuesta("Tableros").retorno()
        }
    }
    
    obtenerTableros(): any {
        try {
            var tableros = Database.from(this.tabla).select('*')
            return tableros;
        } catch (error) {
            return new Respuesta("Tableros").retorno()
        }
    }
    obtenerTableroPorId(id: number): any {
        try {
            var tableros = TblTableros.find(id)
            return tableros;
        } catch (error) {
            return new Respuesta("Tableros").retorno()
        }
    }

    async obtenerTablerosPorCategoriaId(id: number): Promise<any> {
        try {
            var tableros = Database.from(this.tabla).select('*').where('categorias_id', id)
            return tableros
        } catch (error) {
            return new Respuesta("Tableros").retorno()
        }
    }
}
