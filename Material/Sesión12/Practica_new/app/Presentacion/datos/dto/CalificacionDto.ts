import { Calificacion } from "App/Dominio/Datos/Entidades/Calificacion"

export class CalificacionDto{
    public calificacion:    number
    public que_te_gusta?:    string
    public que_no_te_gusta?: string
    public que_te_gustaria?: string
    public id_dispositivo?:  string
    public id_usuario?:      string

    public establecerDto(calificacion:Calificacion){
        this.calificacion = calificacion.calificacion
        this.que_te_gusta = calificacion.queTeGusta
        this.que_no_te_gusta = calificacion.queNoTeGusta
        this.que_te_gustaria = calificacion.queTeGustaria
        this.id_dispositivo = calificacion.idDispositivo
        this.id_usuario = calificacion.idUsuario
    }
}