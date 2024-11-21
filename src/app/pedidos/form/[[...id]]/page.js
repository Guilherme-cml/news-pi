'use client';

import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { v4 } from "uuid";

const PedidoValidator = Yup.object().shape({
    nome: Yup.string().required("Nome é obrigatório"),
    produtoId: Yup.string().required("Produto é obrigatório"),
});

export default function PedidoForm({ params }) {
    const router = useRouter();
    const [pedido, setPedido] = useState({ nome: '', produtoId: '' });

    useEffect(() => {
        if (params.id) {
            const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
            const pedidoEncontrado = pedidos.find(p => p.id === params.id);
            if (pedidoEncontrado) {
                setPedido(pedidoEncontrado);
            }
        }
    }, [params.id]);

    const salvarPedido = (values) => {
        const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
        if (params.id) {
            const index = pedidos.findIndex(p => p.id === params.id);
            pedidos[index] = { ...pedidos[index], ...values };
        } else {
            values.id = v4();
            pedidos.push(values);
        }
        localStorage.setItem('pedidos', JSON.stringify(pedidos));
        router.push('/pedidos');
    };

    return (
        <>
            <Nav />
            <Container>

                <Formik
                    initialValues={pedido}
                    validationSchema={PedidoValidator}
                    onSubmit={salvarPedido}
                >
                    {({ handleChange, handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="nome">Nome</label>
                                <input 
                                    id="nome"
                                    name="nome" 
                                    onChange={handleChange} 
                                />
                            </div>
                            <div>
                                <label htmlFor="produtoId">Produto ID</label>
                                <input 
                                    id="produtoId"
                                    name="produtoId" 
                                    onChange={handleChange} 
                                />
                            </div>
                            <button type="submit">Salvar</button>
                        </Form>
                    )}
                </Formik>
            </Container>
        </>

    );
} 