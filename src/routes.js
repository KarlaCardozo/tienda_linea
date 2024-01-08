import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Productos from "../src/componets/Productos/Productos";
import Carrito from "../src/componets/Carrito/Carrito";
import ProductSelect from "../src/componets/ProductSelect/ProductSelect";
import PaymentMethods from "../src/componets/Pago/Pago";
import Orden from "../src/componets/Ordenes/Ordenes";
import axios from "axios";

const RoutesComponent = () => {
  const [carrito, setCarrito] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  const addToCart = async (productoAgregado) => {
    setCarrito(prevCarrito => [...prevCarrito, productoAgregado]);
  };

  const pedido = async (elementsPedido) => {
    setPedidos(prevCarrito => [...prevCarrito, elementsPedido]);
  };


  const removeFromCart = (itemToRemove) => {
    const updatedCart = carrito.filter((item) => item.id !== itemToRemove.id);
    setCarrito(updatedCart);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Productos addToCart={addToCart}/>} />

        <Route
          path="/Carrito"
          element={
            <Carrito carrito={carrito} removeFromCart={removeFromCart} />
          }
        />
        <Route path="/Descripcion_producto" element={<ProductSelect />} />
        <Route path="/Pago" element={<PaymentMethods carrito={carrito}  />} />
        <Route path="/Ordenes" element={<Orden />} />

      </Routes>
    </Router>
  );
};

export default RoutesComponent;
