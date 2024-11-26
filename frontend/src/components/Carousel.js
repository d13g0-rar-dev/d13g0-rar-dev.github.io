// src/components/Carousel.js
import React from 'react';
import '../styles/components/Carousel.css';  // Estilos del carrusel
import fondoDulce from './img/Fondo Dulce.png';

function Carousel() {
  return (
    <div className="carousel">
      <img src={fondoDulce} alt="Dulces" className="carousel-image" />
      <div className="carousel-text">
      <h2>DULCERIA</h2>
      <b>¡Bienvenido al Paraíso de los Dulces!</b>
        <p>Prueba nuestras gomitas, chocolates, caramelos,
          disponibles en una variedad de sabores y presentaciones.</p>
      </div>
    </div>
  );
}

export default Carousel;
