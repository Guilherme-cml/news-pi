'use client'

import Nav from "@/components/Nav"
import Link from "next/link"
import { useEffect, useState } from "react";
import { Button, Container, Table, Form, Badge, Card } from "react-bootstrap"
import { FaPlusCircle, FaSearch } from "react-icons/fa";

export default function Page() {
    const [clientes, setClientes] = useState([])
    const [busca, setBusca] = useState('')
    const [clientesFiltrados, setClientesFiltrados] = useState([])

    useEffect(() => {
        const dadosClientes = JSON.parse(localStorage.getItem('clientes')) || []
        setClientes(dadosClientes)
        setClientesFiltrados(dadosClientes)
    }, [])

    useEffect(() => {
        const resultado = clientes.filter(cliente => 
            cliente.cpf.toLowerCase().includes(busca.toLowerCase())
        )
        setClientesFiltrados(resultado)
    }, [busca, clientes])

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = clientes.filter(item => item.id != id)
            localStorage.setItem('clientes', JSON.stringify(dados))
            setClientes(dados)
        }
    }

    return (
        <>
            <Nav />
            <Container className="py-4">
                <Card className="shadow-sm">
                    <Card.Header className="bg-primary text-white">
                        <h4 className="mb-0">Gerenciamento de Clientes</h4>
                    </Card.Header>
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div className="d-flex align-items-center gap-3">
                                <Link
                                    href="/clientes/form"
                                    className="btn btn-primary d-flex align-items-center gap-2"
                                >
                                    <FaPlusCircle /> Novo Cliente
                                </Link>
                                <Badge bg="success" className="fs-6 px-3 py-2">
                                    Total de Clientes: {clientesFiltrados.length}
                                </Badge>
                            </div>
                            <div className="d-flex align-items-center">
                                <div style={{width: '300px'}}>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Buscar por CPF..."
                                        value={busca}
                                        onChange={e => setBusca(e.target.value)}
                                        className="border-end-0"
                                    />

                                </div>
                            </div>
                        </div>

                        <div className="table-responsive">
                            <Table striped bordered hover className="align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th className="text-center">Nome</th>
                                        <th className="text-center">E-mail</th>
                                        <th className="text-center">CPF</th>
                                        <th className="text-center">Telefone</th>
                                        <th className="text-center">Data de Nascimento</th>
                                        <th className="text-center">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clientesFiltrados.length > 0 ? (
                                        clientesFiltrados.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.nome}</td>
                                                <td>{item.email}</td>
                                                <td className="text-center">{item.cpf}</td>
                                                <td className="text-center">{item.telefone}</td>
                                                <td className="text-center">{item.data_nascimento}</td>
                                                <td className="text-center">
                                                    <div className="d-flex gap-2 justify-content-center">
                                                        <Link 
                                                            href={`/clientes/form/${item.id}`} 
                                                            className="btn btn-primary btn-sm"
                                                        >
                                                            Editar
                                                        </Link>
                                                        <Button 
                                                            size="sm"
                                                            variant="danger"
                                                            onClick={() => excluir(item.id)}
                                                        >
                                                            Excluir
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center py-4 text-muted">
                                                Nenhum cliente encontrado
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}