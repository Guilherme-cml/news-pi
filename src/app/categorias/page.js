'use client';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from '@/components/Nav';
import { v4 } from 'uuid';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const produtosLocalStorage = JSON.parse(localStorage.getItem('produtos'));
    const categoriasLocalStorage = JSON.parse(localStorage.getItem('categorias'));
    if (produtosLocalStorage && produtosLocalStorage.length > 0) {
      // Se já existem produtos no localStorage, use-os
      setProducts(produtosLocalStorage);
    } else {
      // Caso contrário, faça a chamada à API


      fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => setProducts(data));

    };
    if (categoriasLocalStorage && categoriasLocalStorage.length > 0) {
      setCategories(categoriasLocalStorage);
    } else {
      fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(data => {
          const categoriasComId = data.map(categoria => ({
            id: v4(),
            name: categoria
          }));
          setCategories(categoriasComId);
          localStorage.setItem('categorias', JSON.stringify(categoriasComId));
        });
    };
  }, []);


  const excluirCategoria = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      const novasCategorias = categories.filter(c => c.id !== id);
      localStorage.setItem('categorias', JSON.stringify(novasCategorias));
      setCategories(novasCategorias);
    }
  };
  const addToCart = (product) => {
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = currentCart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
        currentCart[existingItemIndex].quantity += 1;
    } else {
        currentCart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(currentCart));
    setCartItems(currentCart); // If you're using the cart state in the component
};

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);
  console.log(categories)

  return (
    <>
      <Nav />

      <Container>
        <Row>
          <Col md={3}>
            <h3>Categorias</h3>
            <ListGroup className="mb-4">
              <ListGroup.Item
                action
                active={selectedCategory === 'all'}
                onClick={() => setSelectedCategory('all')}
              >
                Todos os Produtos
              </ListGroup.Item>
              {categories.map(category => (
                <ListGroup.Item
                  key={category.id}
                  action
                  active={selectedCategory === category.name}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.name}
                  <div className="float-end"> {/* Adicionando um contêiner para alinhar os ícones à direita */}
                    <Link href={`/categorias/form/${category.id}`}>
                      <FaEdit />
                    </Link>
                    <Button
                      variant="link"
                      className="text-danger p-0 ms-2"
                      onClick={() => excluirCategoria(category.id)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Button href="/categorias/form">Nova Categoria</Button>
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
                        onClick={() => addToCart(product)}
                        variant="primary"
                        className="mt-auto"
                      >
                        Adicionar ao Carrinho
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
