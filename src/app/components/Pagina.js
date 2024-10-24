
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import DateTimeWeather from './DataHoraClimaLocal';

export default function Pagina(props) {

  console.log(props.tnav)
  const prop = props.tnav ? props.tnav : 'Projeto Aula'
  // let prop = props.tnav
  // if(prop === ''){
  //   prop = 'Projeto Aula'}
  return (
    <Container>

      <header className="bg-white">

        <div className='d-flex justify-content-between align-items-center border-bottom'>

          <DateTimeWeather />

          <div className=" justify-content-center text-center p-4">TTESTE</div>
        
        <div style={{ width: '221px' }}>

          <Button className="btn btn-secondary" style={{ margin: '0 0 0 150px' }}  href="/home">Login</Button>
        </div>

        </div>

        <Nav className="justify-content-center m-3 me-auto" activeKey="/home">
          <Nav.Link className="text-dark" variant="dark" href="/">Link</Nav.Link>
          <Nav.Link className="text-dark" href="/">Link</Nav.Link>
          <Nav.Link className="text-dark" href="/">Link</Nav.Link>
          <Nav.Link className="text-dark" href="/">Link</Nav.Link>
          <Nav.Link className="text-dark" href="/">Link</Nav.Link>
        </Nav>
      </header>


      <Container>
        {props.children}
      </Container>
    </Container>


    // Off canva para pagina secundaria de generos, hamburguer, não consegui retirar o map para ficar mais limpo :(
    // <Container>

    //     <>
    //     {[false].map((expand) => (
    //       <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
    //         <Container fluid>
    //           <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
    //           <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
    //           <Navbar.Offcanvas
    //             id={`offcanvasNavbar-expand-${expand}`}
    //             aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
    //             placement="end"
    //           >
    //             <Offcanvas.Header closeButton>
    //               <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
    //                 Offcanvas
    //               </Offcanvas.Title>
    //             </Offcanvas.Header>
    //             <Offcanvas.Body>
    //               <Nav className="justify-content-end flex-grow-1 pe-3">
    //                 <Nav.Link href="#action1">Home</Nav.Link>
    //                 <Nav.Link href="#action2">Link</Nav.Link>
    //                 <NavDropdown
    //                   title="Dropdown"
    //                   id={`offcanvasNavbarDropdown-expand-${expand}`}
    //                 >
    //                   <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
    //                   <NavDropdown.Item href="#action4">
    //                     Another action
    //                   </NavDropdown.Item>
    //                   <NavDropdown.Divider />
    //                   <NavDropdown.Item href="#action5">
    //                     Something else here
    //                   </NavDropdown.Item>
    //                 </NavDropdown>
    //               </Nav>

    //             </Offcanvas.Body>
    //           </Navbar.Offcanvas>
    //         </Container>
    //       </Navbar>
    //     ))}
    //   </>
    // </Container>


  )

}
