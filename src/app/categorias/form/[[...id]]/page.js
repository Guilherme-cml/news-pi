'use client';

import { useEffect, useState } from "react";
import Pagina from "@/app/components/Pagina";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

const CategoriaValidator = Yup.object().shape({
    nome: Yup.string().required("Nome é obrigatório"),
});

export default function CategoriaForm({ params }) {
    const router = useRouter();
    const [categoria, setCategoria] = useState({ nome: '' });

    useEffect(() => {
        if (params.id) {
            const categorias = JSON.parse(localStorage.getItem('categorias')) || [];
            const categoriaEncontrada = categorias.find(c => c.id === params.id);
            if (categoriaEncontrada) {
                setCategoria(categoriaEncontrada);
            }
        }
    }, [params.id]);

    const salvarCategoria = (values) => {
        const categorias = JSON.parse(localStorage.getItem('categorias')) || [];
        if (params.id) {
            const index = categorias.findIndex(c => c.id === params.id);
            categorias[index] = { ...categorias[index], ...values };
        } else {
            values.id = Date.now();
            categorias.push(values);
        }
        localStorage.setItem('categorias', JSON.stringify(categorias));
        router.push('/categorias');
    };

    return (
        <Pagina titulo={params.id ? "Editar Categoria" : "Nova Categoria"}>
            <Formik
                initialValues={categoria}
                validationSchema={CategoriaValidator}
                onSubmit={salvarCategoria}
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