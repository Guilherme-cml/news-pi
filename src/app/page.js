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

export default function HomePage() {
  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem('categorias'));
    if (storedCategories && storedCategories.length > 0) {
      // Se já existem categorias no localStorage, use-os
      setCategoryList(storedCategories);
    } else {
      // Caso contrário, faça a chamada à API
      fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(data => {
          setCategoryList(data);
          localStorage.setItem('categorias', JSON.stringify(data));
        });
    }
    const storedProducts = JSON.parse(localStorage.getItem('produtos'));
    if (storedProducts && storedProducts.length > 0) {
      // Se já existem produtos no localStorage, use-os
      setProductList(storedProducts);
    } else {
      // Caso contrário, faça a chamada à API
      fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
          const productsWithId = data.map(product => ({
            ...product,
            id: uuidv4()
          }));
          setProductList(productsWithId);
          localStorage.setItem('produtos', JSON.stringify(productsWithId));
        });
    }
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
