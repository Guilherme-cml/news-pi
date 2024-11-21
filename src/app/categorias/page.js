'use client';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';

import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from '@/components/Nav';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Fetch products
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));

    // Fetch categories
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <>
      <Nav />

      <Container>
        <Row>
          <Col md={3}>
            <h3>Categories</h3>
            <ListGroup className="mb-4">
              <ListGroup.Item 
                action 
                active={selectedCategory === 'all'}
                onClick={() => setSelectedCategory('all')}
              >
                All Products
              </ListGroup.Item>
              {categories.map(category => (
                <ListGroup.Item
                  key={category}
                  action
                  active={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>

          <Col md={9}>
            <Row xs={1} md={2} lg={3} className="g-4">
              {filteredProducts.map(product => (
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
                    <Card.Body className="d-flex flex-column">
                      <Card.Title 
                        style={{ 
                          fontSize: '1rem',
                          height: '3rem',
                          overflow: 'hidden'
                        }}
                      >
                        {product.title}
                      </Card.Title>
                      <Card.Text className="text-muted mb-2">
                        ${product.price}
                      </Card.Text>
                      <Button 
                        variant="primary" 
                        className="mt-auto"
                      >
                        Add to Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
