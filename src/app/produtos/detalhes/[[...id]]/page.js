'use client';

import { useEffect, useState } from "react";
import { Container, Card, Button, Row, Col, Form,ListGroup, } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import { v4 } from "uuid";

export default function ProdutoDetalhes({ params }) {
    const router = useRouter();
    const [produto, setProduto] = useState(null);
    const [produtosRelacionados, setProdutosRelacionados] = useState([]);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const { id } = useParams();
    const savedComments = localStorage.getItem(`comments-${id}`)

    useEffect(() => {
        const id = params?.id?.[0];
        if (id) {
            const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
            const produtoEncontrado = produtos.find(p => p.id === id);
            
            if (produtoEncontrado) {
                setProduto(produtoEncontrado);
                
                const relacionados = produtos.filter(p => 
                    p.category === produtoEncontrado.category && 
                    p.id !== produtoEncontrado.id
                ).slice(0, 4);
                
                setProdutosRelacionados(relacionados);
            }
        }
        if (savedComments) {
            setComments(JSON.parse(savedComments));
          }
    }, [params]);

    function handleComment(e) {
        e.preventDefault();
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if (!currentUser) {
          setMessage({ type: 'danger', text: 'Please login to add comments' });
          return;
        }
    
        const newComment = {
          id: v4(),
          text: comment,
          userId: currentUser.id,
          username: currentUser.username,
          date: new Date().toISOString()
        };
    
        const update = [...comments, newComment];
        localStorage.setItem(`comments-${id}`, JSON.stringify(update));
        setComments(update);
        setComment('');
    
      };
      function deleteComment(commentId) {
        const updatedComments = comments.filter(comment => comment.id !== commentId);
        localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
        setComments(updatedComments);
      };
      
      function editComment(commentId, newText) {
        const updatedComments = comments.map(comment => {
          if (comment.id === commentId) {
            return { ...comment, text: newText };
          }
          return comment;
        });
        localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
        setComments(updatedComments);
        setEditingCommentId(null);
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

    if (!produto) {
        return (
            <>
                <Nav />
                <Container>
                    <p>Produto não encontrado</p>
                </Container>
            </>
        );
    }

    return (
        <>
            <Nav />
            <h2 className="text-center mt-4">Detalhes do Produto</h2>
            <Container className="py-4">
                <Card>
                    <div className="row g-0 m-3">
                        <div className="col-md-4">
                            <Card.Img
                                src={produto.image}
                                alt={produto.title}
                                className="img-fluid rounded-start"
                                style={{ objectFit: 'cover', height: '100%' }}
                            />
                        </div>
                        <div className="col-md-8">
                            <Card.Body>
                                <Card.Title className="h3 mb-3">{produto.title}</Card.Title>
                                <Card.Text className="fs-4 text-primary mb-3">
                                    R$ {Number(produto.price).toFixed(2)}
                                </Card.Text>
                                <Card.Text className="mb-3">
                                    <strong>Categoria:</strong> {produto.category}
                                </Card.Text>
                                <Card.Text className="mb-4">
                                    {produto.description}
                                </Card.Text>
                                <div className="d-flex gap-2">
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => router.push(`/produtos/form/${produto.id}`)}
                                        className="px-4"
                                    >
                                        <i className="bi bi-pencil me-2"></i>
                                        Editar
                                    </Button>
                                    <Button
                                        variant="primary"
                                        onClick={() => addToCart(produto)}
                                        className="px-4"
                                    >
                                        <i className="bi bi-cart-plus me-2"></i>
                                        Adicionar ao Carrinho
                                    </Button>
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => router.push('/produtos')}
                                        className="px-4"
                                    >
                                        <i className="bi bi-arrow-left me-2"></i>
                                        Voltar
                                    </Button>
                                </div>
                            </Card.Body>
                        </div>
                    </div>
                </Card>

                {produtosRelacionados.length > 0 && (
                    <div className="mt-5">
                        <h3 className="mb-4">Produtos Relacionados</h3>
                        <Row>
                            {produtosRelacionados.map((produtoRel) => (
                                <Col key={produtoRel.id} md={3} className="mb-3">
                                    <Card style={{ height: '100%' }}>
                                        <div style={{ 
                                            height: '200px', 
                                            overflow: 'hidden',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#f8f9fa'
                                        }}>
                                            <Card.Img
                                                variant="top"
                                                src={produtoRel.image}
                                                style={{ 
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'contain',
                                                    padding: '10px'
                                                }}
                                            />
                                        </div>
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title className="h5" style={{ 
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                minHeight: '48px'
                                            }}>
                                                {produtoRel.title}
                                            </Card.Title>
                                            <Card.Text className="text-primary">
                                                R$ {Number(produtoRel.price).toFixed(2)}
                                            </Card.Text>
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                onClick={() => router.push(`/produtos/detalhes/${produtoRel.id}`)}
                                                className="mt-auto"
                                            >
                                                Ver Detalhes
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                )}

                <Row className="mb-5 mt-4" >
        <Col>
          <h3>Comentários</h3>
          <Form onSubmit={handleComment} className="mb-4">
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Escreva seu comentário..."
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Adicionar Comentário
            </Button>
          </Form>

          <ListGroup>
            {comments.map((comment) => (
              <ListGroup.Item key={comment.id}>
                <strong>{comment.username}</strong>
                <p>{comment.text}</p>
                <Button 
                  variant="link" 
                  onClick={() => {
                    const newText = prompt('Edit comment:', comment.text);
                    if (newText) editComment(comment.id, newText);
                  }}
                >
                  Editar
                </Button>
                <Button 
                  variant="link" 
                  onClick={() => deleteComment(comment.id)}
                >
                  Deletar
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
            </Container>
        </>
    );
} 