'use client';

import { useEffect, useState } from "react";
import Pagina from "@/app/components/Pagina";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

const FuncionarioValidator = Yup.object().shape({
    nome: Yup.string().required("Nome é obrigatório"),
});

export default function FuncionarioForm({ params }) {
    const router = useRouter();
    const [funcionario, setFuncionario] = useState({ nome: '' });

    useEffect(() => {
        if (params.id) {
            const funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
            const funcionarioEncontrado = funcionarios.find(f => f.id === params.id);
            if (funcionarioEncontrado) {
                setFuncionario(funcionarioEncontrado);
            }
        }
    }, [params.id]);

    const salvarFuncionario = (values) => {
        const funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
        if (params.id) {
            const index = funcionarios.findIndex(f => f.id === params.id);
            funcionarios[index] = { ...funcionarios[index], ...values };
        } else {
            values.id = Date.now();
            funcionarios.push(values);
        }
        localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
        router.push('/funcionarios');
    };

    return (
        <Pagina titulo={params.id ? "Editar Funcionário" : "Novo Funcionário"}>
            <Formik
                initialValues={funcionario}
                validationSchema={FuncionarioValidator}
                onSubmit={salvarFuncionario}
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