'use client';

import { Pie, Bar } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Container } from 'react-bootstrap';

// Registrar os elementos e escalas necessários
Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function DashboardPage() {
    const [usuarios, setUsuarios] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const usuariosData = JSON.parse(localStorage.getItem('usuarios')) || [];
        const produtosData = JSON.parse(localStorage.getItem('produtos')) || [];
        const categoriasData = JSON.parse(localStorage.getItem('categorias')) || [];

        setUsuarios(usuariosData);
        setProdutos(produtosData);
        setCategorias(categoriasData);
        setLoading(false);
    }, []);

    const totalProdutos = produtos.length;

    const categoriasCount = categorias.map(categoria => {
        const count = produtos.filter(produto => produto.category === categoria.name).length;
        return { name: categoria.name, count };
    });

    const pieData = {
        labels: categoriasCount.map(c => c.name),
        datasets: [{
            data: categoriasCount.map(c => c.count),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
        }]
    };

    const barData = {
        labels: produtos.map(produto => produto.title),
        datasets: [{
            label: 'Preço',
            data: produtos.map(produto => produto.price),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }]
    };

    return (
        <>
            <Nav />
            <Container>

            <h2>Resumo</h2>
            <p>Total de Usuários: {usuarios.length}</p>
            <p>Total de Produtos: {totalProdutos}</p>

            {loading ? (
                <p>Carregando...</p>
            ) : (
                <>
                    <h3>Distribuição de Categorias</h3>
                    <Pie data={pieData} />
                    <h3>Preços dos Produtos</h3>
                    <Bar data={barData} />
                </>
            )}
        
            </Container>
        </>
    );
} 