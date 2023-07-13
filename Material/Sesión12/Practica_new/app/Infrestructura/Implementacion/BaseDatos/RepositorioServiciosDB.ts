
import { RepositorioServicios } from "../../../Dominio/Repositorios/RepositorioServicios";
import Database from '@ioc:Adonis/Lucid/Database';
import { TblServicios } from '../../datos/entidades/Servicios';
import { TblDispositivos } from '../../datos/entidades/Dispositivos';
import { TblDispositivosServicios } from '../../datos/entidades/DispositivosServicios';
export class RepositorioServiciosDb implements RepositorioServicios {

  async buscar(dispositivo: string): Promise<any> {

    try {
      const frecuentes = await Database.from('tbl_dispositivos_servicios')
        .join('tbl_dispositivos', 'tbl_dispositivos_servicios.dsr_dispositivo_id', '=', 'tbl_dispositivos.id')
        .join('tbl_servicios', 'tbl_dispositivos_servicios.dsr_servicio_id', '=', 'tbl_servicios.id')
        .select('tbl_servicios.*')
        .where('dis_identificador', dispositivo)
        .orderBy('dsr_interaccion', 'desc')

      let idServicios = new Array();

      const serviciosFrecuentes = frecuentes.map(servFre => {
        idServicios.push(servFre.id)
        return {
          id: servFre.id,
          nombre: servFre.ser_nombre,
          filename: servFre.ser_icono,
          ruta: servFre.ser_ruta,
          estado: servFre.ser_estado,
          orden: servFre.ser_orden,
          json: servFre.ser_datos,
          tipo: servFre.tipo,
        }
      })

      const servicios = await TblServicios.query().whereNotIn('id', idServicios).select('*')

      const serviciosRestantes = servicios.map(serRes => {
        return {
          id: serRes.id,
          nombre: serRes.nombre,
          filename: serRes.icono,
          ruta: serRes.ruta,
          estado: serRes.estado,
          orden: serRes.orden,
          json: serRes.datos,
          tipo: serRes.tipo,
        }
      })


      return serviciosFrecuentes.concat(serviciosRestantes)

    } catch (error) {
      console.log(error);

    }

  }


  async guardarInteraccion(servicio: number, dispositivo: string): Promise<any> {

    this.guardar(servicio, dispositivo)

    return true

  }

 async guardar(servicio: number, dispositivo: string) {
    
  try {

    let id;
    const idDispositivo = await TblDispositivos.findBy('dis_identificador', dispositivo)

    if (!idDispositivo) {

      let guardarDispositivo = new TblDispositivos();
      guardarDispositivo.crearDispositivo({ identificador: dispositivo })
      guardarDispositivo = await guardarDispositivo.save()
      id = guardarDispositivo.id;

    } else {

      id = idDispositivo.id;

    }

    const relacion = await TblDispositivosServicios.query().where({ 'dsr_dispositivo_id': id, 'dsr_servicio_id': servicio })

    let idInteraccion;
    let contador = 0;
    if (relacion.length == 0) {

      let dispositivosServicios = new TblDispositivosServicios()
      dispositivosServicios.crearDispositivoServicio({
        dispositivo_id: id,
        servicio_id: servicio,
        interaccion: 0
      })
      dispositivosServicios = await dispositivosServicios.save();
      idInteraccion = dispositivosServicios.id

    } else {

      idInteraccion = relacion[0].id
      contador = relacion[0].interaccion

    }

     await TblDispositivosServicios.query()
      .where('id', idInteraccion)
      .update({
         interaccion: contador +1
      })


return true

  } catch (error) {
    return false
  }
 }

 

}