'use client';

import { useEffect, useState } from "react";
import Pagina from "@/app/components/Pagina";
import { Button } from "react-bootstrap";
import Link from "next/link";

export default function UsuariosPage() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('usuarios')) || [];
        setUsuarios(data);
    }, []);

    const excluirUsuario = (id) => {
        const novosUsuarios = usuarios.filter(usuario => usuario.id !== id);
        localStorage.setItem('usuarios', JSON.stringify(novosUsuarios));
        setUsuarios(novosUsuarios);
    };

    return (
        <Pagina titulo="Usuários">
            <Link href="/usuarios/form" className="btn btn-primary mb-3">Novo Usuário</Link>
            <ul>
                {usuarios.map(usuario => (
                    <li key={usuario.id}>
                        {usuario.nome} 
                        <Link href={`/usuarios/form/${usuario.id}`}> Editar</Link>
                        <Button onClick={() => excluirUsuario(usuario.id)}>Excluir</Button>
                    </li>
                ))}
            </ul>
        </Pagina>
    );
} 