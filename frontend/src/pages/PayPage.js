import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf"; // Importa jsPDF
import "../styles/components/PayPage.css";
import API from "../services/api.js";

const PayPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const updatedCartItems =
    JSON.parse(sessionStorage.getItem("updatedCartItems")) || [];
  const customer = JSON.parse(sessionStorage.getItem("shippingInfo")) || [];

  // Formateador de moneda
  const formatCurrency = (value) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(value);

  // Cargar el carrito desde sessionStorage al cargar la página
  useEffect(() => {
    try {
      const storedCartItems =
        JSON.parse(sessionStorage.getItem("cartItems")) || [];
      setCartItems(storedCartItems);

      // Calcular el total
      const total = storedCartItems.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.purchaseQuantity),
        0
      );
      setTotalPrice(total);
    } catch (error) {
      console.error("Error al cargar el carrito: ", error);
      setCartItems([]);
      setTotalPrice(0);
    }
  }, []);

  const handleCheckout = () => {
    // Enviar la información al backend
    updatedCartItems.forEach((item) => {
      item = {
        id: item.id,
        description: item.description,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      };
      API.updateProduct(item).then(() => {
        console.log("Stock actualizado");
      });
    });
    createInvoiceAndCustomer(customer, totalPrice);
    
    async function createInvoiceAndCustomer(customer, totalPrice) {
      const responseCustomer = await API.saveCustomerInfo(customer);
      console.log(responseCustomer);
      const invoice = {
        customer: responseCustomer,
        total: totalPrice,
        date: new Date().toISOString(),
      };

      const responseInvoice = await API.createInvoice(invoice);

      return responseInvoice;
    }

    // Limpiar el carrito
    sessionStorage.setItem("cartItems", JSON.stringify([]));
    navigate("/");
  };

  const downloadInvoice = () => {
    const doc = new jsPDF();

    // Encabezado principal
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Factura de Compra", 105, 15, { align: "center" });
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Candy Shop", 105, 25, { align: "center" });
    doc.line(10, 30, 200, 30); // Línea separadora

    // Información del cliente y factura
    doc.setFontSize(10);
    doc.text("Fecha: " + new Date().toLocaleDateString(), 10, 40);
    doc.text("Número de Factura: #12345", 10, 45);
    doc.text("Cliente: Nombre del Cliente", 10, 50);

    // Tabla de productos
    const startY = 60;
    let currentY = startY;
    doc.setFont("helvetica", "bold");
    doc.text("Resumen del Pedido:", 10, currentY);
    currentY += 5;

    // Encabezados de la tabla
    doc.setFont("helvetica", "bold");
    doc.text("Producto", 10, currentY);
    doc.text("Cantidad", 90, currentY);
    doc.text("Precio Unitario", 130, currentY);
    doc.text("Subtotal", 170, currentY);
    doc.line(10, currentY + 2, 200, currentY + 2); // Línea separadora
    currentY += 10;

    // Datos de la tabla
    doc.setFont("helvetica", "normal");
    cartItems.forEach((item) => {
      const price = Number(item.price); // Convertir a número
      const subtotal = price * Number(item.purchaseQuantity);

      if (isNaN(price) || isNaN(subtotal)) {
        console.error("Error: El precio o subtotal no es válido", item);
        return;
      }

      doc.text(item.name, 10, currentY);
      doc.text(String(item.purchaseQuantity), 95, currentY, { align: "right" });
      doc.text(formatCurrency(price), 145, currentY, { align: "right" });
      doc.text(formatCurrency(subtotal), 195, currentY, { align: "right" });
      currentY += 10;
    });

    // Línea separadora debajo de los productos
    doc.line(10, currentY, 200, currentY);

    // Total del pedido
    currentY += 10;
    doc.setFont("helvetica", "bold");
    doc.text(`Total del Pedido:`, 10, currentY);
    doc.text(formatCurrency(totalPrice), 195, currentY, { align: "right" });

    // Mensaje de agradecimiento
    currentY += 20;
    doc.setFontSize(12);
    doc.setFont("helvetica", "italic");
    doc.text("Gracias por tu compra en Candy Shop!", 105, currentY, {
      align: "center",
    });

    // Pie de página
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Candy Shop © 2024 - Todos los derechos reservados", 105, 290, {
      align: "center",
    });

    // Descargar PDF
    doc.save("factura_candy_shop.pdf");
  };

  return (
    <div className="checkout-container">
      <h2>Resumen del Pedido</h2>
      <div className="cart-summary">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-info">
                <img src={item.imgSrc} alt={item.name} className="item-image" />
                <div>
                  <p className="item-name">{item.name}</p>
                  <p className="item-price">{formatCurrency(item.price)}</p>
                  <p className="item-quantity">
                    Cantidad: {item.purchaseQuantity}
                  </p>
                </div>
              </div>
              <p className="item-total">
                Subtotal: {formatCurrency(item.price * item.purchaseQuantity)}
              </p>
            </div>
          ))
        ) : (
          <p>No hay productos en el carrito.</p>
        )}
      </div>

      <div className="checkout-summary">
        <h3>Total del Pedido: {formatCurrency(totalPrice)}</h3>
      </div>
      <div className="cart-summary">
        <h2>Información del Cliente</h2>
        <p>
          <strong>Nombre:</strong> {customer.first_name} {customer.last_name}
        </p>
        <p>
          <strong>Dirección:</strong> {customer.address}
        </p>
      </div>

      <button onClick={handleCheckout} className="checkout-button">
        Confirmar Pedido
      </button>
      <button onClick={downloadInvoice} className="download-button">
        Descargar Factura
      </button>
    </div>
  );
};

export default PayPage;
