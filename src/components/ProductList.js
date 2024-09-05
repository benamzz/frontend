import React, { useContext, useState } from 'react';
import { ProductContext } from '../context/ProductContext';
import ProductCard from './ProductCard';

const ProductList = () => {
  const { products } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-4">Liste de produit</h2>
      
      <input
        type="text"
        placeholder="Search by name or description"
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4 p-2 border rounded w-full"
      />

      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => <ProductCard key={product._id} product={product} />)
      ) : (
        <p>Pas de produit correspondant à votre recherche.</p>
      )}
    </div>
  );
};

export default ProductList;
