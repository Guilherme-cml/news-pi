'use client'

import Nav from "@/components/Nav"
import Link from "next/link"
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap"
import { FaPlusCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Page() {

    const [clientes, setClientes] = useState([])

    useEffect(() => {
        setClientes(JSON.parse(localStorage.getItem('clientes')) || [])
    }, [])

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
            <Container>
            <Link
                href="/clientes/form"
                className="btn btn-primary mb-3"
            >
                <FaPlusCircle /> Novo
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>CPF</th>
                        <th>Telefone</th>
                        <th>Data de Nascimento</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((item, i) => (
                        <tr key={item.id}>
                            <td>{item.nome}</td>
                            <td>{item.email}</td>
                            <td>{item.cpf}</td>
                            <td>{item.telefone}</td>
                            <td>{item.data_nascimento}</td>
                            <td>
                                   
                                    <Link href={`/clientes/form/${item.id}`} className="btn btn-primary me-2">
                                        Editar
                                    </Link>
                                    <Button className=" btn btn-danger" onClick={() => excluir(item.id)}>
                                        Excluir
                                    </Button>
                                </td>
                           
                        </tr>
                    ))}
                </tbody>
                </Table>
            </Container>
        </>
    )
}