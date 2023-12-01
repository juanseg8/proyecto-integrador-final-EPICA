import React, { useState } from 'react'
import { Card, Alert, ButtonGroup, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css';
import { useAuthContext } from '../context/AuthContext';


function EliminarPost() {

    const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { token } = useAuthContext()

    
    const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const volver = () => {
        navigate('/posts');
    }

    const eliminar = async () => {

        setDeshabilitarBoton(true);

        const headers = {
            token: token
        }

        try {
            const respuesta = await axios.delete('http://localhost:2000/post', { data: { id: id }, headers: headers, validateStatus: null });

            if (respuesta.status === 200) {
                Toast.fire({
                    icon: "success",
                    title: "Publicacion eliminada con exito"
                });
                return navigate('/posts');
            } else if (respuesta.status === 500) {
                Toast.fire({
                    icon: "error",
                    title: 'No es posible eliminar esta publicacion porque usted no es el autor'
                });
            }
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: 'Ocurrió un error inesperado'
            });
        }

        setDeshabilitarBoton(false);
    }

    return (
        <Card.Body className='m-5'>
            <Alert variant="warning">
                ¿Está seguro que desea eliminar la publicación con ID {id}?
            </Alert>

            <ButtonGroup>
                <Button variant="primary" onClick={volver} disabled={deshabilitarBoton} className='me-2 rounded'>
                    Volver
                </Button>
                <Button variant="danger" onClick={eliminar} disabled={deshabilitarBoton} className='rounded'>
                    Eliminar
                </Button>
            </ButtonGroup>
        </Card.Body>
    )
}

export default EliminarPost