'use client'
import { Formik } from "formik";
import Nav from "../../components/Nav";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { mask } from "remask";
import { v4 } from "uuid";
import CadastroValidator from "@/validators/CadastroValidator";

export default function SignUpPage() {
    const router = useRouter();
    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        username: '',
        birthdate: '',
        cpf: ''
    };

    function getRegisteredUsers() {
        const users = localStorage.getItem('registeredUsers');
        return users ? JSON.parse(users) : [];
    }

    function handleRegister(values) {
        try {
            const registeredUsers = getRegisteredUsers();

            // Check if email already exists
            const emailExists = registeredUsers.some(user => user.email === values.email);
            if (emailExists) {
                alert("Este email já está cadastrado!");
                return;
            }

            // Check if username already exists
            const usernameExists = registeredUsers.some(user => user.username === values.username);
            if (usernameExists) {
                alert("Este username já está em uso!");
                return;
            }

            let newUser = {
                id: v4(),
                email: values.email,
                password: values.password,
                name: values.name,
                username: values.username,
                birthdate: values.birthdate,
                cpf: values.cpf
            };

            // Add new user to the array
            registeredUsers.push(newUser);

            // Save updated array back to localStorage
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

            alert("Cadastro realizado com sucesso!");
            router.push('/login');
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            alert("Erro ao realizar cadastro. Tente novamente.");
        }
    }

    return (
        <>
            <Nav />
            <Container>
                <Card>
                    <Card.Header as="h5" className="text-center">Cadastro</Card.Header>
                    <Card.Body>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={CadastroValidator}
                            onSubmit={values => (handleRegister(values))}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleSubmit,
                                setFieldValue
                            }) => (
                                <Form >
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}
                                            isInvalid={touched.name && !!errors.name}
                                            placeholder="Seu nome completo"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="username"
                                            value={values.username}
                                            onChange={handleChange}
                                            isInvalid={touched.username && !!errors.username}
                                            placeholder="Seu nome de usuário"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.username}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            isInvalid={touched.email && !!errors.email}
                                            placeholder="seu@email.com"
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

                                    <Form.Group className="mb-3" controlId="confirmPassword">
                                        <Form.Label>Repita a Senha</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="confirmPassword"
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                            isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                                            placeholder="Confirme a Senha"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.confirmPassword}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="cpf">
                                        <Form.Label>CPF</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="cpf"
                                            value={values.cpf}
                                            placeholder="000.000.000-00"
                                            isInvalid={touched.cpf && !!errors.cpf}
                                            onChange={(value) => {
                                                setFieldValue('cpf', mask(value.target.value, '999.999.999-99'))
                                            }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.cpf}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="birthdate">
                                        <Form.Label>Data de Nascimento</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="birthdate"
                                            value={values.birthdate}
                                            isInvalid={touched.birthdate && !!errors.birthdate}
                                            placeholder="00/00/0000"
                                            onChange={(value) => {
                                                setFieldValue('birthdate', mask(value.target.value, '99/99/9999'))
                                            }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.birthdate}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Button onClick={() => handleRegister(values)} variant="primary" type="submit">
                                        Cadastrar
                                    </Button>

                                    <Link href="/login" passHref>
                                        <Button variant="link">
                                            Já tem uma conta? Faça login
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