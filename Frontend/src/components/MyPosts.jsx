import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useAuthContext } from '../context/AuthContext';

function MyPosts({ usuario }) {

    const navigate = useNavigate();

    const backgroundImage = {
        backgroundImage: 'url("https://img.freepik.com/vector-gratis/fondo-viaje-realista-elementos_52683-77784.jpg?w=740&t=st=1701383945~exp=1701384545~hmac=05fcce0ba5c09b1734bc3c07b90d5ef0a377853ba9c579fca9d7bd3e2d10359d")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
    };

    const { token } = useAuthContext()

    const [posts, setPosts] = useState([]);

    const editar = (id) => {
        navigate('/editarposts/' + id);
    }

    const eliminar = (id) => {
        navigate('/eliminarposts/' + id);
    }

    const detalle = (id) => {
        navigate('/detallesposts/' + id)
    }

    const config = {
        params: {
            token: token,
        },
    }

    const cargarPosts = async () => {


        let respuesta = await axios.get('http://localhost:2000/myposts', config);

        if (respuesta.status === 200) {
            const postsRespuesta = respuesta.data
            setPosts(postsRespuesta);
        }
    }

    useEffect(() => {
        cargarPosts();
    }, []);

    return (
        <>
            {
                posts && posts.length > 0 ? posts.map((posteo, key) => (
                    <div onClick={() => detalle(posteo._id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <Card className="shadow m-5" key={key}>
                            <div className='d-flex justify-content-end m-2'>

                                {
                                    usuario && (usuario.id === posteo.autor._id) && (
                                        <>
                                            <div onClick={(e) => { e.stopPropagation(); editar(posteo._id); }}>
                                                <Button variant="primary me-2">Editar</Button>
                                            </div>
                                            <div onClick={(e) => { e.stopPropagation(); eliminar(posteo._id); }}>
                                                <Button variant="danger">Eliminar</Button>
                                            </div>
                                        </>
                                    )
                                }

                            </div>
                            <div className='d-flex justify-content-center'>
                                <Card.Img variant="top" src={posteo.imageURL} className="w-50 h-50" />
                            </div>
                            <Card.Body>
                                <Card.Title>{posteo.title}</Card.Title>
                                <Card.Text>{posteo.description}</Card.Text>
                                <Card.Text>{posteo.createdAt} </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                )) :
                    <div style={backgroundImage} className='d-flex justify-content-center align-items-center vh-100'>
                        <h2>Todavia no tienes post realizados, hazlos!</h2>
                    </div>
            }
        </>
    )
}

export default MyPosts