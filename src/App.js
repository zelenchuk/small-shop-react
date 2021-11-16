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

// todo read and learn
// https://stackoverflow.com/a/3357615/5552528

// TODO read and integrate this to my cart
// https://www.robinwieruch.de/local-storage-react

//
// import React from 'react';
//
// class App extends React.Component {
//   constructor(props) {
//     super(props);
//
//     this.state = { query: '', hits: [] };
//   }
//
//   onChange = event => {
//     this.setState({ query: event.target.value });
//   };
//
//   onSearch = event => {
//     event.preventDefault();
//
//     const { query } = this.state;
//
//     if (query === '') {
//       return;
//     }
//
//     const cachedHits = localStorage.getItem(query);
//
//     if (cachedHits) {
//       this.setState({ hits: JSON.parse(cachedHits) });
//     } else {
//       fetch('https://hn.algolia.com/api/v1/search?query=' + query)
//         .then(response => response.json())
//         .then(result => this.onSetResult(result, query));
//     }
//   };
//
//   onSetResult = (result, key) => {
//     localStorage.setItem(key, JSON.stringify(result.hits));
//
//     this.setState({ hits: result.hits });
//   };
//
//   render() {
//     return (
//       <div>
//         <h1>Search Hacker News with Local Storage</h1>
//         <p>
//           There shouldn't be a second network request, when you search
//           for a keyword twice.
//         </p>
//
//         {/* Search Input */}
//         <form onSubmit={this.onSearch}>
//           <input type="text" onChange={this.onChange} />
//           <button type="submit">Search</button>
//         </form>
//
//         {/* Result */}
//         {this.state.hits.map(item => (
//           <div key={item.objectID}>{item.title}</div>
//         ))}
//       </div>
//     );
//   }
// }
//
// export default App;
