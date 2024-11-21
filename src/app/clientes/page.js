'use client';

import { useEffect, useState } from "react";
import Pagina from "@/app/components/Pagina";
import { Button } from "react-bootstrap";
import Link from "next/link";

export default function ClientesPage() {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('clientes')) || [];
        setClientes(data);
    }, []);

    const excluirCliente = (id) => {
        const novosClientes = clientes.filter(cliente => cliente.id !== id);
        localStorage.setItem('clientes', JSON.stringify(novosClientes));
        setClientes(novosClientes);
    };

    return (
        <Pagina titulo="Clientes">
            <Link href="/clientes/form" className="btn btn-primary mb-3">Novo Cliente</Link>
            <ul>
                {clientes.map(cliente => (
                    <li key={cliente.id}>
                        {cliente.nome} 
                        <Link href={`/clientes/form/${cliente.id}`}> Editar</Link>
                        <Button onClick={() => excluirCliente(cliente.id)}>Excluir</Button>
                    </li>
                ))}
            </ul>
        </Pagina>
    );
} 