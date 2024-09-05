import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import ProductListPage from './pages/ProductListPage';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <header className="bg-blue-500 text-white py-4 mb-6">
          <nav className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              <Link to="/">Amazoon Store</Link>
            </h1>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="hover:underline">
                  Page d'acceuil
                </Link>
              </li>
              <li>
                <Link to="/add-product" className="hover:underline">
                  Ajouter un produit
                </Link>
              </li>
              <li>
                <Link to="/product-list" className="hover:underline">
                  Liste des produits
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/product-list" element={<ProductListPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
