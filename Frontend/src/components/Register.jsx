import React, { useRef, useState } from 'react'
import { Col, Form, Row, Button } from 'react-bootstrap'
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css';
import { useNavigate } from 'react-router-dom';

function Register() {

    const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);

    const navigate = useNavigate()

    const correo = useRef()
    const usuario = useRef()
    const contraseña = useRef()
    const avatarURL = useRef()


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
            "username": usuario.current.value,
            "password": contraseña.current.value,
            "email": correo.current.value,
            "avatarURL": avatarURL.current.value

        }

        try {
            const respuesta = await axios.post('http://localhost:2000/user', datos);

            if (respuesta.status === 200) {
                Toast.fire({
                    icon: "success",
                    title: "Usuario creado con éxito"
                });
                return navigate('/login');
            } else {
                Toast.fire({
                    icon: "error",
                    title: 'Ocurrio un error inesperado, probablemente su usuario o correo ya este en uso'
                });
            }
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: 'Ocurrio un error inesperado, probablemente su usuario o correo ya este en uso',
                error: error
            });
        }

        setDeshabilitarBoton(false);
    }

    const handleFormSubmit = async (e) => {

        e.preventDefault();

        if (correo.current.value && usuario.current.value && contraseña.current.value && avatarURL.current.value) {

            await mandarDatos()


        } else {
            Toast.fire({
                icon: "error",
                title: 'Por favor, completa todos los campos'
            });
        }

    };

    return (
        <Form className='m-5'>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control type="email" className='border-black' ref={correo} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridUser">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control type="user" className='border-black' ref={usuario} />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" className='border-black' ref={contraseña} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Avatar URL</Form.Label>
                <Form.Control type='url' className='border-black' ref={avatarURL} />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleFormSubmit}>
                Registrarse
            </Button>
        </Form>
    )
}

export default Register