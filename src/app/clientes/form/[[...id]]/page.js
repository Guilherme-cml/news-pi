'use client';

import { useEffect, useState } from "react";
import Pagina from "@/app/components/Pagina";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

const ClienteValidator = Yup.object().shape({
    nome: Yup.string().required("Nome é obrigatório"),
});

export default function ClienteForm({ params }) {
    const router = useRouter();
    const [cliente, setCliente] = useState({ nome: '' });

    useEffect(() => {
        if (params.id) {
            const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
            const clienteEncontrado = clientes.find(c => c.id === params.id);
            if (clienteEncontrado) {
                setCliente(clienteEncontrado);
            }
        }
    }, [params.id]);

    const salvarCliente = (values) => {
        const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        if (params.id) {
            const index = clientes.findIndex(c => c.id === params.id);
            clientes[index] = { ...clientes[index], ...values };
        } else {
            values.id = Date.now();
            clientes.push(values);
        }
        localStorage.setItem('clientes', JSON.stringify(clientes));
        router.push('/clientes');
    };

    return (
        <Pagina titulo={params.id ? "Editar Cliente" : "Novo Cliente"}>
            <Formik
                initialValues={cliente}
                validationSchema={ClienteValidator}
                onSubmit={salvarCliente}
            >
                {({ handleChange, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <div>
                            <label>Nome</label>
                            <input name="nome" onChange={handleChange} />
                        </div>
                        <button type="submit">Salvar</button>
                    </Form>
                )}
            </Formik>
        </Pagina>
    );
} 