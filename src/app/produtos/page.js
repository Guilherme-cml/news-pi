'use client';

import { useEffect, useState } from "react";

import { Button, Table, Spinner, Alert, Container } from "react-bootstrap";
import Link from "next/link";
import Nav from "@/components/Nav";

export default function ProdutosPage() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadLocalStorageProdutos();
    }, []);

    const loadLocalStorageProdutos = () => {
        const produtosLocalStorage = JSON.parse(localStorage.getItem('produtos')) || [];
        setProdutos(produtosLocalStorage);
        setLoading(false);
    };

    const excluirProduto = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este produto?')) {
            const novosProdutos = produtos.filter(p => p.id !== id);
            localStorage.setItem('produtos', JSON.stringify(novosProdutos));
            setProdutos(novosProdutos);
        }
    };

    if (loading) return (
        <Container>
            <Spinner animation="border" />
        </Container>
    );

    if (error) return (
        <Container>
            <Alert variant="danger">{error}</Alert>
        </Container>
    );

    return (
        <>
            <Nav />
            <Container>
                <Link href="/produtos/novo" className="btn btn-primary mb-3">Novo Produto</Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Imagem</th>
                            <th>Título</th>
                            <th>Categoria</th>
                            <th>Preço</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map(produto => (
                            <tr key={produto.id}>
                                <td>
                                    <img 
                                        src={produto.image} 
                                        alt={produto.title}
                                        style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                                    />
                                </td>
                                <td>{produto.title}</td>
                                <td>{produto.category}</td>
                                <td>R$ {produto.price}</td>
                                <td>
                                    <Link href={`/produtos/form/${produto.id}`} className="btn btn-warning me-2">
                                        Editar
                                    </Link>
                                    <Button variant="danger" onClick={() => excluirProduto(produto.id)}>
                                        Excluir
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
} 