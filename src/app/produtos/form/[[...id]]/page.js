'use client';

import { useEffect, useState } from "react";
import Pagina from "@/app/components/Pagina";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

const ProdutoValidator = Yup.object().shape({
    nome: Yup.string().required("Nome é obrigatório"),
    preco: Yup.number().required("Preço é obrigatório").positive("Deve ser um número positivo"),
});

export default function ProdutoForm({ params }) {
    const router = useRouter();
    const [produto, setProduto] = useState({ nome: '', preco: '' });

    useEffect(() => {
        if (params.id) {
            const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
            const produtoEncontrado = produtos.find(p => p.id === params.id);
            if (produtoEncontrado) {
                setProduto(produtoEncontrado);
            }
        }
    }, [params.id]);

    const salvarProduto = (values) => {
        const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        if (params.id) {
            const index = produtos.findIndex(p => p.id === params.id);
            produtos[index] = { ...produtos[index], ...values };
        } else {
            values.id = Date.now();
            produtos.push(values);
        }
        localStorage.setItem('produtos', JSON.stringify(produtos));
        router.push('/produtos');
    };

    return (
        <Pagina titulo={params.id ? "Editar Produto" : "Novo Produto"}>
            <Formik
                initialValues={produto}
                validationSchema={ProdutoValidator}
                onSubmit={salvarProduto}
            >
                {({ handleChange, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <div>
                            <label>Nome</label>
                            <input name="nome" onChange={handleChange} />
                        </div>
                        <div>
                            <label>Preço</label>
                            <input name="preco" type="number" onChange={handleChange} />
                        </div>
                        <button type="submit">Salvar</button>
                    </Form>
                )}
            </Formik>
        </Pagina>
    );
} 