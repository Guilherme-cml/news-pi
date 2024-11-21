'use client'

import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { v4 } from "uuid";
import Nav from "@/components/Nav";

export default function FormCliente({ params }) {
    const router = useRouter();
    const [cliente, setCliente] = useState({
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
        dataNascimento: ''
    });

    useEffect(() => {
        if (params.id) {
            const clientes = JSON.parse(localStorage.getItem('clientes')) || []
            const clienteEncontrado = clientes.find(cliente => cliente.id === params.id[0])
            if (clienteEncontrado) {
                setCliente(clienteEncontrado)
            }
        }
    }, [params])

    function handleSubmit(e) {
        e.preventDefault()

        // Validação básica
        if (!cliente.nome || !cliente.cpf || !cliente.email) {
            alert('Por favor, preencha todos os campos obrigatórios');
            return;
        }

        try {
            const clientes = JSON.parse(localStorage.getItem('clientes')) || []

            if (params.id) {
                // Modo Edição
                const index = clientes.findIndex(c => c.id === params.id[0])
                if (index !== -1) {
                    clientes[index] = { ...cliente }
                    localStorage.setItem('clientes', JSON.stringify(clientes))
                    alert('Cliente atualizado com sucesso!')
                }
            } else {
                // Modo Criação
                const novoCliente = {
                    ...cliente,
                    id: v4()
                }
                clientes.push(novoCliente)
                localStorage.setItem('clientes', JSON.stringify(clientes))
                alert('Cliente cadastrado com sucesso!')
            }

            router.push('/clientes')
        } catch (error) {
            console.error(error)
            alert('Ocorreu um erro ao salvar o cliente')
        }
    }

    function handleChange(e) {
        const { name, value } = e.target
        setCliente(prev => ({
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
                        {params.id ? 'Editar Cliente' : 'Novo Cliente'}
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label>Nome*</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nome"
                                    value={cliente.nome}
                                    onChange={handleChange}
                                    placeholder="Nome completo"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="cpf">
                                <Form.Label>CPF*</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cpf"
                                    value={cliente.cpf}
                                    onChange={handleChange}
                                    placeholder="000.000.000-00"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email*</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={cliente.email}
                                    onChange={handleChange}
                                    placeholder="email@exemplo.com"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="telefone">
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control
                                    type="tel"
                                    name="telefone"
                                    value={cliente.telefone}
                                    onChange={handleChange}
                                    placeholder="(00) 00000-0000"
                                />
                            </Form.Group>

                            <Form.Group className="mb-4" controlId="dataNascimento">
                                <Form.Label>Data de Nascimento</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dataNascimento"
                                    value={cliente.dataNascimento}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <div className="d-flex gap-2">
                                <Button type="submit" variant="primary" className="px-4">
                                    {params.id ? 'Atualizar' : 'Cadastrar'}
                                </Button>
                                <Button 
                                    type="button" 
                                    variant="outline-secondary" 
                                    onClick={() => router.push('/clientes')}
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
