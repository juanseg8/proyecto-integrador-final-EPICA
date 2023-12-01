import React, { useEffect, useRef, useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { traerDatosDePosteoPorID } from '../utils/llamados';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css';
import { useAuthContext } from '../context/AuthContext';

function EditarPost() {

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

    const { id } = useParams()

    const traerDatos = async () => {
        try {
            const datos = await traerDatosDePosteoPorID(id);
            setDatosEditar(datos);
        } catch (error) {
            console.error('Error al traer datos:', error);
        }
    }

    useEffect(() => {
        traerDatos();
    }, []);


    const titulo = useRef()
    const descripcion = useRef()
    const imagenURL = useRef()

    const mandarDatos = async () => {

        const datos = {
            "id": datosEditar._id,
            "title": titulo.current.value,
            "description": descripcion.current.value,
            "imageURL": imagenURL.current.value
        }

        const headers = {
            token: token
        }

        try {
            const respuesta = await axios.put('http://localhost:2000/post', datos, { headers: headers, validateStatus: null });

            if (respuesta.status === 200) {
                Toast.fire({
                    icon: "success",
                    title: "Publicacion editada con exito"
                });
                return navigate('/posts');
            } else if (respuesta.status === 500) {
                Toast.fire({
                    icon: "error",
                    title: 'No es posible editar esta publicacion porque usted no es el autor'
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

        if (titulo.current.value && descripcion.current.value && imagenURL.current.value) {

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
                    <Form.Control className='border-black' type="text" defaultValue={datosEditar ? datosEditar.title : ''} ref={titulo} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    Descripción
                </Form.Label>
                <Col sm="10">
                    <Form.Control className='border-black' type="text" defaultValue={datosEditar ? datosEditar.description : ''} ref={descripcion} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    ImagenURL
                </Form.Label>
                <Col sm="10">
                    <Form.Control className='border-black' type="text" defaultValue={datosEditar ? datosEditar.imageURL : ''} ref={imagenURL} />
                </Col>
            </Form.Group>

            <Button variant="primary" disabled={deshabilitarBoton} onClick={handleFormSubmit}>
                Editar publicacion
            </Button>
        </Form>
    )
}

export default EditarPost