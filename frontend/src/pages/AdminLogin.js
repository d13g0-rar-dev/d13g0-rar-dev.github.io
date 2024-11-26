import React, { useState } from 'react';
import "../styles/components/AdminLogin.css"; 
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para el mensaje de error
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    // Credenciales del administrador
    const adminEmail = "admin@admin.com";
    const adminPassword = "admin123";

    // Validación de credenciales
    if (email === adminEmail && password === adminPassword) {
      navigate('/report'); // Redirige a la página de reportes
    } else {
      setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.'); // Muestra el error
    }
  };

  return (
    <div className="container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Ingresa tu correo electrónico"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>} {/* Muestra mensaje de error si existe */}
        <button type="submit" className="btn btn-primary">Iniciar sesión</button>
      </form>
    </div>
  );
}

export default AdminLogin;
