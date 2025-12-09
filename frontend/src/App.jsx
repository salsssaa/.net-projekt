import { useState, useEffect } from 'react';
import { productService } from './services/productService';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load products. Make sure the backend is running.');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (product) => {
    try {
      await productService.createProduct(product);
      await loadProducts();
    } catch (err) {
      setError('Failed to create product');
      console.error('Error creating product:', err);
    }
  };

  const handleUpdate = async (id, product) => {
    try {
      await productService.updateProduct(id, product);
      await loadProducts();
      setEditingProduct(null);
    } catch (err) {
      setError('Failed to update product');
      console.error('Error updating product:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(id);
        await loadProducts();
      } catch (err) {
        setError('Failed to delete product');
        console.error('Error deleting product:', err);
      }
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🛍️ Product Manager</h1>
        <p>Full-Stack .NET + React + PostgreSQL</p>
      </header>

      {error && (
        <div className="error-banner">
          {error}
        </div>
      )}

      <div className="container">
        <div className="form-section">
          <ProductForm
            product={editingProduct}
            onSubmit={editingProduct ? handleUpdate : handleCreate}
            onCancel={() => setEditingProduct(null)}
          />
        </div>

        <div className="list-section">
          {loading ? (
            <div className="loading">Loading products...</div>
          ) : (
            <ProductList
              products={products}
              onEdit={setEditingProduct}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
