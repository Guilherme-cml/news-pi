'use client';

import Pagina from "@/app/components/Pagina";

export default function DashboardPage() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const categorias = JSON.parse(localStorage.getItem('categorias')) || [];
    const fornecedores = JSON.parse(localStorage.getItem('fornecedores')) || [];
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];

    return (
        <Pagina titulo="Dashboard">
            <h2>Resumo</h2>
            <p>Total de Usuários: {usuarios.length}</p>
            <p>Total de Produtos: {produtos.length}</p>
            <p>Total de Pedidos: {pedidos.length}</p>
            <p>Total de Categorias: {categorias.length}</p>
            <p>Total de Fornecedores: {fornecedores.length}</p>
            <p>Total de Clientes: {clientes.length}</p>
            <p>Total de Funcionários: {funcionarios.length}</p>
        </Pagina>
    );
} 