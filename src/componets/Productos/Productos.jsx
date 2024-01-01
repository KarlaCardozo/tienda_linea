import React, { useState, useEffect } from "react";
import {
  ContainerMenus,
  CardsOptions,
  ContainerCards,
  CardsLabel,
  ButtonAdd,
} from "./Productos.style";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/Navbar";
import axios from "axios";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosResponse = await axios.get("http://localhost:3000/producto");
        setProductos(productosResponse.data);
  
        const categoriasResponse = await axios.get("http://localhost:3000/categoria");
        setCategorias(categoriasResponse.data || []); // Asegurarse de que se establezca un arreglo vacío si no hay datos
      } catch (error) {
        console.error("Error fetching data:", error);
        setCategorias([]); // En caso de error, también establecer un arreglo vacío
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    // Filtrar productos según la categoría seleccionada
    if (categoriaSeleccionada !== "") {
      const productosFiltradosPorCategoria = productos.filter(
        (producto) => producto.categoria === categoriaSeleccionada
      );
      setProductosFiltrados(productosFiltradosPorCategoria);
    } else {
      setProductosFiltrados([]);
    }
  }, [categoriaSeleccionada, productos]);

  return (
    <ContainerMenus>
      <NavBar />
      <div>
        <label htmlFor="categorias">Selecciona una categoría: </label>
        <select
          id="categorias"
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          value={categoriaSeleccionada}
        >
          <option value="">Todas</option>
          {categorias.map((categoria, index) => (
            <option key={index} value={categoria.des_categoria}>
              {categoria.des_categoria.trim()}
            </option>
          ))}
        </select>
      </div>
      <ContainerCards>
        {categoriaSeleccionada !== ""
          ? productosFiltrados.map((producto, index) => (
              <CardsOptions className="card" key={index}>
                <CardsLabel>{producto.nombre_producto}</CardsLabel>
                <CardsLabel>{producto.precio_producto}</CardsLabel>
                <ButtonAdd>Agregar</ButtonAdd>
              </CardsOptions>
            ))
          : productos.map((producto, index) => (
              <CardsOptions className="card" key={index}>
                <CardsLabel>{producto.nombre_producto}</CardsLabel>
                <CardsLabel>{producto.precio_producto}</CardsLabel>
                <ButtonAdd>Agregar</ButtonAdd>
              </CardsOptions>
            ))}
      </ContainerCards>
    </ContainerMenus>
  );
};

export default Productos;
