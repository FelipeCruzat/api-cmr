import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../componentes/Spinner'

const VerCliente = () => {

  const [cliente, setCliente] = useState({})
  const [cargando, setCargando] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    setCargando(!cargando)
    const obtenerClienteAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        setCliente(resultado)
      } catch (error) {
        console.log(error)

      }
      setCargando(false)
    }
    obtenerClienteAPI()
  }, [])

  return (
    cargando ? <Spinner/> : Object.keys(cliente).length === 0 ? <p>No hay información</p> : (
    <div>
      
    <p className='text-4xl text-gray-600 mt-4'>
      <span className=" text-gray-600 uppercase" >Cliente: </span>
      {cliente.nombre}
    </p>
    <p className='text-2xl text-gray-600 mt-4'>
    <span className=" text-gray-600 uppercase" >Empresa: </span>
    {cliente.empresa}
  </p>
  <p className='text-2xl text-gray-600 mt-4'>
    <span className=" text-gray-600 uppercase" >Email: </span>
    {cliente.email}
  </p>
  <p className='text-2xl text-gray-600 mt-4'>
    <span className=" text-gray-600 uppercase" >Telefono: </span>
    {cliente.telefono}
  </p>
  <p className='text-2xl text-gray-600 mt-4'>
    <span className=" text-gray-600 uppercase" >Notas: </span>
    {cliente.notas}
  </p>
    

    </div>)
  
  )
}

export default VerCliente