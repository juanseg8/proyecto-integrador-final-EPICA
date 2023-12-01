import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css';
import axios from 'axios';
import { Alert, Button, ButtonGroup, Card } from 'react-bootstrap';

function EliminarComentario() {

    const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);
    const navigate = useNavigate();
    const { id, idComentario } = useParams();
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
        navigate('/detallesposts/' + id)
    }

    const eliminar = async () => {

        setDeshabilitarBoton(true);

        const headers = {
            token: token
        }

        try {
            const respuesta = await axios.delete('http://localhost:2000/comment', { data: { idComentario: idComentario }, headers: headers, validateStatus: null });

            if (respuesta.status === 200) {
                Toast.fire({
                    icon: "success",
                    title: "Comentario eliminada con exito"
                });
                return navigate('/detallesposts/' + id);
            } 
            else if (respuesta.status === 500) {
                Toast.fire({
                    icon: "error",
                    title: 'No es posible eliminar este comentario porque usted no es el autor'
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
                ¿Está seguro que desea eliminar el comentario con ID {idComentario}?
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

export default EliminarComentario