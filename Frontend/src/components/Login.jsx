import React, { useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';


function Login() {

    const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);

    const { login } = useAuthContext()

    const navigate = useNavigate()

    const correo = useRef()
    const contraseña = useRef()

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
            "email": correo.current.value,
            "password": contraseña.current.value,
        }

        try {
            const respuesta = await axios.post('http://localhost:2000/authenticate', datos, { validateStatus: null });

            if (respuesta.status === 200) {

                const { data, token } = respuesta.data

                login(data, token)

                Toast.fire({
                    icon: "success",
                    title: "Inicio sesion con éxito"
                });

                return navigate('/');

            } else if (respuesta.status === 401) {
                Toast.fire({
                    icon: "error",
                    title: 'Contraseña incorrecta'
                });
            } else if (respuesta.status === 404) {
                Toast.fire({
                    icon: "error",
                    title: 'Correo incorrecto'
                });
            } else {
                Toast.fire({
                    icon: "error",
                    title: 'Ocurrio un error inesperado'
                });
            }
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: 'Ocurrio un error',

            });
        }

        setDeshabilitarBoton(false);
    }

    const verificarDatos = async (e) => {

        e.preventDefault();

        if (correo.current.value && contraseña.current.value) {

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
                    Correo
                </Form.Label>
                <Col sm="10">
                    <Form.Control className='border-black' type="email" ref={correo} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    Contraseña
                </Form.Label>
                <Col sm="10">
                    <Form.Control className='border-black' type="password" ref={contraseña} />
                </Col>
            </Form.Group>

            <Button variant="primary" disabled={deshabilitarBoton} onClick={verificarDatos}>
                Iniciar Sesion
            </Button>
        </Form>
    )
}

export default Login