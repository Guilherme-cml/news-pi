'use client';

import { useEffect, useState } from "react";
import { Container, Card, Button, Row, Col, Form,ListGroup, } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import { v4 } from "uuid";

export default function ProdutoDetalhes({ params }) {
    const router = useRouter();
    const [produto, setProduto] = useState(null);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const { id } = useParams();
    const savedComments = localStorage.getItem(`comments-${id}`)

    useEffect(() => {
        const id = params?.id?.[0];
        if (id) {
            const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
            const produtoEncontrado = produtos.find(p => p.id === id);
            if (produtoEncontrado) {
                setProduto(produtoEncontrado);
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
                                <div>
                                    <Button
                                        variant="primary"
                                        onClick={() => router.push(`/produtos/detalhes?id=${produto.id}`)}
                                        className="me-2"
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        onClick={() => router.push('/produtos')}
                                    >
                                        Voltar
                                    </Button>
                                </div>
                            </Card.Body>
                        </div>
                    </div>
                </Card>
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