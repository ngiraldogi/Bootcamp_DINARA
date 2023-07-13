import { Servicio } from 'App/Dominio/Datos/Entidades/Servicio';
export interface RepositorioServicios{     
     buscar(dispositivo:string):Promise<Servicio[]>
     guardarInteraccion(servicio:number, dispositivo:string):Promise<any>
} 