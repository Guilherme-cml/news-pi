'use client';

import { useEffect, useState } from "react";
import Pagina from "@/app/components/Pagina";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

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
        const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        const id = Array.isArray(params.id) ? params.id[0] : params.id;

        const produtoEncontrado = produtos.find(p => p.id === id);

        if (produtoEncontrado) {
            setProduto(produtoEncontrado);
        } else {
            setError('Produto não encontrado no localStorage');
        }

        const storedCategories = JSON.parse(localStorage.getItem('categorias')) || [];
        setCategories(storedCategories);
    }, [params.id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
            const index = produtos.findIndex(p => p.id === produto.id);
            if (index !== -1) {
                produtos[index] = { ...produtos[index], ...produto };
            } else {
                produto.id = uuidv4();
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
        <Pagina titulo="Editar Produto">
            <Container>
                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="title">Título</Form.Label>
                        <Form.Control
                            type="text"
                            id="title"
                            name="title"
                            value={produto.title}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="price">Preço</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            id="price"
                            name="price"
                            value={produto.price}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="category">Categoria</Form.Label>
                        <Form.Control
                            as="select"
                            id="category"
                            name="category"
                            value={produto.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione uma categoria</option>
                            {categories.length > 0 ? (
                                categories.map(category => (
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))
                            ) : (
                                <option disabled>Sem categorias disponíveis</option>
                            )}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="image">URL da Imagem</Form.Label>
                        <Form.Control
                            type="url"
                            id="image"
                            name="image"
                            value={produto.image}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="description">Descrição</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            id="description"
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
        </Pagina>
    );
} 