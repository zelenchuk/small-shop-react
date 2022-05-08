import {Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import {useState, useEffect} from 'react';


import Header from './components/Header';
import Main from './components/Main';
import Basket from './components/Basket';

import data from './data';


// Создаем переменную, в которую записываем состоянее cart в локальном хранилище браузера
// или устанавливаем по умолчаюнию пустым массивом.

// По скольку локальное хранилилище умеет работать со строчками, то мы используем JSON.parse()
// так как ниже делаем setItem cart через JSON.stringify()
const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || JSON.parse('[]');

function App() {

    const {products} = data;
    const [cartItems, setCartItems] = useState(cartFromLocalStorage)

    // подключаемься к изменениям cartItems и сохраняем локальное хранилище
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);


    const onAdd = (product) => {
        const exist = cartItems.find((x) => x.id === product.id);
        if (exist) {
            setCartItems(
                cartItems.map((x) =>
                    x.id === product.id ? {...exist, qty: exist.qty + 1} : x
                )
            );
        } else {
            setCartItems([...cartItems, {...product, qty: 1}]);
        }
    };


    const onRemove = (product) => {
        const exist = cartItems.find((x) => x.id === product.id);
        if (exist.qty === 1) {
            setCartItems(cartItems.filter((x) => x.id !== product.id));
        } else {
            setCartItems(
                cartItems.map((x) =>
                    x.id === product.id ? {...exist, qty: exist.qty - 1} : x
                )
            );
        }
    };


    const onSubmitOrder = (cartItems) => {
        alert('Заказ принят! Смотри в консоль');
        console.log(cartItems);
        setCartItems([]);
    };

    const clearCart = () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Вы точно хотите очистить корзину?")) {
            setCartItems([]);
        }
    };


    return (
        <Container>

            <Row>
                <Col lg='12'>
                    <Header countCartItems={cartItems.length}/>
                </Col>

                <Col lg='8'>
                    <Main products={products} onAdd={onAdd}/>
                </Col>

                <Col lg='4' className='mt-5'>
                    <Basket
                        cartItems={cartItems}
                        onAdd={onAdd}
                        onRemove={onRemove}
                        onSubmitOrder={onSubmitOrder}
                        clearCart={clearCart}
                    />
                </Col>
            </Row>

        </Container>
    );
}

export default App;
