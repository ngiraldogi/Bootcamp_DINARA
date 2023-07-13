import Database from '@ioc:Adonis/Lucid/Database'
import { Accion } from 'App/Dominio/Datos/Entidades/Accion';
import { TblAcciones } from 'App/Infrestructura/datos/entidades/Acciones';
import { Respuesta } from 'App/Infrestructura/datos/respuestas/Respuesta';

import { RepositorioAcciones } from "../../../Dominio/Repositorios/RepositorioAcciones";


export class RepositorioAccionesDb implements RepositorioAcciones {
    private tabla = 'tbl_acciones'
    async actualizarAccion(accion: Accion, id: number): Promise<any> {
        try {
            await TblAcciones
                .query()
                .where('id', id)
                .update({
                    name: accion.name,
                    nombre: accion.nombre,
                    estado: accion.estado,
                    filename: accion.filename,
                })
            return new Respuesta().retorno()
        } catch (error) {
            return new Respuesta("Acciones").retorno()
        }
    }

    async crearAccion(accion: Accion): Promise<any> {
        var entity = new TblAcciones()
        entity.setAccionDbFromAccion(accion)
        try {
            await entity.save()
            return new Respuesta().retorno()
        } catch (error) {
            return new Respuesta("Acciones").retorno()
        }
    }
    
    async obtenerAcciones(): Promise<any> {
        try {
            var acciones = await Database.from(this.tabla).select('*').where("estado", "true")
            return acciones;
        } catch (error) {
            return new Respuesta("Acciones").retorno()
        }
    }

    async obtenerAccionPorId(id: Number): Promise<any> {
        var acciones = await TblAcciones.find(id)
        return acciones
    }

}