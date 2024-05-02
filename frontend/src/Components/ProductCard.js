
import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <img
                src={product.image}
                alt={product.title}
                className="product-image"
            />
            <div className="product-details">
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p>ID: {product.id}</p>
            </div>
        </div>
    );
};

export default ProductCard;
