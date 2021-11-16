import React from 'react';

function Product(props) {
    const {product, onAdd} = props;
    return (
        <div>
            <img style={{'display': 'block', 'margin': '5px auto'}} className="small" src={product.image} alt={product.name}/>
            <h3>{product.name}</h3>

            <p style={{'font-size': '11px'}}>
                {product.info}
            </p>

            <div style={{'text-align': 'center', 'font-weight': '700', 'margin':'20px 0 10px 0'}}>
                {product.price} грн
            </div>

            <div>
                <button onClick={() => onAdd(product)}>В корзину</button>
            </div>
        </div>
    );
}

export default Product;