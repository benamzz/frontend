import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ProductContext } from '../context/ProductContext';

const ProductCard = ({ product }) => {
  const { fetchProducts } = useContext(ProductContext);
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [quantity, setQuantity] = useState(product.quantity);

  const deleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:5000/products/${product._id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/products/${product._id}`, { name, price, description, quantity });
      fetchProducts();
      setIsEditing(false); // Fermer le formulaire de modification après la mise à jour
    } catch (error) {
      console.error('Error updating product', error);
    }
  };

  return (
    <div className="mb-4 p-4 border-b border-gray-200">
      {isEditing ? (
        <div>
          <h3 className="text-lg font-bold">Edit Product</h3>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Product Name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Price"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Description"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Quantity"
                required
              />
            </div>
            <button
              type="button"
              onClick={handleUpdate}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Product
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-bold">{product.name}</h3>
          <p>Price: ${product.price}</p>
          <p>Description: {product.description}</p>
          <p>
            Quantity: {product.quantity > 0 ? product.quantity : <span className="text-red-500">Out of Stock</span>}
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mt-2"
          >
            Edit
          </button>
          <button
            onClick={deleteProduct}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded mt-2 ml-2"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
