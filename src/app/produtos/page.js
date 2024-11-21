'use client';

import { useEffect, useState } from "react";
import Pagina from "@/app/components/Pagina";
import { Button } from "react-bootstrap";
import Link from "next/link";

export default function ProdutosPage() {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('produtos')) || [];
        setProdutos(data);
    }, []);

    const excluirProduto = (id) => {
        const novosProdutos = produtos.filter(produto => produto.id !== id);
        localStorage.setItem('produtos', JSON.stringify(novosProdutos));
        setProdutos(novosProdutos);
    };

    return (
        <Pagina titulo="Produtos">
            <Link href="/produtos/form" className="btn btn-primary mb-3">Novo Produto</Link>
            <ul>
                {produtos.map(produto => (
                    <li key={produto.id}>
                        {produto.nome} 
                        <Link href={`/produtos/form/${produto.id}`}> Editar</Link>
                        <Button onClick={() => excluirProduto(produto.id)}>Excluir</Button>
                    </li>
                ))}
            </ul>
        </Pagina>
    );
} 