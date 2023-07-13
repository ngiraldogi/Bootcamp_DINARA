import Database from '@ioc:Adonis/Lucid/Database'
import { Tablero } from 'App/Dominio/Datos/Entidades/Tablero';
import { TblCategoriasTableros } from 'App/Infrestructura/datos/entidades/CategoriasTablero';
import { TblTableros } from 'App/Infrestructura/datos/entidades/Tableros';
import { Respuesta } from 'App/Infrestructura/datos/respuestas/Respuesta';
import { RepositorioTableros } from "../../../Dominio/Repositorios/RepositorioTableros";
import axios from 'axios';


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
                    estado: tablero.estado
                })
            return new Respuesta().retorno()
        } catch (error) {
            return new Respuesta("Tableros").retorno()
        }
    }

    async crearTablero(tableroRequest: any): Promise<any> {
        try {
            var tableros = new TblTableros
            if (await TblTableros.findBy("tab_nombre", tableroRequest.nombre) != null)
                return new Respuesta("Tableros").exitente()

            var categorias = new TblCategoriasTableros
            categorias.titulo = tableroRequest.categoria

           categorias.iconapp = tableroRequest.iconapp
           
            var categoria_id = await TblCategoriasTableros.findBy("cat_titulo", tableroRequest.categoria)
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
            console.log(error)
            return new Respuesta("Tableros").retorno()
        }
    }
    
    async obtenerTableros() {
        try {
            let tablerosArray: any = []
            var tableros =await  Database.from(this.tabla).select('*')
            tableros.forEach(element => {
                tablerosArray.push({                  

                    "id": element.id,
                    "nombre": element.tab_nombre,
                    "descripcion": element.tab_descripcion,
                    "iconoapp": element.tab_iconoapp,
                    "linktablero": element.tab_linktablero,
                    "categorias_id": element.tab_categorias_id,
                    "estado": element.tab_estado
                })
            });
            return tablerosArray
        } catch (error) {
            return error;
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
            let tablerosArray: any = []
            var tableros = await Database.from(this.tabla).select('*').where('tab_categorias_id', id).andWhere('tab_estado', true)
            tableros.forEach(element => {
                tablerosArray.push({                  

                    "id": element.id,
                    "nombre": element.tab_nombre,
                    "descripcion": element.tab_descripcion,
                    "iconoapp": element.tab_iconoapp,
                    "linktablero": element.tab_linktablero,
                    "categorias_id": element.tab_categorias_id,
                    "estado": element.tab_estado
                })
            });
            return tablerosArray
        } catch (error) {
            return new Respuesta("Tableros").retorno()
        }
    }

    async obtenerTablerosPorCategoriaIdTodas(id: number): Promise<any> {
        try {
            let tablerosArray: any = []
            var tableros =await Database.from(this.tabla).select('*').where('tab_categorias_id', id)
            tableros.forEach(element => {
                tablerosArray.push({                  

                    "id": element.id,
                    "nombre": element.tab_nombre,
                    "descripcion": element.tab_descripcion,
                    "iconoapp": element.tab_iconoapp,
                    "linktablero": element.tab_linktablero,
                    "categorias_id": element.tab_categorias_id,
                    "estado": element.tab_estado
                })
            });
            return tablerosArray
        } catch (error) {
            return new Respuesta("Tableros").retorno()
        }
    }


    //Pruebas de rutas
    obtenerToken = async (id: Number) => {
        const usu= process.env.USU_TAB;
        const pas= process.env.PAS_TAB;
        let token:any
        const json =  { email: usu, password: pas }
        if(id == 1){
        await axios.post(process.env.URL_AUTH+'login',json
        ).then((result) => {
            token = result
        }).catch((err) => {
            token= err
        });

    }else{
        let tt = ''
        await axios.post(process.env.URL_AUTH+'login',json
        ).then((result) => {
            tt = result.data.token
        })
        let config = {
            headers: {
              'Authorization': 'Bearer '+tt
            }
          }
    
        await axios.get('ccc', config
        ).then((result) => {
            token = result
        }).catch((err) => {
            token= err
        });
    }
        return token
    }
    
}
