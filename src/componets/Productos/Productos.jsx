import React, { useState, useEffect } from "react";
import {
  ContainerMenus,
  CardsOptions,
  ContainerCards,
  CardsLabel,
} from "./Productos.style";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/Navbar";
import axios from "axios";

const Productos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:3000/producto");
      setProductos(result.data);
    };

    fetchData();
  }, []);
  return (
    <ContainerMenus>
      <NavBar />
      <ContainerCards>
        {productos.map((producto, index) => (
          <CardsOptions className="card" key={index}>
            <CardsLabel>{producto.nombre_producto}</CardsLabel>
            <CardsLabel>{producto.precio_producto}</CardsLabel>
            <button>Agregar al carrito</button>
          </CardsOptions>
        ))}
      </ContainerCards>
    </ContainerMenus>
  );
};

export default Productos;
