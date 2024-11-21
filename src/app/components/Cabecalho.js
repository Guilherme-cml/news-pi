export default function Cabecalho(props) {
    return (
        <header>
            <h1>{props.titulo}</h1>
            <nav>
                <a href="/usuarios">Usuários</a>
                <a href="/produtos">Produtos</a>
                <a href="/pedidos">Pedidos</a>
                <a href="/categorias">Categorias</a>
                <a href="/dashboard">Dashboard</a>
            </nav>
        </header>
    );
} 