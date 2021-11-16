import {Col, Card} from 'react-bootstrap';

import React from 'react';

function Product(props) {
    const {product, onAdd} = props;
    return (
        <Col lg="4" className="my-3">
            <Card>
                <Card.Img variant="top" src={product.image} alt={product.name}/>

                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>

                    <Card.Text className='small'>
                        {product.info}
                    </Card.Text>

                    <div style={{'text-align': 'center', 'font-weight': '700', 'margin': '20px 0 10px 0'}}>
                        {product.price} грн
                    </div>

                    <div>
                        <button className='btn btn-primary' onClick={() => onAdd(product)}>В корзину</button>
                    </div>


                </Card.Body>

            </Card>
        </Col>
    );
}

export default Product;