import React, { useState, useEffect } from "react";
import {
  Container_Ordenes,
  Title_Orden,
  Table_Conteiner,
  TableCell,
  TableHead,
  TableTR,
  Container_Buttons,
  Button_Regresar,
  TableTH,
  SearchContainer,
  SearchInput,
  SearchButton,
  ContainerDatos,
  Orden_title,
} from "./Ordenes.style";
import NavBar from "../NavBar/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

const Orden = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [idCliente, setIdCliente] = useState("");
  const [resultados, setResultados] = useState([]);
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosResponse = await axios.get(
          "http://localhost:3000/ordenes"
        );
        setOrdenes(productosResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const filteredOrders = ordenes.filter(
      (orden) => orden.id_cliente === parseInt(idCliente)
    );
    setResultados(filteredOrders);

    const clienteEncontrado = ordenes.find(
      (orden) => orden.id_cliente === parseInt(idCliente)
    );

    if (clienteEncontrado) {
      setCliente(clienteEncontrado);
    } else {
      setCliente(null);
    }
  };

  const groupOrdersById = (orders) => {
    const groupedOrders = orders.reduce((acc, order) => {
      if (!acc[order.id_orden]) {
        acc[order.id_orden] = [];
      }
      acc[order.id_orden].push(order);
      return acc;
    }, {});
    return groupedOrders;
  };

  const groupedOrders = groupOrdersById(resultados);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
    });
  };

  return (
    <div>
      <NavBar />
      <Container_Ordenes>
        <Title_Orden>Historial de Orden</Title_Orden>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Ingrese ID del cliente"
            value={idCliente}
            onChange={(e) => setIdCliente(e.target.value)}
          />
          <SearchButton onClick={handleSearch}>Buscar</SearchButton>
        </SearchContainer>
        {cliente && (
          <ContainerDatos>
            <p>ID Cliente: {cliente.id_cliente}</p>
            <p>Nombre Cliente: {cliente.nombre_cliente}</p>
          </ContainerDatos>
        )}

        {Object.keys(groupedOrders).map((orderId) => {
          const total = groupedOrders[orderId].reduce(
            (acc, orden) => acc + orden.monto,
            0
          );
          return (
            <div key={orderId}>
              <Orden_title>ID Orden: {orderId}</Orden_title>
              <Table_Conteiner>
                <TableHead>
                  <tr>
                    <TableTH>ID Orden</TableTH>
                    <TableTH>Fecha orden</TableTH>
                    <TableTH>Productos</TableTH>
                    <TableTH>Cantidad</TableTH>
                    <TableTH>Precio</TableTH>
                    <TableTH>Monto</TableTH>
                  </tr>
                </TableHead>
                <tbody>
                  {groupedOrders[orderId].map((orden) => (
                    <TableTR key={orden.id_orden}>
                      <TableCell>{orden.id_orden}</TableCell>
                      <TableCell>{formatDate(orden.fecha_orden)}</TableCell>
                      <TableCell>{orden.nombre_producto}</TableCell>
                      <TableCell>{orden.cantidad}</TableCell>
                      <TableCell>{formatCurrency(orden.precio_prod)}</TableCell>
                      <TableCell>{formatCurrency(orden.monto)}</TableCell>
                    </TableTR>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <TableTH colSpan="5">Total</TableTH>
                    <TableCell>{formatCurrency(total)}</TableCell>
                  </tr>
                </tfoot>
              </Table_Conteiner>
            </div>
          );
        })}

        <Link to="/">
          <Container_Buttons>
            <Button_Regresar>Regresar</Button_Regresar>
          </Container_Buttons>
        </Link>
      </Container_Ordenes>
    </div>
  );
};

export default Orden;
