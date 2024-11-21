'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, Container, Row, Col, Button } from 'react-bootstrap'
import Nav from '../../components/Nav'

export default function UserPage() {
  const [user, setUser] = useState(null)
  const router = useRouter()
  const currentUser = localStorage.getItem('currentUser')
 


  useEffect(() => {
    if (!currentUser) {
      router.push('/login')
      return
    }
    setUser(JSON.parse(currentUser))
  }, [router])



  const handleEdit = () => {
    router.push('/usuarios/editar')
  }

  if (!user) {
    return null
  }

  return (
    <>
      <Nav />
      <Container className="py-5">

        <h2 className="text-center mb-4">Perfil do Usuário</h2>

        <div className="d-flex justify-content-end mb-3">
          <Button variant="primary" onClick={handleEdit}>
            Editar Perfil
          </Button>
        </div>

        <Card className="mb-3">
          <Card.Header className="bg-primary text-center text-white">
            <h5 className="mb-0">Informações Pessoais</h5>
          </Card.Header>
          <Card.Body>
            <p><strong>Nome:</strong> {user.name}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Data de Nascimento:</strong> {user.birthdate}</p>
          </Card.Body>
        </Card>

        <Card className="mb-3">
          <Card.Header className="bg-primary text-center text-white">
            <h5 className="mb-0">Informações de Contato</h5>
          </Card.Header>
          <Card.Body>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>CPF:</strong> {user.cpf}</p>
          </Card.Body>
        </Card>

        

      </Container>




     
    </>
  )
}
