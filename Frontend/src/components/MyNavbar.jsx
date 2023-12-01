import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuthContext } from '../context/AuthContext';
import { Avatar } from '@mui/material';
import { NavLink } from 'react-bootstrap';

function MyNavbar() {

    const { usuario, logout } = useAuthContext()

    const desconectar = () => {
        logout()
        navigate('/')
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="#">Mis Viajes</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/">Inicio</Nav.Link>
                        <Nav.Link href="/posts">Posts</Nav.Link>
                        {usuario ? <>
                            <Nav.Link href='/myposts'>Mis Posts</Nav.Link>
                            <Nav.Link href='/crearposts'>Crear Posts</Nav.Link>
                        </>

                            :
                            <></>
                        }
                    </Nav>

                    {usuario ? <>
                        <Avatar alt={usuario.username} src={usuario.avatarURL} className='me-2' />
                        <NavLink href='/'>
                            <Button variant="outline-success" className="me-2" onClick={desconectar}>Cerrar sesion</Button>
                        </NavLink>
                    </>
                        :
                        <>
                            <Button variant="outline-success" className="me-2" href='/login'>Iniciar Sesion</Button>
                            <Button variant="outline-success" href='/register'>Registrarse</Button>
                        </>
                    }



                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default MyNavbar