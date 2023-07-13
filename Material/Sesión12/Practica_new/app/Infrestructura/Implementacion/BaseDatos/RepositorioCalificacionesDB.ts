import { Calificacion } from "App/Dominio/Datos/Entidades/Calificacion";
import { RepositorioCalificaciones } from "App/Dominio/Repositorios/RepositorioCalificaciones";
import { TblCalificacion } from "App/Infrestructura/datos/entidades/Calificacion";

export class RepositorioCalificacionesDB implements RepositorioCalificaciones{

    public async guardarCalificacion(calificacion: Calificacion): Promise<Calificacion> {
        let calificacionDb = new TblCalificacion()
        calificacionDb.setTblCalificacion(calificacion)
        calificacionDb = await calificacionDb.save()
        return calificacionDb.getCalificacion()
    }
    public async obtenerCalificaciones(pagina: number, limite: number): Promise<Calificacion[]> {
        let calificaciones: Calificacion[] = []
        let paginator = await TblCalificacion.query().paginate(pagina, limite)
        let calificacionesDb = paginator.all()
        for (const calificacionDb of calificacionesDb) {
            calificaciones.push(calificacionDb.getCalificacion())
        }
        return calificaciones
    }
    
}