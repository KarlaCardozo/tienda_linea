import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Productos from "../src/componets/Productos/Productos";
import Carrito from "../src/componets/Carrito/Carrito";
import axios from "axios";

const RoutesComponent = () => {
  const [carrito, setCarrito] = useState([]);

  const addToCart = async (item, cantidad, observaciones) => {
    try {
      const newCart = {
        ...item,
        nombre_platillo: item.nombre_platillo,
        descripcion_platillo: item.descripcion_platillo,
        cantidad: cantidad,
        observaciones: observaciones,
      };
      const newCartItem = {
        id_platillo: item.id_platillo,
        cantidad,
        monto: item.precio * cantidad,
        observaciones,
      };

      const response = await axios.post(
        "http://localhost:3000/agregar_al_carrito",
        newCartItem
      );

      const combinedCartItem = {
        ...response.data.linea_pedido[0],
        ...newCart,
      };

      // Aquí, accedemos directamente a la línea de pedido recibida del servidor
      setCarrito((prevState) => [...prevState, combinedCartItem]);
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  };

  console.log({ carrito });

  const removeFromCart = (itemToRemove) => {
    const updatedCart = carrito.filter((item) => item.id !== itemToRemove.id);
    setCarrito(updatedCart);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Productos />} />

        <Route
          path="/Carrito"
          element={
            <Carrito carrito={carrito} removeFromCart={removeFromCart} />
          }
        />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
