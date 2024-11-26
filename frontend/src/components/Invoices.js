import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/components/Invoices.css";

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  useEffect(() => {
    // Obtener facturas desde la API
    API.getInvoices().then((data) => {
      setInvoices(data);
      setFilteredInvoices(data); // Inicialmente, mostrar todas las facturas
    });
  }, []);

  useEffect(() => {
    // Filtrar facturas cuando cambian los filtros
    const lowerCaseSearchName = searchName.toLowerCase();
    const filtered = invoices.filter((invoice) => {
      const matchesName =
        invoice.customer.first_name.toLowerCase().includes(lowerCaseSearchName);
      const matchesDate =
        (!startDate || new Date(invoice.date) >= new Date(startDate)) &&
        (!endDate || new Date(invoice.date) <= new Date(endDate));
      return matchesName && matchesDate;
    });
    setFilteredInvoices(filtered);
  }, [searchName, startDate, endDate, invoices]);

  return (
    <div className="reports-page">
      <h2>Reportes</h2>

      {/* Botón de cierre de sesión */}
      <button onClick={handleLogout} className="logout-button">
        Cerrar sesión
      </button>

      <section>
        <h3>Facturas</h3>

        {/* Filtros */}
        <div className="filters">
          <input
            type="text"
            placeholder="Buscar por nombre del cliente"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="filter-input"
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="filter-input"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="filter-input"
          />
        </div>

        {/* Tabla */}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Cliente</th>
              <th>Email</th>
              <th>Dirección de Entrega</th>
              <th>Fecha</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((invoice, index) => (
                <tr key={index}>
                  <td>{invoice.id}</td>
                  <td>{invoice.customer.first_name}</td>
                  <td>{invoice.customer.mail}</td>
                  <td>{invoice.customer.address}</td>
                  <td>{new Date(invoice.date).toLocaleDateString()}</td>
                  <td>${invoice.total}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No se encontraron facturas</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Invoices;
