'use client';

import { useEffect, useState } from "react";
import Pagina from "@/app/components/Pagina";
import { Button } from "react-bootstrap";
import Link from "next/link";

export default function FuncionariosPage() {
    const [funcionarios, setFuncionarios] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('funcionarios')) || [];
        setFuncionarios(data);
    }, []);

    const excluirFuncionario = (id) => {
        const novosFuncionarios = funcionarios.filter(funcionario => funcionario.id !== id);
        localStorage.setItem('funcionarios', JSON.stringify(novosFuncionarios));
        setFuncionarios(novosFuncionarios);
    };

    return (
        <Pagina titulo="Funcionários">
            <Link href="/funcionarios/form" className="btn btn-primary mb-3">Novo Funcionário</Link>
            <ul>
                {funcionarios.map(funcionario => (
                    <li key={funcionario.id}>
                        {funcionario.nome}
                        <Link href={`/funcionarios/form/${funcionario.id}`}> Editar</Link>
                        <Button onClick={() => excluirFuncionario(funcionario.id)}>Excluir</Button>
                    </li>
                ))}
            </ul>
        </Pagina>
    );
} 