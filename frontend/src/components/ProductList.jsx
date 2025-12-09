import './ProductList.css';

function ProductList({ products, onEdit, onDelete }) {
    if (products.length === 0) {
        return (
            <div className="empty-state">
                <h3>📦 No products yet</h3>
                <p>Add your first product using the form above</p>
            </div>
        );
    }

    return (
        <div className="product-list">
            <h2>📋 Products ({products.length})</h2>
            <div className="products-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <div className="product-header">
                            <h3>{product.name}</h3>
                            <span className="product-price">${product.price.toFixed(2)}</span>
                        </div>

                        {product.description && (
                            <p className="product-description">{product.description}</p>
                        )}

                        <div className="product-meta">
                            <span className="stock-badge">
                                📦 Stock: {product.stock}
                            </span>
                        </div>

                        <div className="product-actions">
                            <button
                                className="btn btn-edit"
                                onClick={() => onEdit(product)}
                            >
                                ✏️ Edit
                            </button>
                            <button
                                className="btn btn-delete"
                                onClick={() => onDelete(product.id)}
                            >
                                🗑️ Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
