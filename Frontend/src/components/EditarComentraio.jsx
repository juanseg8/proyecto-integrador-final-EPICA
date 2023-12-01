import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { traerDatosDeComentarioPorID } from '../utils/llamados';
import axios from 'axios';

function EditarComentraio() {

    const navigate = useNavigate()

    const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);

    const [datosEditar, setDatosEditar] = useState();

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

    const { id, idComentario } = useParams()

    const traerDatos = async () => {
        try {
            const datos = await traerDatosDeComentarioPorID(idComentario);
            setDatosEditar(datos);
        } catch (error) {
            console.error('Error al traer datos:', error);
        }
    }

    useEffect(() => {
        traerDatos();
    }, []);

    const comentario = useRef()


    const mandarDatos = async () => {

        const datos = {
            "id": idComentario,
            "description": comentario.current.value,

        }

        const headers = {
            token: token
        }

        try {
            const respuesta = await axios.put('http://localhost:2000/comment', datos, { headers: headers, validateStatus: null });

            if (respuesta.status === 200) {
                Toast.fire({
                    icon: "success",
                    title: "Comentario editada con exito"
                });
                return navigate('/detallesposts/' + id);
            } else if (respuesta.status === 500) {
                Toast.fire({
                    icon: "error",
                    title: 'No es posible editar este comentario porque usted no es el autor'
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
                    <Form.Control className='border-black' as="textarea" defaultValue={datosEditar ? datosEditar.description : ''} ref={comentario} />
                </Col>
            </Form.Group>

            <div className='d-flex justify-content-end'>
                <Button variant="primary" disabled={deshabilitarBoton} onClick={handleFormSubmit}>
                    Editar comentario
                </Button>
            </div>
        </Form>
    )
}

export default EditarComentraio