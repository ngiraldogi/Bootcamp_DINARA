import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm';
import { Servicio } from 'App/Dominio/Datos/Entidades/Servicio';
import { DateTime } from 'luxon';
import { TblDispositivos } from './Dispositivos';


export class TblServicios extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({columnName:'ser_nombre'})
  public nombre: string;

  @column({columnName:'ser_ruta'})
  public ruta: string;
    
  @column({columnName:'ser_icono'})
  public icono: string;

  @column({columnName:'ser_tags'})
  public tags: string;
  
  @column({columnName:'ser_estado'})
  public estado: boolean;
  
  @column({columnName:'ser_datos'})
  public datos: string;

  @column({columnName:'ser_orden'})
  public orden: number;

  @column({columnName:'ser_tipo'})
  public tipo: number;


  @column.dateTime({ autoCreate: true, columnName:'ser_created_at' })
  public creacion:DateTime

  @column.dateTime({ autoCreate: true, columnName:'ser_updated_at' })
  public actualizacion:DateTime

  crearServicio(servicio:Servicio){
    this.nombre = servicio.nombre
    this.ruta = servicio.ruta
    this.tags = servicio.tags.toString()
    this.icono = servicio.icono
    this.datos = servicio.datos    
    this.estado = servicio.estado
    this.orden = servicio.orden
    this.tipo = servicio.tipo
  }

  @manyToMany(() => TblDispositivos, {
    localKey: 'id',
    pivotForeignKey: 'dsr_servicio_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'dsr_dispositivo_id',
    pivotColumns: ['dsr_interaccion', 'dsr_estado'],
    pivotTable: 'tbl_dispositivos_servicios'

  })
  public dispoditivos: ManyToMany<typeof TblDispositivos>
  
}