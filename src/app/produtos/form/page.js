'use client';

import { useEffect, useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";

export default function ProdutoForm({ params }) {
    const router = useRouter();
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [produto, setProduto] = useState({
        title: '',
        price: '',
        description: '',
        category: '',
        image: ''
    });

    useEffect(() => {
        fetchCategories();
        if (params?.id) {
            fetchProduto(params.id);
        }
    }, [params]);

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products/categories');
            if (!response.ok) throw new Error('Erro ao carregar categorias');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchProduto = async (id) => {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            if (!response.ok) throw new Error('Erro ao carregar produto');
            const data = await response.json();
            setProduto(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = 'https://fakestoreapi.com/products';
            const method = params?.id ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(produto),
            });

            if (!response.ok) throw new Error('Erro ao salvar produto');
            const data = await response.json();
            console.log('Produto salvo:', data);
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
                    <Form.Select
                        name="category"
                        value={produto.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione uma categoria</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </Form.Select>
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