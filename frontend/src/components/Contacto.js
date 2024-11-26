import React from "react";
import "../styles/components/Ofertas.css"; // Crea un archivo CSS para estilos del modal.

const Contacto = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  const message = `📧 Correo: contacto@candyshop.com</p>
        📞 Teléfono: +1 (555) 123-4567</p>
        🏢 Dirección: Calle Dulce, 123, Ciudad de Caramelo</p>
`;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>{title}</h2>
        <div className="modal-body">
          {/* Renderizamos el mensaje con saltos de línea */}
          <p className="message">
            {message.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contacto;

