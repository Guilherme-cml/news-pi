'use client';

import { useEffect, useState } from "react";
import Pagina from "@/app/components/Pagina";
import { Button } from "react-bootstrap";
import Link from "next/link";

export default function PedidosPage() {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('pedidos')) || [];
        setPedidos(data);
    }, []);

    const excluirPedido = (id) => {
        const novosPedidos = pedidos.filter(pedido => pedido.id !== id);
        localStorage.setItem('pedidos', JSON.stringify(novosPedidos));
        setPedidos(novosPedidos);
    };

    return (
        <Pagina titulo="Pedidos">
            <Link href="/pedidos/form" className="btn btn-primary mb-3">Novo Pedido</Link>
            <ul>
                {pedidos.map(pedido => (
                    <li key={pedido.id}>
                        {pedido.nome} 
                        <Link href={`/pedidos/form/${pedido.id}`}> Editar</Link>
                        <Button onClick={() => excluirPedido(pedido.id)}>Excluir</Button>
                    </li>
                ))}
            </ul>
        </Pagina>
    );
} 