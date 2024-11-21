'use client';

import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { v4 } from "uuid";
import Nav from "@/components/Nav";

export default function FormProduto({ params }) {
    const router = useRouter();
    const [produto, setProduto] = useState({
        title: '',
        price: '',
        description: '',
        category: '',
        image: ''
    });
    const [categorias, setCategorias] = useState([]);
    useEffect(() => {
        if (params.id) {
            const produtos = JSON.parse(localStorage.getItem('produtos')) || []
            const produtoEncontrado = produtos.find(produto => produto.id === params.id[0])
            if (produtoEncontrado) {
                setProduto(produtoEncontrado)
            }
        }
    }, [params])
    
    useEffect(() => {
        const categoriasStorage = JSON.parse(localStorage.getItem('categorias')) || [];
        setCategorias(categoriasStorage);
    }, []);
        function handleSubmit(e) {
        e.preventDefault()

        // Validação básica
        if (!produto.title || !produto.price || !produto.category) {
            alert('Por favor, preencha todos os campos obrigatórios (Título, Preço e Categoria)');
            return;
        }

        // Validação do preço
        if (isNaN(produto.price) || Number(produto.price) <= 0) {
            alert('Por favor, insira um preço válido');
            return;
        }

        try {
            const produtos = JSON.parse(localStorage.getItem('produtos')) || []

            if (params.id) {
                // Modo Edição
                const index = produtos.findIndex(p => p.id === params.id[0])
                if (index !== -1) {
                    produtos[index] = { ...produto }
                    localStorage.setItem('produtos', JSON.stringify(produtos))
                    alert('Produto atualizado com sucesso!')
                }
            } else {
                // Modo Criação
                const novoProduto = {
                    ...produto,
                    id: v4()
                }
                produtos.push(novoProduto)
                localStorage.setItem('produtos', JSON.stringify(produtos))
                alert('Produto cadastrado com sucesso!')
            }

            router.push('/produtos')
        } catch (error) {
            console.error(error)
            alert('Ocorreu um erro ao salvar o produto')
        }
    }

    function handleChange(e) {
        const { name, value } = e.target
        setProduto(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <>
            <Nav />
            <Container className="py-4">
                <Card>
                    <Card.Header as="h5" className="text-center">
                        {params.id ? 'Editar Produto' : 'Novo Produto'}
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>Título*</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={produto.title}
                                    onChange={handleChange}
                                    placeholder="Nome do produto"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="price">
                                <Form.Label>Preço*</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="price"
                                    value={produto.price}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    step="0.01"
                                    min="0"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="category">
                                <Form.Label>Categoria*</Form.Label>
                                <Form.Select
                                    name="category"
                                    value={produto.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecione uma categoria</option>
                                    {categorias.map(categoria => (
                                        <option key={categoria.id} value={categoria.id}>
                                            {categoria.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="image">
                                <Form.Label>URL da Imagem</Form.Label>
                                <Form.Control
                                    type="url"
                                    name="image"
                                    value={produto.image}
                                    onChange={handleChange}
                                    placeholder="https://exemplo.com/imagem.jpg"
                                />
                            </Form.Group>

                            <Form.Group className="mb-4" controlId="description">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    value={produto.description}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder="Descrição detalhada do produto"
                                />
                            </Form.Group>

                            <div className="d-flex gap-2">
                                <Button type="submit" variant="primary" className="px-4">
                                    {params.id ? 'Atualizar' : 'Cadastrar'}
                                </Button>
                                <Button 
                                    type="button" 
                                    variant="outline-secondary" 
                                    onClick={() => router.push('/produtos')}
                                    className="px-4"
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
} 