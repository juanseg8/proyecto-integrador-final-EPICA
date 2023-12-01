import React from 'react'
import Button from 'react-bootstrap/Button';
import { useAuthContext } from '../context/AuthContext';

function Home() {

    const { usuario } = useAuthContext()

    const backgroundImage = {
        backgroundImage: 'url("https://img.freepik.com/vector-gratis/fondo-viaje-realista-elementos_52683-77784.jpg?w=740&t=st=1701383945~exp=1701384545~hmac=05fcce0ba5c09b1734bc3c07b90d5ef0a377853ba9c579fca9d7bd3e2d10359d")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
    };

    return (
        <div style={backgroundImage} className='d-flex flex-column justify-content-center align-items-center'>
            <h1 className='text-body-emphasis mb-5'>Bienvenido a Mis Viajes {usuario ? usuario.username : ''} </h1>
            <p className='fs-4'>Somos una comunidad en la cual compartimos experiencias de nuestros viajes</p>
            {usuario ?
                <p className='fs-4'>Postea tu ultimo viaje</p>
                :
                <p className='fs-4'>Registrate o inicia sesion para poder contarnos tus vivencias</p>

            }


        </div>
    )
}

export default Home