import React, { useState, useEffect } from "react";
import {
  ContainerMenus,
  CardsOptions,
  ContainerCards,
  CardsLabel,
  ButtonAdd,
  SearchInput,
  SearchButton,
  SearchContainer,
  Container_Search,
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
  const [elementos, setElementos] = useState([]);
  const [resultados, setResultados] = useState([]);
  const [producto, setProducto] = useState([]);

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

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/busqueda_productos?searchTerm=${elementos}`
      );

      setResultados(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResultados([]);
    }
  };

  return (
    <ContainerMenus>
      <NavBar />
      <Container_Search>
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
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="¿Qué deseas buscar?"
            value={elementos}
            onChange={(e) => setElementos(e.target.value)}
          />
          <SearchButton onClick={handleSearch}>Buscar</SearchButton>
        </SearchContainer>
      </Container_Search>
      <div>
        <ContainerCards>
          {categoriaSeleccionada !== ""
            ? productosFiltrados.map((producto, index) => (
                <CardsOptions className="card" key={index}>
                  <CardsLabel>{producto.nombre_producto}</CardsLabel>
                  <CardsLabel>
                    {formatCurrency(producto.precio_producto)}
                  </CardsLabel>
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
                        newErrorMessages[index] =
                          "La cantidad seleccionada no es válida";
                        setErrorMessages(newErrorMessages);
                      }
                    }}
                  >
                    Agregar
                  </ButtonAdd>
                  {errorMessages[index] && <p>{errorMessages[index]}</p>}
                </CardsOptions>
              ))
            : categorias.map((categoria, indexCategoria) => (
                <div key={indexCategoria}>
                  {categoria.descripcion_categoria}
                  <div>
                    {productos
                      .filter(
                        (producto) =>
                          producto.id_categoria === categoria.id_categoria
                      )
                      .map((producto, indexProducto) => (
                        <CardsOptions className="card" key={indexProducto}>
                          <CardsLabel>{producto.nombre_producto}</CardsLabel>
                          <CardsLabel>
                            {formatCurrency(producto.precio_producto)}
                          </CardsLabel>
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
                                newErrorMessages[indexProducto] = "";
                                setErrorMessages(newErrorMessages);
                              } else {
                                const newErrorMessages = [...errorMessages];
                                newErrorMessages[indexProducto] =
                                  "La cantidad seleccionada no es válida";
                                setErrorMessages(newErrorMessages);
                              }
                            }}
                          >
                            Agregar
                          </ButtonAdd>
                          {errorMessages[indexProducto] && (
                            <p>{errorMessages[indexProducto]}</p>
                          )}
                        </CardsOptions>
                      ))}
                  </div>
                </div>
              ))}
        </ContainerCards>
        {resultados.length > 0 && (
            <div>
              <h2>Resultados de la búsqueda:</h2>
              <ul>
                {resultados.map((resultado, index) => (
                  <ContainerCards>
                    <CardsOptions className="card" key={index}>
                      <CardsLabel>{resultado.nombre_producto}</CardsLabel>
                      <CardsLabel>
                        {formatCurrency(resultado.precio_producto)}
                      </CardsLabel>
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
                            newErrorMessages[index] =
                              "La cantidad seleccionada no es válida";
                            setErrorMessages(newErrorMessages);
                          }
                        }}
                      >
                        Agregar
                      </ButtonAdd>
                      {errorMessages[index] && <p>{errorMessages[index]}</p>}
                    </CardsOptions>
                  </ContainerCards>
                ))}
              </ul>
            </div>
          )}
      </div>
    </ContainerMenus>
  );
};

export default Productos;
