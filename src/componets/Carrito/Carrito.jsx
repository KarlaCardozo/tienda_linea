import React, { useState } from "react";
import {
  Carrito_Container,
  Carrito_Item,
  Carrito_Text,
  Carrito_Nombre,
  Carrito_Precio,
  Carrito_Button,
  Carrito_Icon,
  ConteinerNADD,
  EnviarOrdenButton,
  BackIcon,
  ContainerHeader,
  Modal,
  Input,
  Carrito_info,
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
      const idClienteInt = parseInt(clienteId, 10);

      try {
        const ordenResponse = await axios.post(
          "http://localhost:3000/nueva_orden",
          {
            ID_CLIENTE: idClienteInt,
          }
        );
        const ordenCreada = ordenResponse.data.nuevaOrden;
        console.log(ordenCreada);

        const promises = carrito.map(async (item) => {
          try {
            const response = await axios.post(
              "http://localhost:3000/nuevo_linea_producto",
              {
                ID_PRODUCTO: item.id_producto,
                ID_ORDEN: ordenCreada.id_orden, // Corregido a ID_ORDEN
                CANTIDAD: item.cantidad,
                PRECIO_PROD: item.precio_producto,
                DESCUENTO_LINEA:
                  item.precio_producto * item.descuento * item.cantidad,
                MONTO:
                  item.cantidad * item.precio_producto -
                  item.precio_producto * item.descuento * item.cantidad,
              }
            );
            return response.data;
          } catch (error) {
            console.error("Error al enviar la solicitud POST:", error);
            throw error;
          }
        });

        const results = await Promise.all(promises);
        console.log("Respuestas:", results);
        setShowModal(false);
      } catch (error) {
        console.error("Error al enviar la orden:", error);
      }
    } else {
      alert("Por favor, ingresa tu ID de cliente");
    }
  };

  // Calcular el total de descuentos
  const totalDescuentos = carrito.reduce((total, item) => {
    return total + item.precio_producto * item.descuento * item.cantidad;
  }, 0);

  // Calcular el total de la orden
  const totalOrden = carrito.reduce((total, item) => {
    return (
      total +
      item.cantidad * item.precio_producto -
      item.precio_producto * item.descuento * item.cantidad
    );
  }, 0);

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
          <>
            {carrito.map((item) => (
              <Carrito_Item key={item.id_linea_pedido}>
                <Carrito_Text>
                  <Carrito_info>
                    <Carrito_Nombre>{item.nombre_producto}</Carrito_Nombre>
                    <Carrito_Precio>
                      {formatCurrency(item.precio_producto)}
                    </Carrito_Precio>
                    <p>Cantidad: {item.cantidad}</p>
                  </Carrito_info>
                  <div>
                    <p>
                      Descuento:{" "}
                      {formatCurrency(
                        item.precio_producto * item.descuento * item.cantidad
                      )}
                    </p>
                  </div>
                  <div>
                    <p>
                      Subtotal:{" "}
                      {formatCurrency(
                        item.cantidad * item.precio_producto -
                          item.precio_producto * item.descuento * item.cantidad
                      )}
                    </p>
                  </div>
                  <Carrito_Button onClick={() => removeFromCart(item)}>
                    Eliminar
                  </Carrito_Button>
                </Carrito_Text>
              </Carrito_Item>
            ))}
            {/* Mostrar los totales */}
            <Carrito_Item>
              <Carrito_Text>
                <div>
                  <p>Total de Descuentos: {formatCurrency(totalDescuentos)}</p>
                </div>
                <div>
                  <p>Total de la Orden: {formatCurrency(totalOrden)}</p>
                </div>
              </Carrito_Text>
            </Carrito_Item>
          </>
        ) : (
          <ConteinerNADD>
            <p>No hay elementos en el carrito</p>
          </ConteinerNADD>
        )}
      </Carrito_Container>
      {carrito && carrito.length > 0 && (
        <Link to='/Pago'>
          <EnviarOrdenButton onClick={enviarOrden}>
            Proceder al pago
          </EnviarOrdenButton>
        </Link>
      )}
      {showModal && <Modal></Modal>}
    </div>
  );
};

export default Carrito;
