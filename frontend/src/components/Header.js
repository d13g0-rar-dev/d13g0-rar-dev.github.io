import React, { useState, useRef } from "react";
import "../styles/components/Header.css";
import ModalGenerico from "./ModalGenerico"; // Importa el componente genérico
import PagNosotros from "./PagNosotros"; // Componente "Nosotros"
import "../styles/Search.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import API from "../services/api";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMaintenanceOpen, setIsMaintenanceOpen] = useState(false); // Estado para el modal de mantenimiento
  const [isNosotrosOpen, setIsNosotrosOpen] = useState(false); // Estado para el modal "Nosotros"
  const [isContactoOpen, setIsContactoOpen] = useState(false); // Estado para el modal "Contacto"
  const searchBoxRef = useRef(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    setSearchTerm("");
    setFilteredProducts([]);
  };

  const handleSearchChange = async (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term) {
      try {
        const allProducts = await API.getProducts();
        const filtered = allProducts.filter((product) =>
          product.name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredProducts(filtered);
      } catch (error) {
        console.error("Error al buscar productos:", error);
      }
    } else {
      setFilteredProducts([]);
    }
  };

  const handleClickOutside = (event) => {
    if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
      setIsSearchVisible(false);
    }
  };

  useEffect(() => {
    if (isSearchVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchVisible]);

  const gotoCart = () => {
    navigate("/cart");
  };

  const gotoLogin = () => {
    navigate("/login");
  };

  const gotoBuy = () => {
    navigate("/buy");
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>
          CANDY <span className="yellow-rectangle">SHOP</span>
        </h1>
      </div>

      <button
        className="menu-btn"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isMenuOpen}
      >
        ☰
      </button>

      <nav className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li onClick={() => navigate("/")}>
            <a>Home</a>
          </li>
          <li onClick={gotoBuy}>
            <a>Comprar</a>
          </li>
          <li onClick={() => setIsNosotrosOpen(true)}>
            <a>Nosotros</a>
          </li>
          <li onClick={() => setIsMaintenanceOpen(true)}>
            <a>Ofertas</a>
          </li>
        </ul>
      </nav>

      <div className="icons">
        <button className="reporte-btn" onClick={gotoLogin}>
          <i className="report-icon">👤</i>
          <span>Reportes</span>
        </button>
        <button className="carrito-btn" onClick={gotoCart}>
          <i className="cart-icon">🛒</i>
          <span>Carrito</span>
        </button>
        <button className="contact-btn" onClick={() => setIsContactoOpen(true)}>
          <i className="phone-icon">📞</i>
          <span>Contacto</span>
        </button>
        <button className="buscar-btn" onClick={toggleSearch}>
          <i className="lupa-icon">🔍</i>
          <span>Buscar</span>
        </button>
      </div>

      {isSearchVisible && (
        <div className="search-box" ref={searchBoxRef}>
          <input
            type="text"
            placeholder="¿Qué artículo deseas buscar?"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {filteredProducts.length > 0 && (
            <div className="search-results">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="search-result-item"
                  onClick={() => navigate("/buy")}
                >
                  {product.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal "Nosotros" */}
      <PagNosotros
        isOpen={isNosotrosOpen}
        onClose={() => setIsNosotrosOpen(false)}
      />

      {/* Modal "Ofertas" */}
      <ModalGenerico
        isOpen={isMaintenanceOpen}
        onClose={() => setIsMaintenanceOpen(false)}
        title="OFERTAS"
      >
        <p>
          Estamos trabajando para mejorar nuestra sección de ofertas. ¡Vuelve
          pronto!
        </p>
      </ModalGenerico>

      {/* Modal "Contacto" */}
      <ModalGenerico
        isOpen={isContactoOpen}
        onClose={() => setIsContactoOpen(false)}
        title="CONTACTO"
      >
        <p>📧 Correo: contacto@candyshop.com</p>
        <p>📞 Teléfono: +1 (555) 123-4567</p>
        <p>🏢 Dirección: Universidad Industrial de Santander, Colombia</p>
      </ModalGenerico>
    </header>
  );
}

export default Header;
