'use client';

import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";

export default function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const [busca, setBusca] = useState('');
    const [produtosFiltrados, setProdutosFiltrados] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const produtosSalvos = JSON.parse(localStorage.getItem('produtos')) || [];
        setProdutos(produtosSalvos);
        setProdutosFiltrados(produtosSalvos);
    }, []);

    // Função de busca melhorada
    useEffect(() => {
        const resultado = produtos.filter(produto =>
            produto.title.toLowerCase().includes(busca.toLowerCase())
        );
        setProdutosFiltrados(resultado);
    }, [busca, produtos]);

    return (
        <>
            <Nav />
            <Container className="py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="mb-0">Produtos</h1>
                    <Button 
                        variant="primary"
                        onClick={() => router.push('/produtos/form')}
                    >
                        Novo Produto
                    </Button>
                </div>

                {/* Barra de busca ajustada */}
                <div className="mb-4" style={{ maxWidth: '300px' }}>
                    <Form.Control
                        type="text"
                        placeholder="Buscar produto..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        size="sm"
                    />
                </div>

                {/* Mensagem quando não há resultados */}
                {produtosFiltrados.length === 0 && (
                    <div className="text-center py-4">
                        <p className="text-muted">Nenhum produto encontrado</p>
                    </div>
                )}

                <Row xs={1} md={2} lg={4} className="g-3">
                    {produtosFiltrados.map(produto => (
                        <Col key={produto.id}>
                            <Card className="h-100 shadow-sm">
                                <div style={{ 
                                    height: '180px',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#f8f9fa'
                                }}>
                                    <Card.Img
                                        variant="top"
                                        src={produto.image}
                                        style={{ 
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
                                            padding: '8px'
                                        }}
                                    />
                                </div>
                                <Card.Body className="d-flex flex-column p-3">
                                    <Card.Title 
                                        style={{ 
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            minHeight: '40px',
                                            fontSize: '0.95rem'
                                        }}
                                    >
                                        {produto.title}
                                    </Card.Title>
                                    <Card.Text className="text-primary fs-6 mb-2">
                                        R$ {Number(produto.price).toFixed(2)}
                                    </Card.Text>
                                    <div className="d-flex gap-1 mt-auto">
                                        <Button
                                            variant="outline-primary"
                                            onClick={() => router.push(`/produtos/detalhes/${produto.id}`)}
                                            className="flex-grow-1"
                                            size="sm"
                                        >
                                            Ver Detalhes
                                        </Button>
                                        <Button
                                            variant="outline-secondary"
                                            onClick={() => router.push(`/produtos/form/${produto.id}`)}
                                            size="sm"
                                        >
                                            Editar
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
} 