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

  const addToCart = async (productoAgregado) => {
    setCarrito(prevCarrito => [...prevCarrito, productoAgregado]);
   /* try {
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
    }*/
  };

  console.log({ carrito });

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
        <Route path="/Pago" element={<PaymentMethods />} />
        <Route path="/Ordenes" element={<Orden />} />

      </Routes>
    </Router>
  );
};

export default RoutesComponent;
