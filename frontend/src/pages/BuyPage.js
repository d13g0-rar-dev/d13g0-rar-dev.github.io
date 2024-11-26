import React, { useState, useEffect } from "react";
import API from "../services/api";
import "../styles/components/BuyPage.css";

const BuyPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para el producto seleccionado
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = sessionStorage.getItem("products");
        setProducts(JSON.parse(products));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const categories = products.reduce((acc, product) => {
    if (!acc.includes(product.category)) {
      acc.push(product.category);
    }
    return acc;
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (item) => {
    alert(`${item.name} ha sido agregado al carrito!`);

    const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.name === item.name
    );

    if (existingItemIndex >= 0) {
      cartItems[existingItemIndex].purchaseQuantity += 1;
    } else {
      cartItems.push({ ...item, stock: item.quantity, purchaseQuantity: 1 });
    }

    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log(`${item.name} ha sido agregado al carrito!`);
  };

  return (
    <div className="category-page">
      {categories.map((category) => (
        <section key={category} className="category-section">
          <h2 className="category-title">{category}</h2>
          <div className="products-container">
            {products
              .filter((product) => product.category === category)
              .map((product) => (
                <article
                  key={product.id}
                  className="product-card"
                  onClick={() => handleProductClick(product)} // Muestra el modal al hacer clic
                >
                  <img src={product.imgSrc} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                </article>
              ))}
          </div>
        </section>
      ))}

      {/* Modal */}
      {isModalOpen && selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              X
            </button>
            <img src={selectedProduct.imgSrc} alt={selectedProduct.name} />
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
            <p>Precio: ${selectedProduct.price}</p>
            <p>Stock disponible: {selectedProduct.quantity}</p>
            <button onClick={() => handleAddToCart(selectedProduct)}>
              Agregar al carrito
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyPage;
