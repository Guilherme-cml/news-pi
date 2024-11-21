'use client';

import { useEffect, useState } from "react";
import Pagina from "@/app/components/Pagina";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

const UsuarioValidator = Yup.object().shape({
    nome: Yup.string().required("Nome é obrigatório"),
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    telefone: Yup.string().required("Telefone é obrigatório"),
});

export default function UsuarioForm({ params }) {
    const router = useRouter();
    const [usuario, setUsuario] = useState({ nome: '', email: '', telefone: '' });

    useEffect(() => {
        if (params.id) {
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const usuarioEncontrado = usuarios.find(u => u.id === params.id);
            if (usuarioEncontrado) {
                setUsuario(usuarioEncontrado);
            }
        }
    }, [params.id]);

    const salvarUsuario = (values) => {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        if (params.id) {
            const index = usuarios.findIndex(u => u.id === params.id);
            usuarios[index] = { ...usuarios[index], ...values };
        } else {
            values.id = Date.now();
            usuarios.push(values);
        }
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        router.push('/usuarios');
    };

    return (
        <Pagina titulo={params.id ? "Editar Usuário" : "Novo Usuário"}>
            <Formik
                initialValues={usuario}
                validationSchema={UsuarioValidator}
                onSubmit={salvarUsuario}
            >
                {({ handleChange, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <div>
                            <label>Nome</label>
                            <input name="nome" onChange={handleChange} />
                        </div>
                        <div>
                            <label>Email</label>
                            <input name="email" onChange={handleChange} />
                        </div>
                        <div>
                            <label>Telefone</label>
                            <input name="telefone" onChange={handleChange} />
                        </div>
                        <button type="submit">Salvar</button>
                    </Form>
                )}
            </Formik>
        </Pagina>
    );
} 