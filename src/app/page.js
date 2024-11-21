'use client';
import { useState, useEffect } from 'react';
import { 
  Container, 
  Card, 
  Row, 
  Col 
} from 'react-bootstrap';
import Nav from '@/components/Nav';
import { v4 as uuidv4 } from 'uuid';
import produtosData from './produtos.json';
import categoriasData from './categorias.json';

export default function HomePage() {
  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    // Carregar categorias do JSON em vez da API
    setCategoryList(categoriasData); // Usando os dados do JSON
    localStorage.setItem('categorias', JSON.stringify(categoriasData)); // Armazenando no localStorage

    // Carregar produtos do JSON
    setProductList(produtosData); // Usando os dados do JSON
    localStorage.setItem('produtos', JSON.stringify(produtosData)); // Armazenando no localStorage
  }, []);

  return (
    <>
      <Nav />
      <Container>
        <Row xs={1} md={3} lg={4} className="g-4">
          {productList.map(product => (
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
