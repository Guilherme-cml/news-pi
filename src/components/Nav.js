import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaCartShopping } from "react-icons/fa6";
import Link from 'next/link'
import {
    Container,
    Nav,
    Navbar,
    Offcanvas,

} from 'react-bootstrap';


export default function Page() {
    const [currentUser, setCurrentUser] = useState(null)
    const router = useRouter()
    const [show, setShow] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const user = localStorage.getItem('currentUser')
        if (user) {
            setCurrentUser(JSON.parse(user))
        }
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
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
                        <Nav.Link className="me-3" href="/produtos">Produtos</Nav.Link>
                        <Nav.Link href="/categorias">Categorias</Nav.Link>

                    </Nav>

                    {currentUser ?
                        (<>
                            <Nav className="ms-auto">

                                <Nav.Link as={Link} href="/usuarios">
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


                    <Nav.Link className="ms-3" onClick={handleShow}>
                        <FaCartShopping size={24} color="white" />
                    </Nav.Link>
                    <Offcanvas show={show} placement="end" onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Carrinho de Compras</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            {cartItems.length === 0 ? (
                                <p>Seu carrinho está vazio</p>
                            ) : (
                                <>
                                    {cartItems.map((item, index) => (
                                        <div key={index} className="d-flex align-items-center mb-3 border-bottom pb-3">
                                            <img 
                                                src={item.image} 
                                                alt={item.name} 
                                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                className="me-3"
                                            />
                                            <div className="flex-grow-1">
                                                <h6 className="mb-0">{item.name}</h6>
                                                <p className="mb-0">R$ {item.price}</p>
                                                <small>Quantidade: {item.quantity}</small>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="mt-3">
                                        <h5>Total: R$ {cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}</h5>
                                        <button className="btn btn-primary w-100">Finalizar Compra</button>
                                    </div>
                                </>
                            )}
                        </Offcanvas.Body>
                    </Offcanvas>
                </Navbar.Collapse>
            </Container>
        </Navbar>);
}