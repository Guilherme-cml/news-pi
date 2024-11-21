'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, Container, Form, Button, Row, Col } from 'react-bootstrap'
import { Formik } from 'formik'
import { mask } from 'remask'
import Nav from '@/components/Nav'
import CadastroValidator from '@/validators/CadastroValidator'

export default function EditUserPage() {
    const [user, setUser] = useState(null)
    const router = useRouter()

    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser')
        if (!currentUser) {
            router.push('/login')
            return
        }
        setUser(JSON.parse(currentUser))
    }, [router])

    // Initial form values with empty strings as defaults
    const initialValues = {
        email: user?.email || '',
        password: user?.password || '',
        confirmPassword: user?.password || '',
        name: user?.name || '',
        username: user?.username || '',
        birthdate: user?.birthdate || '',
        cpf: user?.cpf || ''
    }

    if (!user) {
        return null
    }

    function Submit(values) {
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
        const updatedUsers = registeredUsers.map(u => 
            u.id === user.id ? { ...values, id: user.id } : u
        )
        
        localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers))
        localStorage.setItem('currentUser', JSON.stringify({ ...values, id: user.id }))
        
        alert('Perfil atualizado com sucesso!')
        //router.push('/usuarios')
    }

    return (
        <>
            <Nav />
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Card>
                            <Card.Header as="h5" className="text-center">
                                Editar Perfil
                            </Card.Header>
                            <Card.Body>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={CadastroValidator}
                                    onSubmit={Submit}
                                    enableReinitialize={true}
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
                                                    value={values.name || ''}
                                                    onChange={handleChange}
                                                    isInvalid={touched.name && !!errors.name}
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
                                                    value={values.username || ''}
                                                    onChange={handleChange}
                                                    isInvalid={touched.username && !!errors.username}
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
                                                    value={values.email || ''}
                                                    onChange={handleChange}
                                                    isInvalid={touched.email && !!errors.email}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.email}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>CPF</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="cpf"
                                                    value={values.cpf || ''}
                                                    onChange={(e) => {
                                                        setFieldValue('cpf', mask(e.target.value, '999.999.999-99'))
                                                    }}
                                                    isInvalid={touched.cpf && !!errors.cpf}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.cpf}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Data de Nascimento</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="birthdate"
                                                    value={values.birthdate || ''}
                                                    onChange={(e) => {
                                                        setFieldValue('birthdate', mask(e.target.value, '99/99/9999'))
                                                    }}
                                                    isInvalid={touched.birthdate && !!errors.birthdate}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.birthdate}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <div className="d-flex justify-content-between">
                                                <Button variant="secondary" onClick={() => router.push('/usuarios')}>
                                                    Cancelar
                                                </Button>
                                                <Button onClick={() => {Submit(values); router.push('/usuarios')}} variant="primary" type="submit">
                                                    Salvar Alterações
                                                </Button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
} 