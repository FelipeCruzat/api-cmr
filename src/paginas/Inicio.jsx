import { useEffect, useState } from 'react'
import Cliente from '../componentes/Cliente'

const Inicio = () => {
  const [clientes, setClientes] = useState([])

  useEffect(() => {
    const obtenerClientesAPI = async () => {
      try {
        const url = 'http://localhost:4000/clientes'
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        setClientes(resultado)
      } catch (error) {
        console.log(error)
      }
    }
    obtenerClientesAPI()
  }, [])

  const handleEliminar = id => {
    const confirmar= confirm(' Deseas eliminar este cliente')
    
    if (confirmar){
      try {
        const url = `http://localhost:4000/clientes/${id}`
        
        const respuesta = fetch(url, {
          method: 'DELETE'
      })
       /* const respuesta = await fetch(url,{
          method:'DELETE'
        })*/

        //respuesta.json()
        const arrayClientes = clientes.filter(cliente => cliente.id !== id)
        
        setClientes(arrayClientes)
      
      } catch (error) {
        console.log(error)
      }
    }

  }

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
      <p className='mt-3'>Administra tus clientes </p>
      <table className='w-full mt-5 table-auto shadow bg-white'>
        <thead className='bg-blue-800 text-white' >
          <tr>
            <th className='p-2'>Nombre</th>
            <th className='p-2'>Contacto</th>
            <th className='p-2'>Empresa</th>
            <th className='p-2'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <Cliente
              key={cliente.id}
              cliente={cliente}
              handleEliminar = {handleEliminar}
            />
          ))}
        </tbody>
      </table>
    </>
  )
  // Error 1: Para levantar el servidor json debo estar con permiso administrador
  // y en la carpeta que esta el archivo .json.
  // En useEfecct el segundo objeto es vacío significa que se ejecuta solo cuando 
  // se recarga página, una vez.
  // El get es mas simple que post en cantida de código
  //w-full= es ancho full
  // key esta incorprado a cliente !!
  // locatioon.reload() carga la pagina que uno está.
  // En este ejemplo linea 36 favorece que la pagina se elimine en base de dato y en navegador, sin recargar pagina
  // aumentando la velocidad de la aplicacion 
}

export default Inicio