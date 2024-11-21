'use client';
import { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import Link from 'next/link';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    const removeFromCart = (index) => {
        const newCart = [...cartItems];
        newCart.splice(index, 1);
        setCartItems(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const updateQuantity = (index, newQuantity) => {
        if (newQuantity < 1) return;
        const newCart = [...cartItems];
        newCart[index].quantity = newQuantity;
        setCartItems(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <Container>
            <h1 className="mb-4">Carrinho de Compras</h1>
            {cartItems.length === 0 ? (
                <div className="text-center">
                    <p>Seu carrinho está vazio</p>
                    <Link href="/produtos" className="btn btn-primary">
                        Continuar Comprando
                    </Link>
                </div>
            ) : (
                <>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Preço</th>
                                <th>Quantidade</th>
                                <th>Subtotal</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <img 
                                                src={item.image} 
                                                alt={item.name} 
                                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                className="me-3"
                                            />
                                            {item.name}
                                        </div>
                                    </td>
                                    <td>R$ {item.price}</td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <Button 
                                                variant="outline-secondary" 
                                                size="sm"
                                                onClick={() => updateQuantity(index, item.quantity - 1)}
                                            >-</Button>
                                            <span className="mx-2">{item.quantity}</span>
                                            <Button 
                                                variant="outline-secondary" 
                                                size="sm"
                                                onClick={() => updateQuantity(index, item.quantity + 1)}
                                            >+</Button>
                                        </div>
                                    </td>
                                    <td>R$ {(item.price * item.quantity).toFixed(2)}</td>
                                    <td>
                                        <Button 
                                            variant="danger" 
                                            size="sm"
                                            onClick={() => removeFromCart(index)}
                                        >
                                            Remover
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-end">
                        <div className="text-end">
                            <h4>Total: R$ {total.toFixed(2)}</h4>
                            <Button variant="success" size="lg" className="mt-2">
                                Finalizar Compra
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </Container>
    );
} 