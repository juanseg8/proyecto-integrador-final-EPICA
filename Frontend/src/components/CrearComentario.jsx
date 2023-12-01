import React, { useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css';
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios';

function CrearComentario() {

    const { id } = useParams()
    
    const navigate = useNavigate()

    const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);

    const comentario = useRef()

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

    const mandarDatos = async () => {

        const datos = {
            "description": comentario.current.value,
            "post": id

        }

        const headers = {
            token: token
        }

        try {
            const respuesta = await axios.post('http://localhost:2000/comment', datos, { headers: headers });

            if (respuesta.status === 200) {
                Toast.fire({
                    icon: "success",
                    title: "comentario creado con éxito"
                });
                return navigate('/detallesposts/' + id);
            }
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: 'Ocurrio un error inesperado, debes iniciar sesion',
                text: error
            });
        }

        setDeshabilitarBoton(false);
    }

    const handleFormSubmit = async (e) => {

        e.preventDefault();

        if (comentario.current.value) {

            await mandarDatos()

        } else {
            Toast.fire({
                icon: "error",
                title: 'Por favor, completa todos los campos'
            });
        }

    };


    return (
        <Form className='m-5 p-5'>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    Comentario
                </Form.Label>
                <Col sm="10">
                    <Form.Control className='border-black' as="textarea" ref={comentario} />
                </Col>
            </Form.Group>

            <div className='d-flex justify-content-end'>
                <Button variant="primary" disabled={deshabilitarBoton} onClick={handleFormSubmit}>
                    Crear comentario
                </Button>
            </div>
        </Form>
    )
}

export default CrearComentario