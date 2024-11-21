'use client';

import { useEffect, useState } from "react";
import Pagina from "@/app/components/Pagina";
import { Button } from "react-bootstrap";
import Link from "next/link";

export default function FornecedoresPage() {
    const [fornecedores, setFornecedores] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('fornecedores')) || [];
        setFornecedores(data);
    }, []);

    const excluirFornecedor = (id) => {
        const novosFornecedores = fornecedores.filter(fornecedor => fornecedor.id !== id);
        localStorage.setItem('fornecedores', JSON.stringify(novosFornecedores));
        setFornecedores(novosFornecedores);
    };

    return (
        <Pagina titulo="Fornecedores">
            <Link href="/fornecedores/form" className="btn btn-primary mb-3">Novo Fornecedor</Link>
            <ul>
                {fornecedores.map(fornecedor => (
                    <li key={fornecedor.id}>
                        {fornecedor.nome}
                        <Link href={`/fornecedores/form/${fornecedor.id}`}> Editar</Link>
                        <Button onClick={() => excluirFornecedor(fornecedor.id)}>Excluir</Button>
                    </li>
                ))}
            </ul>
        </Pagina>
    );
} 