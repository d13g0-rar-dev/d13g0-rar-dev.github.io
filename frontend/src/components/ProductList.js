// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import '../styles/components/ProductList.css';  // Estilos de la lista de productos
import kit1 from '../components/img/kit1.png'; 
import kit2 from '../components/img/kit2.png'; 
import kit3 from '../components/img/kit3.png';
import API from '../services/api';

// Lista de kits
const kits = [
  { name: "Kit 1", imgSrc: kit1, price: "25000" },
  { name: "Kit 2", imgSrc: kit2, price: "40000" },
  { name: "Kit 3", imgSrc: kit3, price: "35000" },
];

// Componente EmojiButtons para mostrar los botones de emojis
function EmojiButtons() {
  const emojiData = [
    { emoji: "🛒", label: "Carrito" },
    { emoji: "💳", label: "Medio de Pago" },
    { emoji: "🔒", label: "Compra Segura" },
    { emoji: "💰", label: "Precios Económicos" },
  ];

  return (
    <div className="emoji-container">
      {emojiData.map((item, index) => (
        <button key={index} className="emoji-btn">
          <span className="emoji">{item.emoji}</span>
          <span className="label">{item.label}</span>
        </button>
      ))}
    </div>
  );
}

// Componente para mostrar productos y kits
function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recommendedProduct, setRecommendedProduct] = useState([]);
  const productsToShow = 6;

  const assignImage = (product) => ({
    ...product,
    imgSrc: `/components/img/${product.name.replace(" ", "_").toLowerCase()}.png`,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.getProducts();
        const products = response.map(assignImage);
        setProducts(products);
        sessionStorage.setItem("products", JSON.stringify(products));
        const productsToRecommend = 10;
        const recommendedProduct = products.slice(0, productsToRecommend);
        setRecommendedProduct(recommendedProduct);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    fetchProducts();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? recommendedProduct.length - productsToShow : prevIndex - productsToShow
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= recommendedProduct.length - productsToShow ? 0 : prevIndex + productsToShow
    );
  };

  const handleAddToCart = (item) => {
    alert(`${item.name} ha sido agregado al carrito!`);
  
    // Obtener el carrito actual desde sessionStorage o inicializarlo si está vacío
    const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
  
    // Buscar si el producto ya está en el carrito
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.name === item.name);
  
    if (existingItemIndex >= 0) {
      // Si el producto ya está en el carrito, incrementa su cantidad de compra
      cartItems[existingItemIndex].purchaseQuantity += 1;
    } else {
      // Si el producto no está en el carrito, agrégalo con cantidad de compra inicial de 1 y stock especificado
      cartItems.push({ ...item, stock: item.quantity, purchaseQuantity: 1 });
    }
  
    // Guardar el carrito actualizado en sessionStorage
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  
    console.log(`${item.name} ha sido agregado al carrito!`);
  };

  return (
    <div className="product-list">
      <h3>Dulces Recomendados</h3>
      <div className="product-cards">
        {recommendedProduct.slice(currentIndex, currentIndex + productsToShow).map((recommendedProduct, index) => (
          <div className="product-card" key={index}>
            <img src={recommendedProduct.imgSrc} alt={recommendedProduct.name} />
            <p>{recommendedProduct.name}</p>
            <p className="product-price">Precio: ${recommendedProduct.price}</p>
            <button className="add-to-cart" onClick={() => handleAddToCart(recommendedProduct)}>
              Añadir al carrito
            </button>
          </div>
        ))}
      </div>
      <div className="nav-buttons">
        <button className="nav-button" onClick={handlePrev}>
          &#10094;
        </button>
        <button className="nav-button" onClick={handleNext}>
          &#10095;
        </button>
      </div>

      <EmojiButtons />

      <h3>Kits</h3>
      <div className="product-cards">
        {kits.map((kit, index) => (
          <div className="product-card" key={index}>
            <img src={kit.imgSrc} alt={kit.name} />
            <p>{kit.name}</p>
            <p className="product-price">${kit.price}</p>
            <button className="add-to-cart" onClick={() => handleAddToCart(kit)}>
              Añadir al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;