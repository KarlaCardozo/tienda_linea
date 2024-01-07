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
import Contador from "../Counter/counter";
import Airpods from "../../assets/airpods";
import Laptop from "../../assets/laptop";
import Computadora from "../../assets/computadora";
import axios from "axios";

const images = [
  {
    id: 1,
    title: 'Airpods',
    imageUrl: <Airpods width="50%" height="50%" />,
  },
  {
    id: 2,
    title: 'Laptop',
    imageUrl: <Laptop width="50%" height="50%" />,
  },
  {
    id: 3,
    title: 'Computadora',
    imageUrl: <Computadora width="50%" height="50%" />,
  },
];

const getCategoryImage = (category) => {
  const image = images.find((img) => img.title === category);
  return image ? image.imageUrl : null;
};

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
  const [errorMessage, setErrorMessage] = useState("");

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
        setCategorias(categoriasResponse.data || []); // Asegurarse de que se establezca un arreglo vacío si no hay datos
      } catch (error) {
        console.error("Error fetching data:", error);
        setCategorias([]); // En caso de error, también establecer un arreglo vacío
      }
    };

    fetchData();
  }, []);

  console.log({productos})

  console.log(productos);

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
                {getCategoryImage(producto.nombre_producto)}
                
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
                      setErrorMessage(""); // Limpiar el mensaje de error si la cantidad es válida
                    } else {
                      setErrorMessage("La cantidad seleccionada no es válida"); // Establecer el mensaje de error
                    }
                  }}
                >
                  Agregar
                </ButtonAdd>
                {errorMessage && <p>{errorMessage}</p>}
              </CardsOptions>
            ))
          : productos.map((producto, index) => (
              <CardsOptions className="card" key={index}>
                {getCategoryImage(producto.nombre_producto)}
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
                      setErrorMessage(""); // Limpiar el mensaje de error si la cantidad es válida
                    } else {
                      setErrorMessage("La cantidad seleccionada no es válida"); // Establecer el mensaje de error
                    }
                  }}
                >
                  Agregar
                </ButtonAdd>
                {errorMessage && <p>{errorMessage}</p>}
              </CardsOptions>
            ))}
      </ContainerCards>
    </ContainerMenus>
  );
};

export default Productos;
