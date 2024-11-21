'use client';

import Pagina from "@/app/components/Pagina";

export default function DashboardPage() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const categorias = JSON.parse(localStorage.getItem('categorias')) || [];

    return (
        <Pagina titulo="Dashboard">
            <h2>Resumo</h2>
            <p>Total de Usuários: {usuarios.length}</p>
            <p>Total de Produtos: {produtos.length}</p>
            <p>Total de Pedidos: {pedidos.length}</p>
            <p>Total de Categorias: {categorias.length}</p>
        </Pagina>
    );
} 