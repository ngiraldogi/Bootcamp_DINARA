import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cliente from 'App/Models/Cliente'

export default class ClientesController {

    public async getListarClientes (): Promise<Cliente[]> {
        const clientes = await Cliente.all();
        return clientes;
    }

    public async actualizarClientes({request}: HttpContextContract) {
        const cedula = request.param('id');
        const cliente = await Cliente.findOrFail(cedula);
        const datos = request.all();
        cliente.nombre = datos.nombre;
        cliente.apellido = datos.apellido;
        cliente.telefono = datos.telefono;
        cliente.correo = datos.correo;
        await cliente.save();
        return {message: 'Cliente actualizado correctamente',"estado":200};
    }

    public async eliminarCliente({request}: HttpContextContract) {
        const id = request.param('id');
        await Cliente.query().where('cedula', id).delete();
        return {message: 'Cliente eliminado correctamente',"estado":200};
    }

    public async setRegistrarClientes({request, response}: HttpContextContract) {
        const dataCliente = request.only(['cedula', 'nombre', 'apellido', 'telefono', 'correo'])
        try{
            const cedulaCliente = dataCliente.cedula;
            const clienteExistente: number = await this.getValidarClienteExistente(cedulaCliente);
            //console.log(clienteExistente);
            if(clienteExistente == 0){
                await Cliente.create(dataCliente);
                response.status(200).json({message: 'Cliente registrado correctamente'});
            }else{
                response.status(400).json({message: 'El cliente ya se encuentra registrado'});
            }
        }
        catch(error){
            response.status(500).json({message: 'Error en el servidor al registrar el cliente'});
        }
    }

    private async getValidarClienteExistente(cedula: string): Promise<number> {
        const total = await Cliente.query().where({'cedula': cedula}) //Esta es otra forma de hacer la consulta, en este caso solo consulta si existe el cliente (si existe devuelve 1, si no existe devuelve 0)
        return total.length; //Retorna el total de registros encontrados
    }
}
