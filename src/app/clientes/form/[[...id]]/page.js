'use client'

import Nav from "@/components/Nav";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { mask, unmask } from "remask";
import { v4 } from "uuid";

export default function Page({ params }) {

    const route = useRouter()

    const clientes = JSON.parse(localStorage.getItem('clientes')) || []
    const dados = clientes.find(item => item.id == params.id)
    const cliente = dados || { nome: '', email: '', telefone: '', data_nascimento: '', tipo_documento: '', documento: '' }

    function salvar(dados) {

        if (cliente.id) {
            Object.assign(cliente, dados)
        } else {
            dados.id = v4()
            clientes.push(dados)
        }

        localStorage.setItem('clientes', JSON.stringify(clientes))
        return route.push('/clientes')
    }

    return (
        <>
            <Nav />
            <Container>

            <Formik
                initialValues={cliente}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                }) => {
                    return (
                        <Form>
                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nome"
                                    value={values.nome}
                                    onChange={handleChange('nome')}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="tipo_documento">
                                <Form.Label>Tipo de Documento</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="tipo_documento"
                                    value={values.tipo_documento}
                                    onChange={handleChange('tipo_documento')}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="documento">
                                <Form.Label>Documento</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="documento"
                                    value={values.documento}
                                    onChange={handleChange('documento')}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange('email')}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="telefone">
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="telefone"
                                    value={values.telefone}
                                    onChange={(value)=>{
                                        setFieldValue('telefone', mask(value.target.value, '(99) 99999-9999'))
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="data_nascimento">
                                <Form.Label>Dt. Nascimento</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="data_nascimento"
                                    value={values.data_nascimento}
                                    onChange={(value)=>{
                                        setFieldValue('data_nascimento', mask(value.target.value, '99/99/9999'))
                                    }}
                                />
                            </Form.Group>
                            <div className="text-center">
                                <Button onClick={handleSubmit} variant="success">
                                    <FaCheck /> Salvar
                                </Button>
                                <Link
                                    href="/clientes"
                                    className="btn btn-danger ms-2"
                                >
                                    <MdOutlineArrowBack /> Voltar
                                </Link>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
            </Container>
        </>
    )
}
