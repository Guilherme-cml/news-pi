'use client';
import { useState, useEffect } from 'react';
import { 
  Container, 
  Navbar, 
  Card, 
  Row, 
  Col 
} from 'react-bootstrap';
import Nav from '@/components/Nav';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        const produtosComId = data.map(product => ({
          ...product,
          id: uuidv4()
        }));
        setProducts(produtosComId);
        localStorage.setItem('produtos', JSON.stringify(produtosComId));
      });
  }, []);

  return (
    <>
      <Nav />

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
