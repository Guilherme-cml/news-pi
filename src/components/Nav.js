
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import {
    Container,
    Nav,
    Navbar,

} from 'react-bootstrap';


export default function Page() {
    const [currentUser, setCurrentUser] = useState(null)
    const router = useRouter()

    useEffect(() => {
        const user = localStorage.getItem('currentUser')
        if (user) {
            setCurrentUser(JSON.parse(user))
        }
    }, [])

    function handleLogout() {
        localStorage.removeItem('currentUser')
        setCurrentUser(null)
        router.push('/login')
    }

    return (

        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand href="/">Fake Market</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/produtos">Produtos</Nav.Link>
                        <Nav.Link href="/categorias">Categorias</Nav.Link>
                        <Nav.Link href="/cart">Carrinho</Nav.Link>
                    </Nav>
                    {currentUser ?
                        (<>
                            <Nav className="ms-auto">

                                <Nav.Link as={Link} href="/user">
                                    Olá, {currentUser.username}
                                </Nav.Link>
                                <Nav.Link className="text-danger" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                    Sair
                                </Nav.Link>

                            </Nav>
                        </>

                        ) : (
                            <Nav className="ms-auto">
                                <Nav.Link as={Link} href="/login">
                                    Login
                                </Nav.Link>
                            </Nav>
                        )}


                </Navbar.Collapse>
            </Container>
        </Navbar>);
}