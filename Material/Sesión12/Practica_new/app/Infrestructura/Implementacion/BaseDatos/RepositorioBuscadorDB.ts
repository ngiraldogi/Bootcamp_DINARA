
import { RepositorioBuscador } from "../../../Dominio/Repositorios/RepositorioBuscador";
import Database from '@ioc:Adonis/Lucid/Database';
export class RepositorioBuscadorDb implements RepositorioBuscador {

  async buscarHome(texto: string): Promise<any> {

    let jsonResponse: any = null

    try {
      const resultadoModulos = await Database.from('tbl_modulos')
        .select('*')
        .where('mod_estado', true)
        .andWhere('mod_name', 'ilike', '%' + texto + '%')

      const resultadoServicios = await Database.from('tbl_servicios')
        .select('*')
        .where('ser_estado', true)
        .where((query) => {
          query
          .where('ser_nombre', 'ilike', '%' + texto + '%')
          .orWhere('ser_tags', 'ilike', '%' + texto + '%')
        })
        
        

        

      jsonResponse = {};
      jsonResponse['categorias'] = resultadoModulos.map(modulo =>{
        return {
        id: modulo.id,
        nombre: modulo.mod_name,
        filename: modulo.mod_filename,
        tipo: modulo.mod_tipo,
        ruta: modulo.mod_ruta,
        estado: modulo.mod_estado,
        orden: modulo.mod_orden
        }
      });

      jsonResponse['servicios'] = resultadoServicios.map(servicio => {
        return {
          id: servicio.id ,
        nombre: servicio.ser_nombre ,
        filename: servicio.ser_icono ,
        ruta: servicio.ser_ruta ,
        estado: servicio.ser_estado ,
        orden: servicio.ser_orden ,
        json: servicio.ser_datos ,
        tipo: servicio.ser_tipo,
        

        }
      });

      return jsonResponse

    } catch (error) {
      console.log(error);

    }





  }

}