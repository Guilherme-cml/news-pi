'use client'
import { Formik } from "formik";
import Nav from "../../components/Nav";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import * as Yup from 'yup';

const LoginValidator = Yup.object().shape({
    email: Yup.string()
        .email('Email inválido')
        .required('Campo obrigatório'),
    password: Yup.string()
        .required('Campo obrigatório')
});

export default function LoginPage() {
    const router = useRouter();
    const initialValues = { email: '', password: '' };

    function getRegisteredUsers() {
        const users = localStorage.getItem('registeredUsers');
        return users ? JSON.parse(users) : [];
    }

    function handleLogin(values) {
        const registeredUsers = getRegisteredUsers();
        
        if (registeredUsers.length === 0) {
            alert("Nenhum usuário cadastrado!");
            return;
        }
        
        const user = registeredUsers.find(user => user.email === values.email);
        
        if (!user) {
            alert("Email não encontrado!");
            return;
        }
        
        if (user.password === values.password) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            alert("Login realizado com sucesso!");
            router.push('/user');
        } else {
            alert("Senha incorreta!");
        }
    }

    return (
        <>
            <Nav />
            <Container>
                <Card>
                    <Card.Header as="h5" className="text-center">Login</Card.Header>
                    <Card.Body>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={LoginValidator}
                            onSubmit={handleLogin}
                        >
                            {({
                                values,
                                handleChange,
                                handleSubmit,
                                errors,
                                touched
                            }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            isInvalid={touched.email && !!errors.email}
                                            placeholder="Seu Email"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="password">
                                        <Form.Label>Senha</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            isInvalid={touched.password && !!errors.password}
                                            placeholder="Sua Senha"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Button variant="primary" type="submit">
                                        Entrar
                                    </Button>

                                    <Link href="/signup" passHref>
                                        <Button variant="link">
                                            Não tem conta? Cadastre-se
                                        </Button>
                                    </Link>
                                </Form>
                            )}
                        </Formik>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
