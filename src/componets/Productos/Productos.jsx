import React, { useState, useEffect } from "react";
import {
  ContainerMenus,
  CardsOptions,
  ContainerCards,
  CardsLabel,
  ButtonAdd,
} from "./Productos.style";
import NavBar from "../NavBar/Navbar";
import Contador from "../Counter/counter";
import axios from "axios";

const formatCurrency = (amount) => {
  return amount.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });
};

const Productos = ({ addToCart }) => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(0);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosResponse = await axios.get(
          "http://localhost:3000/producto"
        );
        setProductos(productosResponse.data);

        const categoriasResponse = await axios.get(
          "http://localhost:3000/categoria"
        );
        setCategorias(categoriasResponse.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setCategorias([]);
      }
    };

    fetchData();
    
  }, []);

  useEffect(() => {
    if (categoriaSeleccionada !== "") {
      const productosFiltradosPorCategoria = productos.filter(
        (producto) => producto.id_categoria === parseInt(categoriaSeleccionada)
      );
      setProductosFiltrados(productosFiltradosPorCategoria);
      setErrorMessages(Array(productosFiltradosPorCategoria.length).fill(""));
    } else {
      setProductosFiltrados(productos);
      setErrorMessages(Array(productos.length).fill(""));
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
            <option key={index} value={categoria.id_categoria}>
              {categoria.descripcion_categoria.trim()}
            </option>
          ))}
        </select>
      </div>
      <ContainerCards>
        {categoriaSeleccionada !== ""
          ? productosFiltrados.map((producto, index) => (
              <CardsOptions className="card" key={index}>
                <CardsLabel>{producto.nombre_producto}</CardsLabel>
                <CardsLabel>{formatCurrency(producto.precio_producto)}</CardsLabel>
                <Contador
                  onCountChange={(cantidad) => {
                    setCantidadSeleccionada(cantidad);
                  }}
                />
                <ButtonAdd
                  onClick={() => {
                    if (
                      cantidadSeleccionada > 0 &&
                      cantidadSeleccionada <= producto.existencia
                    ) {
                      const productoAgregado = {
                        ...producto,
                        cantidad: cantidadSeleccionada,
                      };
                      addToCart(productoAgregado);
                      const newErrorMessages = [...errorMessages];
                      newErrorMessages[index] = "";
                      setErrorMessages(newErrorMessages);
                    } else {
                      const newErrorMessages = [...errorMessages];
                      newErrorMessages[index] = "La cantidad seleccionada no es válida";
                      setErrorMessages(newErrorMessages);
                    }
                  }}
                >
                  Agregar
                </ButtonAdd>
                {errorMessages[index] && <p>{errorMessages[index]}</p>}
              </CardsOptions>
            ))
          : productos.map((producto, index) => (
              <CardsOptions className="card" key={index}>
                <CardsLabel>{producto.nombre_producto}</CardsLabel>
                <CardsLabel>{formatCurrency(producto.precio_producto)}</CardsLabel>
                <Contador
                  onCountChange={(cantidad) => {
                    setCantidadSeleccionada(cantidad);
                  }}
                />
                <ButtonAdd
                  onClick={() => {
                    if (
                      cantidadSeleccionada > 0 &&
                      cantidadSeleccionada <= producto.existencia
                    ) {
                      const productoAgregado = {
                        ...producto,
                        cantidad: cantidadSeleccionada,
                      };
                      addToCart(productoAgregado);
                      const newErrorMessages = [...errorMessages];
                      newErrorMessages[index] = "";
                      setErrorMessages(newErrorMessages);
                    } else {
                      const newErrorMessages = [...errorMessages];
                      newErrorMessages[index] = "La cantidad seleccionada no es válida";
                      setErrorMessages(newErrorMessages);
                    }
                  }}
                >
                  Agregar
                </ButtonAdd>
                {errorMessages[index] && <p>{errorMessages[index]}</p>}
              </CardsOptions>
            ))}
      </ContainerCards>
    </ContainerMenus>
  );
};

export default Productos;
