import React, { useState } from "react";
import {
  Carrito_Container,
  Carrito_Item,
  Carrito_Text,
  Carrito_Nombre,
  Carrito_Precio,
  Carrito_Desc,
  Carrito_Button,
  Carrito_Icon,
  ConteinerNADD,
  EnviarOrdenButton,
  BackIcon,
  ContainerHeader,
  Modal,
  Input,
  Button,
  CloseButton,
} from "./Carrito.style";
import NavBar from "../NavBar/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

const formatCurrency = (amount) => {
  return amount.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });
};

const Carrito = ({ carrito, removeFromCart }) => {
  const [showModal, setShowModal] = useState(false);
  const [clienteId, setClienteId] = useState("");

  const enviarOrden = async () => {
    if (clienteId) {
      try {
        const promises = carrito.map(async (item) => {
          const response = await axios.post(
            "http://localhost:3000/enviar_orden",
            {
              id_linea_pedido: item.id_linea_pedido,
              id_mesa: 2,
              id_cliente: clienteId, // Agrega el ID del cliente al pedido
            }
          );
          return response.data;
        });

        const orderResponses = await Promise.all(promises);
        console.log(orderResponses);
        setShowModal(false); // Cerrar el modal después de enviar la orden
      } catch (error) {
        console.error("Error al enviar la orden:", error);
      }
    } else {
      // Mostrar mensaje de error si no se ingresa el ID del cliente
      alert("Por favor, ingresa tu ID de cliente");
    }
  };

  return (
    <div>
      <NavBar />
      <Carrito_Container>
        <ContainerHeader>
          <Link to="/">
            <BackIcon />
          </Link>
          <label>Carrito de compras</label>
          <Input
            type="text"
            placeholder="Ingresa tu ID de cliente"
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
          />
        </ContainerHeader>
        {carrito && carrito.length > 0 ? (
          carrito.map((item) => (
            <Carrito_Item key={item.id_linea_pedido}>
              <Carrito_Text>
                <div>
                  <Carrito_Nombre>{item.nombre_producto}</Carrito_Nombre>
                  <Carrito_Precio>
                    {formatCurrency(item.precio_producto)}
                  </Carrito_Precio>
                  <p>Cantidad: {item.cantidad}</p>
                </div>
                <div>
                  <p>
                    Subtotal:{" "}
                    {formatCurrency(item.cantidad * item.precio_producto)}
                  </p>
                </div>
                <Carrito_Button onClick={() => removeFromCart(item)}>
                  Eliminar
                </Carrito_Button>
              </Carrito_Text>
            </Carrito_Item>
          ))
        ) : (
          <ConteinerNADD>
            <p>No hay elementos en el carrito</p>
            <Carrito_Icon />
          </ConteinerNADD>
        )}
      </Carrito_Container>
      {carrito && carrito.length > 0 && (
        <EnviarOrdenButton onClick={enviarOrden}>
          Proceder al pago
        </EnviarOrdenButton>
      )}
      {showModal && <Modal></Modal>}
    </div>
  );
};

export default Carrito;
