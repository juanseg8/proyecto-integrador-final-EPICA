import React, { useRef, useState } from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css';
import { useAuthContext } from '../context/AuthContext';

function CrearPost() {

    const navigate = useNavigate();

    const { token } = useAuthContext()

    const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);

    const titulo = useRef()
    const descripcion = useRef()
    const imagenURL = useRef()

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
            "title": titulo.current.value,
            "description": descripcion.current.value,
            "imageURL": imagenURL.current.value
        }

        const headers = {
            token: token
        }

        try {
            const respuesta = await axios.post('http://localhost:2000/post', datos, { headers: headers });

            if (respuesta.status === 200) {
                Toast.fire({
                    icon: "success",
                    title: "Publicacion creada con éxito"
                });
                return navigate('/posts');
            } 
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: 'Ocurrio un error inesperado, debes iniciar sesion',
            });
        }

        setDeshabilitarBoton(false);
    }

    const handleFormSubmit = async (e) => {

        e.preventDefault();

        if (titulo.current.value && descripcion.current.value && imagenURL.current.value ) {

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
                    Título
                </Form.Label>
                <Col sm="10">
                    <Form.Control className='border-black' type="text" ref={titulo} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    Descripción
                </Form.Label>
                <Col sm="10">
                    <Form.Control className='border-black' type="text" ref={descripcion} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    ImagenURL
                </Form.Label>
                <Col sm="10">
                    <Form.Control className='border-black' type="text" ref={imagenURL} />
                </Col>
            </Form.Group>

            <Button variant="primary" disabled={deshabilitarBoton} onClick={handleFormSubmit}>
                Crear publicación
            </Button>
        </Form>
    )
}

export default CrearPost