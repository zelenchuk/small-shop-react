import {Container, Navbar, Badge} from "react-bootstrap";

import React from 'react';


export default function Header(props) {
    return (
        <header className="block row center">

            <Navbar bg="light" variant="light" className='py-4'>
                <Container>
                    <Navbar.Brand href="#home">Маленький магаз</Navbar.Brand>

                    <Navbar.Toggle/>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <a className='text-decoration-none' href="#/cart">
                                Корзина {' '}
                                {props.countCartItems ? (
                                    <Badge bg="danger">{props.countCartItems}</Badge>
                                ) : (
                                    ''
                                )}
                            </a>{' '}

                            {/*<a href="#/signin">*/}
                            {/*    Вход*/}
                            {/*</a>*/}
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </header>
    );
}
