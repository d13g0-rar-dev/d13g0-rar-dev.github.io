import React, { useState } from "react";
import API from "../services/api";
import "../styles/components/ProductManager.css";
import { useEffect } from "react";

function ProductManager() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    description: "",
  });
  const [editingProduct, setEditingProduct] = useState(null); // Producto en edición
  const [showModal, setShowModal] = useState(false); // Mostrar/ocultar modal
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.getProducts().then((data) => setProducts(data));
  }, []);

  const handleAddProduct = () => {
    // Verificar que todos los campos requeridos estén llenos
    if (
      !newProduct.name ||
      !newProduct.description ||
      !newProduct.category ||
      !newProduct.price ||
      !newProduct.quantity
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Si todo está completo, enviamos el formulario
    API.addProduct(newProduct)
      .then((data) => {
        setProducts([...products, data]);
        setNewProduct({
          name: "",
          description: "",
          category: "",
          price: "",
          quantity: "",
        }); // Limpiar el formulario después de agregar
      })
      .catch((error) => {
        console.error("Error agregando producto:", error);
      });
  };

  const handleEditProduct = (index) => {
    setEditingProduct(products[index]); // Seleccionar producto a editar
    setShowModal(true); // Mostrar modal
  };

  const handleUpdateProduct = () => {
    API.updateProduct(editingProduct).then((updatedProduct) => {
      // Actualizar el producto en la lista
      const updatedProducts = products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
      setProducts(updatedProducts);
      setShowModal(false); // Cerrar modal
    });
  };

  const handleDeleteProduct = (index) => {
    const productId = products[index].id;
    console.log("Eliminando producto con ID:", productId);
    API.deleteProduct(parseInt(productId)).then(() => {
      // Eliminar el producto del estado (estado local) después de la eliminación exitosa
      const updatedProducts = products.filter((_, i) => i !== index);
      setProducts(updatedProducts); // Actualizamos el estado para re-renderizar la lista
      console.log("Producto eliminado correctamente");
    });
  };

  return (
    <section>
      <h3>Gestión de Productos</h3>
      <div>
        <h4>Productos</h4>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <button onClick={() => handleEditProduct(index)}>
                    Editar
                  </button>
                  <button onClick={() => handleDeleteProduct(index)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4>Añadir Productos</h4>
        <div className="add-product">
          <input
            required
            type="text"
            placeholder="Nombre del producto"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <input
            required
            type="text"
            placeholder="Descripción"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
          <select
            required
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
          >
            <option value="">--Seleccione categoría--</option>{" "}
            {/* Agregado para asegurar que haya un valor por defecto */}
            <option value="gomas">Gomas</option>
            <option value="chocolates">Chocolates</option>
            <option value="galletas">Galletas</option>
          </select>
          <input
            required
            type="number"
            placeholder="Precio"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <input
            required
            type="number"
            placeholder="Stock"
            value={newProduct.quantity}
            onChange={(e) =>
              setNewProduct({ ...newProduct, quantity: e.target.value })
            }
          />
          <button onClick={handleAddProduct}>Agregar Producto</button>
        </div>

        {/* Modal para editar */}
        {showModal && (
          <>
            <div className="modal-overlay" />
            <div className="modal">
              <h4>Editar Producto</h4>
              <div className="modal-form">
                <label>
                  Nombre del producto
                  <input
                    type="text"
                    placeholder="Nombre del producto"
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        name: e.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  Descripción
                  <input
                    type="text"
                    placeholder="Descripción"
                    value={editingProduct.description}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        description: e.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  Categoría:
                  <select
                    value={editingProduct.category}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        category: e.target.value,
                      })
                    }
                  >
                    <option value="">--Seleccione categoría--</option>{" "}
                    {/* Agregado para asegurar que haya un valor por defecto */}
                    <option value="gomas">Gomas</option>
                    <option value="chocolates">Chocolates</option>
                    <option value="galletas">Galletas</option>
                  </select>
                </label>
                <label>
                  Precio
                  <input
                    type="number"
                    placeholder="Precio"
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        price: e.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  Stock
                  <input
                    type="number"
                    placeholder="Stock"
                    value={editingProduct.quantity}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        quantity: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
              <div className="modal-buttons">
                <button className="primary" onClick={handleUpdateProduct}>
                  Actualizar Producto
                </button>
                <button
                  className="secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default ProductManager;
