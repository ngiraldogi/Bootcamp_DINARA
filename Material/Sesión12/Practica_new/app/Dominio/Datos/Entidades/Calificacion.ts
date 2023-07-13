import { DateTime } from "luxon"

export class Calificacion{
    public id:number
    public calificacion:number
    public queTeGusta?:string
    public queNoTeGusta?:string
    public queTeGustaria?:string
    public idDispositivo?:string
    public idUsuario?:string
    public fecha:DateTime
}