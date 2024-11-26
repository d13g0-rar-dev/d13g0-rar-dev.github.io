import React from "react";
import "../styles/components/PagNosotros.css"; // Cambia el nombre del archivo CSS

const PagNosotros = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Si no está abierto, no renderiza nada

  return (
    <div className="pag-nosotros">
      <div className="pag-nosotros-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>SOBRE NOSOTROS</h2>
        <p className="intro-text">
  Somos Sebastián, Karen, Andrey, Diego y Anderson apasionados por endulzar la vida de las personas.
</p>
        <h3>Nuestros Fundadores:</h3>
        <ul>
          <li><strong>Sebastián:</strong> Gestión y logística.</li>
          <li><strong>Karen:</strong> Diseño y creación de productos.</li>
          <li><strong>Andrey:</strong> Atención al cliente y marketing.</li>
          <li><strong>Diego:</strong> Finanzas y estrategia.</li>
          <li><strong>Anderson:</strong> Administrador.</li>
        </ul>
        <h3>Nuestra Experiencia:</h3>
        <p className="intro-text">
          Llevamos más de 5 años en el mercado, ofreciendo dulces de alta calidad que generan momentos de felicidad.
        </p>
      </div>
    </div>
  );
};

export default PagNosotros;
