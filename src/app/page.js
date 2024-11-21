'use client';
import { useState, useEffect } from 'react';
import { 
  Container, 
  Nav, 
  Navbar, 
  Card, 
  Row, 
  Col 
} from 'react-bootstrap';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <>
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
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Row xs={1} md={3} lg={4} className="g-4">
          {products.map(product => (
            <Col key={product.id}>
              <Card className="h-100">
                <div style={{ height: '200px', padding: '1rem' }}>
                  <Card.Img 
                    variant="top" 
                    src={product.image} 
                    style={{ 
                      height: '100%', 
                      width: '100%', 
                      objectFit: 'contain' 
                    }} 
                  />
                </div>
                <Card.Body>
                  <Card.Title 
                    style={{ 
                      fontSize: '1rem',
                      height: '3rem',
                      overflow: 'hidden'
                    }}
                  >
                    {product.title}
                  </Card.Title>
                  <Card.Text className="fw-bold">
                    ${product.price}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
