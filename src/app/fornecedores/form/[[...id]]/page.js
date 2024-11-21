'use client';

import { useEffect, useState } from "react";
import Pagina from "@/app/components/Pagina";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

const FornecedorValidator = Yup.object().shape({
    nome: Yup.string().required("Nome é obrigatório"),
});

export default function FornecedorForm({ params }) {
    const router = useRouter();
    const [fornecedor, setFornecedor] = useState({ nome: '' });

    useEffect(() => {
        if (params.id) {
            const fornecedores = JSON.parse(localStorage.getItem('fornecedores')) || [];
            const fornecedorEncontrado = fornecedores.find(f => f.id === params.id);
            if (fornecedorEncontrado) {
                setFornecedor(fornecedorEncontrado);
            }
        }
    }, [params.id]);

    const salvarFornecedor = (values) => {
        const fornecedores = JSON.parse(localStorage.getItem('fornecedores')) || [];
        if (params.id) {
            const index = fornecedores.findIndex(f => f.id === params.id);
            fornecedores[index] = { ...fornecedores[index], ...values };
        } else {
            values.id = Date.now();
            fornecedores.push(values);
        }
        localStorage.setItem('fornecedores', JSON.stringify(fornecedores));
        router.push('/fornecedores');
    };

    return (
        <Pagina titulo={params.id ? "Editar Fornecedor" : "Novo Fornecedor"}>
            <Formik
                initialValues={fornecedor}
                validationSchema={FornecedorValidator}
                onSubmit={salvarFornecedor}
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