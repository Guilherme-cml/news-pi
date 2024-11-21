'use client';

import { useEffect, useState } from "react";

import { Formik } from "formik";
import { Button, Container, Form } from "react-bootstrap";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { v4 } from "uuid";
import Nav from "@/components/Nav";

const CategoriaValidator = Yup.object().shape({
    name: Yup.string().required("Nome é obrigatório"),
});

export default function CategoriaForm({ params }) {
    const router = useRouter();
    const categorias = JSON.parse(localStorage.getItem('categorias')) || [];
    const categoriaEncontrada = categorias.find(c => c.id === params.id?.[0]);
    const dados = categoriaEncontrada || { name: '' };
    

    // useEffect(() => {
    //     if (params.id) {
           
    //         if (categoriaEncontrada) {
    //             setCategoria(categoriaEncontrada);
    //         }
    //     }
    // }, [params.id]);

    const salvarCategoria = (values) => {
        const categorias = JSON.parse(localStorage.getItem('categorias')) || [];
        if (params.id?.[0]) {
            const index = categorias.findIndex(c => c.id === params.id[0]);
            if (index !== -1) {
                categorias[index] = { ...categorias[index], ...values };
            }
        } else {
            values.id = v4();
            categorias.push(values);
        }
        localStorage.setItem('categorias', JSON.stringify(categorias));
        router.push('/categorias');
    };

    return (
        <>
            <Nav />
            <Container>
            <Formik
                            initialValues={dados}
                            validationSchema={CategoriaValidator}
                            onSubmit={salvarCategoria}
                        >
                            {({
                                values,
                                handleChange,
                                handleSubmit
                            }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>Nome da Categoria</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}

                                            placeholder="Nome da Categoria"
                                        />
                            
                                    </Form.Group>

                                    <Button variant="primary" type="submit">
                                        Salvar
                                    </Button>
                                </Form>
                            )}
                        </Formik>

            {/* <Formik
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
                        <Button type="submit">Salvar</button>
                    </Form>
                )}
            </Formik> */}
            </Container>
        </>
    );
} 