// ProductsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../../Components/ProductCard';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product data from the backend API
    axios.get("http://127.0.0.1:8000/api/product/show")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching product data:', error));
  }, []);

  return (
    <div className="products-page">
      <h1>Product Catalog</h1>
      <div className="product-container">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
