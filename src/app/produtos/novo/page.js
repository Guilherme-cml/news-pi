'use client';

import { useEffect, useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";

export default function ProdutoForm({ params }) {
    const router = useRouter();
    const [error, setError] = useState(null);
    const [produto, setProduto] = useState({
        title: '',
        price: '',
        description: '',
        category: '',
        image: ''
    });

    useEffect(() => {
        if (params?.id) {
            fetchProduto(params.id);
        }
    }, [params]);

    const fetchProduto = (id) => {
        const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        const produtoEncontrado = produtos.find(p => p.id === id);
        if (produtoEncontrado) {
            setProduto(produtoEncontrado);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
            if (params?.id) {
                const index = produtos.findIndex(p => p.id === params.id);
                produtos[index] = { ...produtos[index], ...produto };
            } else {
                produto.id = Date.now(); // Gera um ID único
                produtos.push(produto);
            }
            localStorage.setItem('produtos', JSON.stringify(produtos));
            router.push('/produtos');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduto(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            <Nav />
            <Container>
                {error && <Alert variant="danger">{error}</Alert>}
                
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Título</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={produto.title}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Preço</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            name="price"
                            value={produto.price}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control
                            type="text"
                            name="category"
                            value={produto.category}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>URL da Imagem</Form.Label>
                        <Form.Control
                            type="url"
                            name="image"
                            value={produto.image}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={produto.description}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Button type="submit" variant="primary">
                        Salvar
                    </Button>
                    <Button 
                        variant="secondary" 
                        className="ms-2"
                        onClick={() => router.push('/produtos')}
                    >
                        Cancelar
                    </Button>
                </Form>
            </Container>
        </>
    );
} 