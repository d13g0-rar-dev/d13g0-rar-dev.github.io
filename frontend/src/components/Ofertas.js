import React from "react";
import "../styles/components/Ofertas.css"; // Crea un archivo CSS para estilos del modal.

const Ofertas = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  const message = `¡Atención! 🚨
Las ofertas han llegado a su fin por hoy. 😢

Pero no te preocupes,
¡mañana volvemos con más sorpresas! 🌟

🕛 Te esperamos para que no te pierdas lo que viene. 💥`;

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

export default Ofertas;
