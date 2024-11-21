import { Container } from "react-bootstrap";

export default function Pagina(props) {
    return (
        <Container>
            <h1>{props.titulo}</h1>
            {props.children}
        </Container>
    );
} 