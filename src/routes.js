import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Productos from "../src/componets/Productos/Productos";
import Carrito from "../src/componets/Carrito/Carrito";
import ProductSelect from "../src/componets/ProductSelect/ProductSelect";
import PaymentMethods from "../src/componets/Pago/Pago";
import Orden from "../src/componets/Ordenes/Ordenes";
import Realizado from "../src/componets/Realizado/Realizado"
import axios from "axios";

const RoutesComponent = () => {
  const [carrito, setCarrito] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  const addToCart = async (productoAgregado) => {
    setCarrito(prevCarrito => [...prevCarrito, productoAgregado]);
  };

  const pedido = async (elementsPedido) => {
    setPedidos(prevPedido => [...prevPedido, elementsPedido]);
  };

  console.log({carrito})

  const removeFromCart = (itemToRemove) => {
    const updatedCart = carrito.filter((item) => item.id_producto !== itemToRemove.id_producto);
    setCarrito(updatedCart);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Productos addToCart={addToCart}/>} />

        <Route
          path="/Carrito"
          element={
            <Carrito carrito={carrito} removeFromCart={removeFromCart} pedido={pedido} />
          }
        />
        <Route path="/Descripcion_producto" element={<ProductSelect />} />
        <Route path="/Pago" element={<PaymentMethods pedido={pedidos}  />} />
        <Route path="/Ordenes" element={<Orden />} />
        <Route path="/Realizado" element={<Realizado />} />

      </Routes>
    </Router>
  );
};

export default RoutesComponent;
