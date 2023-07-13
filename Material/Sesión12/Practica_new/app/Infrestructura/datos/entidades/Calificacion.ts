import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { Calificacion } from 'App/Dominio/Datos/Entidades/Calificacion';
import { DateTime } from 'luxon';


export class TblCalificacion extends BaseModel {

    public static table = 'tbl_calificaciones'

    @column({ isPrimary: true })
    public id: number

    @column({columnName:'cal_calificacion'})
    public calificacion: number;
    
    @column({columnName:'cal_que_te_gusta'})
    public queTeGusta?: string;

    @column({columnName:'cal_que_no_te_gusta'})
    public queNoTeGusta?: string;

    @column({columnName:'cal_que_te_gustaria'})
    public queTeGustaria?: string;

    @column({columnName:'cal_id_dispositivo'})
    public idDispositivo?: string;

    @column({columnName:'cal_id_usuario'})
    public idUsuario?: string;

    @column.dateTime({ autoCreate: true, columnName:'cal_fecha' })
    public fecha:DateTime

    public setTblCalificacion(calificacion:Calificacion):void{
        this.calificacion = calificacion.calificacion
        this.queTeGusta = calificacion.queTeGusta
        this.queNoTeGusta = calificacion.queNoTeGusta
        this.queTeGustaria = calificacion.queTeGustaria
        this.idUsuario = calificacion.idUsuario
        this.idDispositivo = calificacion.idDispositivo
        this.fecha = calificacion.fecha
    }

    public getCalificacion():Calificacion{
        const calificacion = new Calificacion()
        calificacion.calificacion = this.calificacion
        calificacion.queTeGusta = this.queTeGusta
        calificacion.queNoTeGusta = this.queNoTeGusta
        calificacion.queTeGustaria = this.queTeGustaria
        calificacion.idUsuario = this.idUsuario
        calificacion.idDispositivo = this.idDispositivo
        calificacion.fecha = this.fecha
        return calificacion
    }
  
}