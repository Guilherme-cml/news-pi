
import { 
  Container, 
  Nav, 
  Navbar, 

} from 'react-bootstrap';


export default function Page() {
    return (

<Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="/">Fake Market</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/products">Products</Nav.Link>
              <Nav.Link href="/categorias">Categories</Nav.Link>
              <Nav.Link href="/cart">Cart</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
                                <Nav.Link href="/login">
                                    Login
                                </Nav.Link>
                            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>);}