'use client';

import { useEffect, useState } from "react";
import Pagina from "@/app/components/Pagina";
import { Button } from "react-bootstrap";
import Link from "next/link";

export default function CategoriasPage() {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('categorias')) || [];
        setCategorias(data);
    }, []);

    const excluirCategoria = (id) => {
        const novasCategorias = categorias.filter(categoria => categoria.id !== id);
        localStorage.setItem('categorias', JSON.stringify(novasCategorias));
        setCategorias(novasCategorias);
    };

    return (
        <Pagina titulo="Categorias">
            <Link href="/categorias/form" className="btn btn-primary mb-3">Nova Categoria</Link>
            <ul>
                {categorias.map(categoria => (
                    <li key={categoria.id}>
                        {categoria.nome} 
                        <Link href={`/categorias/form/${categoria.id}`}> Editar</Link>
                        <Button onClick={() => excluirCategoria(categoria.id)}>Excluir</Button>
                    </li>
                ))}
            </ul>
        </Pagina>
    );
} 