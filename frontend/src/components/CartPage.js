import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext"; // Importamos el hook para acceder al carrito

const CartPage = () => {
  const { cartItems, removeItem, addToCart } = useCart(); // Usamos el contexto para acceder a los items y funciones
  const navigate = useNavigate();

  // Calcular el total del carrito
  const calculateTotal = () => {
    return cartItems.reduce((acc, product) => acc + product.price * product.purchaseQuantity, 0);
  };

  // Función para actualizar la cantidad
  const updateQuantity = (product, action) => {
    const updatedProduct = { ...product };
    if (action === "increase") {
      updatedProduct.purchaseQuantity += 1;
    } else if (action === "decrease" && updatedProduct.purchaseQuantity > 1) {
      updatedProduct.purchaseQuantity -= 1;
    }

    // Actualizar el carrito con la nueva cantidad
    addToCart(updatedProduct); // Usamos addToCart para actualizar el carrito global
  };

  // Redirigir a la página de checkout
  const goToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-page">
      <h2>Mi Carrito</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((product) => (
            <tr key={product.id}>
              <td>
                <img src={product.imgSrc} alt={product.name} className="cart-image" />
                {product.name}
              </td>
              <td>
                <button onClick={() => updateQuantity(product, "decrease")}>-</button>
                {product.purchaseQuantity}
                <button onClick={() => updateQuantity(product, "increase")}>+</button>
              </td>
              <td>
                ${product.price * product.purchaseQuantity}
              </td>
              <td>
                <button onClick={() => removeItem(product.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cart-total">
        <p>Total: ${calculateTotal()}</p>
        <button onClick={goToCheckout}>Proceder al pago</button>
      </div>
    </div>
  );
};

export default CartPage;
