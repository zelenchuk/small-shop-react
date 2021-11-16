import {Col, Row} from 'react-bootstrap';

import React from 'react';

export default function Basket(props) {

    const {cartItems, onAdd, onRemove, onSubmitOrder, clearCart} = props;

    const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
    // const taxPrice = itemsPrice * 0.14;
    const shippingPrice = itemsPrice > 2000 ? 0 : 20;
    const totalPrice = itemsPrice + shippingPrice;

    return (
        <>

            <h2 className='display-5 text-center mb-5'>Корзина</h2>
            <Col>

                {cartItems.length === 0 && <div>Корзина пустая, скорее наполняйте её</div>}

                {cartItems.map((item) => (
                    <div key={item.id}>
                        <hr/>
                        <Row>
                            <Col lg='6'>{item.name}</Col>

                            <Col lg='3' className='small'>
                                {item.qty} x {item.price.toFixed(2)} грн
                            </Col>

                            <Col lg='3'>
                                <button onClick={() => onRemove(item)} className="btn btn-danger">
                                    -
                                </button>
                                {' '}
                                <button onClick={() => onAdd(item)} className="btn btn-success">
                                    +
                                </button>
                            </Col>


                        </Row>


                    </div>
                ))}

                {cartItems.length !== 0 && (
                    <>
                        <hr/>


                        <Row>
                            <Col lg='6'>Стоимость:</Col>
                            <Col lg='6'>{itemsPrice.toFixed(2)} грн</Col>
                        </Row>

                        <Row>
                            <Col lg='6'>Доставка:</Col>
                            <Col lg='6'>{shippingPrice.toFixed(2)} грн</Col>
                        </Row>

                        <Row className='mt-4'>
                            <Col lg='6' className='h5'>Стоимость заказа:</Col>
                            <Col lg='6' className='h5'>{totalPrice.toFixed(2)} грн</Col>
                        </Row>

                        <hr/>

                        <div className="row">
                            <button className='btn btn-success' onClick={() => onSubmitOrder(cartItems)}>
                                Заказать
                            </button>

                            <button className='btn btn-danger' onClick={() => clearCart()}>
                                Очистить корзину
                            </button>
                        </div>
                    </>
                )}
            </Col>
        </>
    );
}
