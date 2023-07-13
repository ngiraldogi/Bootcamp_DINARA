import { Modulo } from "../Datos/Entidades/Modulo";


export interface RepositorioModulos{
     
     crearModulo(modulo: Modulo):Promise<boolean>
     obtenerModulos(): Promise<Modulo[]>
     actualizarModulo(modulo: Modulo, id:number):Promise<void>
     obtenerModuloPorId(id:number): Promise<Modulo>
} 