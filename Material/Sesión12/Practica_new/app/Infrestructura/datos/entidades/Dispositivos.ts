import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { Dispositivo } from 'App/Dominio/Datos/Entidades/Dispositivo';
import { DateTime } from 'luxon';
import { TblServicios } from './Servicios';

export class TblDispositivos extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({columnName:'dis_identificador'})
  public identificador: string;

  @column({columnName:'dis_estado'})
  public estado: boolean;


  @column.dateTime({ autoCreate: true, columnName:'dis_created_at' })
  public creacion:DateTime

  @column.dateTime({ autoCreate: true, columnName:'dis_updated_at' })
  public actualizacion:DateTime

  crearDispositivo(dispositivo:any){
    this.identificador = dispositivo.identificador
    this.estado = dispositivo?.estado
  }

  @manyToMany(() => TblServicios, {
    localKey: 'id',
    pivotForeignKey: 'dsr_dispositivo_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'dsr_servicio_id',
    pivotColumns: ['dsr_interaccion', 'dsr_estado'],
    pivotTable: 'tbl_dispositivos_servicios'

  })
  public servicios: ManyToMany<typeof TblServicios>
}