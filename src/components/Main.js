import {Row, Container} from 'react-bootstrap';

import React from 'react';
import Product from './Product';

export default function Main(props) {
    const {products, onAdd} = props;
    return (
        <Container className='mt-5'>

            <h2 className='display-5 text-center'>Еда</h2>

            <Row>
                {products.map((product) => (
                    <Product
                        key={product.id}
                        product={product}
                        onAdd={onAdd}/>
                ))}
            </Row>

        </Container>
    );
}
