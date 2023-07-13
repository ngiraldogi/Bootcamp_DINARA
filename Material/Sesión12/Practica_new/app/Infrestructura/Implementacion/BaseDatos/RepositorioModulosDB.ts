import Database from '@ioc:Adonis/Lucid/Database'
import { Modulo } from "App/Dominio/Datos/Entidades/Modulo";
import { TblModulos } from "App/Infrestructura/datos/entidades/Modulos";
import { Respuesta } from 'App/Infrestructura/datos/respuestas/Respuesta';

import { RepositorioModulos } from "../../../Dominio/Repositorios/RepositorioModulos";
import Env from '@ioc:Adonis/Core/Env';

export class RepositorioModulosDb implements RepositorioModulos {
    private tabla = 'tbl_modulos'

    async crearModulo(modulo: Modulo): Promise<any> {
        modulo.filename = Env.get('URL_ADMINISTRADOR')+"/repositorios/modulos/"+modulo.filename;
        try {
            var entity = new TblModulos()
            entity.setModuloDbFromModulo(modulo)
           await entity.save()
            return new Respuesta().retorno()
        } catch (error) {
            return new Respuesta("Modulos").retorno()
        }
    }

    async obtenerModuloPorId(id: Number): Promise<any> {       
        try {
            var modulo = await TblModulos.find(id)
            if (modulo != null)
                modulo!!.acciones = JSON.parse("[" + modulo!!.acciones + "]");
            return modulo
        } catch (error) {
            console.log(error)
            return new Respuesta("Modulos").retorno()
        }
    }

    async actualizarModulo(modulo: Modulo, id: number): Promise<any> {
        try {
            await TblModulos.query().where('id', id).update({
                nombre: modulo.nombre,
                acciones: modulo.acciones.toString(),
                name: modulo.name,
                filename: modulo.filename,
                tipo: modulo.tipo,
                ruta: modulo.ruta,
                estado: modulo.estado,
                orden: modulo.orden,
                tabla_modulo: modulo.tabla_modulo
            })
            return new Respuesta().retorno()
        } catch (error) {
            return new Respuesta("Modulos").retorno()
        }
    }

    async obtenerModulos(): Promise<any> {
        let modulosArray: any = []
        var modulos = await Database.from(this.tabla).select('*').where('mod_estado', true).orderBy('mod_orden', 'asc')
        modulos.forEach(element => {
            modulosArray.push({                  

                "id": element.id,
                "nombre": element.mod_nombre,
                "name": element.mod_name,
                "filename": element.mod_filename,
                "tipo": element.mod_tipo,
                "ruta": element.mod_ruta,
                "estado": element.mod_estado,
                "orden": element.mod_orden,
                "tabla_modulo": element.mod_tabla_modulo,
                "acciones": JSON.parse("[" + element.mod_acciones + "]")

                
            })
        });
        return modulosArray;
    }

    async obtenerModulosTodos(): Promise<any> {
        let modulosArray: any = []
        var modulos = await Database.from(this.tabla).select('*').orderBy('mod_orden', 'asc')
        modulos.forEach(element => {
            modulosArray.push({                  

                "id": element.id,
                "nombre": element.mod_nombre,
                "name": element.mod_name,
                "filename": element.mod_filename,
                "tipo": element.mod_tipo,
                "ruta": element.mod_ruta,
                "estado": element.mod_estado,
                "orden": element.mod_orden,
                "tabla_modulo": element.mod_tabla_modulo,
                "acciones": JSON.parse("[" + element.mod_acciones + "]")

                
            })
        });
        return modulosArray;
    }
}