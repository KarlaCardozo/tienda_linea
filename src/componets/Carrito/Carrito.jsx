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
                          item.precio_producto * item.descuento * item.cantidad // Restar el descuento
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
            <Carrito_Icon />
          </ConteinerNADD>
        )}
      </Carrito_Container>
      {carrito && carrito.length > 0 && (
        <Link to="/Pago">
          <EnviarOrdenButton>Proceder al pago</EnviarOrdenButton>
        </Link>
      )}
      {showModal && <Modal></Modal>}
    </div>
  );
};

export default Carrito;
