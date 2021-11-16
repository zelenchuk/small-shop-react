import React from 'react';

export default function Basket(props) {

    const {cartItems, onAdd, onRemove, onSubmitOrder} = props;

    const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
    // const taxPrice = itemsPrice * 0.14;
    const shippingPrice = itemsPrice > 2000 ? 0 : 20;
    const totalPrice = itemsPrice + shippingPrice;

    return (
        <aside className="block col-1">
            <h2>Корзина</h2>
            <div>

                {cartItems.length === 0 && <div>Корзина пустая, скорее наполняйте её</div>}

                {cartItems.map((item) => (
                    <div key={item.id} className="row">
                        <div className="col-2">{item.name}</div>
                        <div className="col-2">
                            <button onClick={() => onRemove(item)} className="remove">
                                -
                            </button>
                            {' '}
                            <button onClick={() => onAdd(item)} className="add">
                                +
                            </button>
                        </div>

                        <div className="col-2 text-right">
                            {item.qty} x ${item.price.toFixed(2)}
                        </div>
                    </div>
                ))}

                {cartItems.length !== 0 && (
                    <>
                        <hr></hr>
                        <div className="row">
                            <div className="col-2">Стоимость:</div>
                            <div className="col-1 text-right">{itemsPrice.toFixed(2)} грн</div>
                        </div>


                        <div className="row">
                            <div className="col-2">Доставка:</div>
                            <div className="col-1 text-right">
                                {shippingPrice.toFixed(2)} грн
                            </div>
                        </div>

                        <div className="row">

                            <div className="col-2">
                                <strong>Стоимость заказа:</strong>
                            </div>
                            <div className="col-1 text-right">
                                <strong>{totalPrice.toFixed(2)} грн</strong>
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <button onClick={() => onSubmitOrder(cartItems)}>
                                Заказать
                            </button>
                        </div>
                    </>
                )}
            </div>
        </aside>
    );
}
