'use client';

import { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";

export default function ProdutoDetalhes({ params }) {
    const router = useRouter();
    const [produto, setProduto] = useState(null);

    useEffect(() => {
        const id = params?.id?.[0];
        if (id) {
            const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
            const produtoEncontrado = produtos.find(p => p.id === id);
            if (produtoEncontrado) {
                setProduto(produtoEncontrado);
            }
        }
    }, [params]);

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
            <Container className="py-4">
                <Card>
                    <div className="row g-0">
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
            </Container>
        </>
    );
} 