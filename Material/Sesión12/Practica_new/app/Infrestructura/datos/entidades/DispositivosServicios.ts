import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DispositivoServicio } from 'App/Dominio/Datos/Entidades/DispositivoServicio';
import { DateTime } from 'luxon';


export class TblDispositivosServicios extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({columnName:'dsr_dispositivo_id'})
  public dispositivo_id: number;

  @column({columnName:'dsr_interaccion'})
  public interaccion: number;

  @column({columnName:'dsr_servicio_id'})
  public servicio_id: number;

  @column({columnName:'dsr_estado'})
  public estado: boolean;


  @column.dateTime({ autoCreate: true, columnName:'dsr_created_at' })
  public creacion:DateTime

  @column.dateTime({ autoCreate: true, columnName:'dsr_updated_at' })
  public actualizacion:DateTime

  crearDispositivoServicio(dispositivoServicio:any){  
    this.estado = dispositivoServicio?.estado
    this.dispositivo_id = dispositivoServicio.dispositivo_id
    this.servicio_id = dispositivoServicio.servicio_id
    this.interaccion = dispositivoServicio.interaccion
  }

  
}