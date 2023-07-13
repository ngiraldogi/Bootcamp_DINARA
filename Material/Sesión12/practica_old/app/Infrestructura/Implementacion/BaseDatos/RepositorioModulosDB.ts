import Database from '@ioc:Adonis/Lucid/Database'
import { Modulo } from "App/Dominio/Datos/Entidades/Modulo";
import { TblModulos } from "App/Infrestructura/datos/entidades/Modulos";
import { Respuesta } from 'App/Infrestructura/datos/respuestas/Respuesta';

import { RepositorioModulos } from "../../../Dominio/Repositorios/RepositorioModulos";

export class RepositorioModulosDb implements RepositorioModulos {
    private tabla = 'tbl_modulos'

    async crearModulo(modulo: Modulo): Promise<any> {
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
        var modulos = await Database.from(this.tabla).select('*')
        for (const key in modulos) {
            modulos[key].acciones = JSON.parse("[" + modulos[key].acciones + "]");
        }
        return modulos;
    }
}