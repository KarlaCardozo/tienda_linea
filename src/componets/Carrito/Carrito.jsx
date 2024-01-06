import React from "react";
import {
  Carrito_Container,
  Carrito_Item,
  Carrito_Img,
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
} from "./Carrito.style";
import NavBar from "../NavBar/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

const Carrito = ({ carrito, removeFromCart }) => {
  const enviarOrden = async () => {
    try {
      // Aquí asumimos que queremos enviar la orden con todos los elementos del carrito
      const promises = carrito.map(async (item) => {
        const response = await axios.post(
          "http://localhost:3000/enviar_orden",
          {
            id_linea_pedido: item.id_linea_pedido,
            id_mesa: 2, // Esto debería ser dinámico, no estático
          }
        );
        return response.data;
      });

      const orderResponses = await Promise.all(promises);
      console.log(orderResponses);

      // Una vez enviada la orden, podrías limpiar el carrito
    } catch (error) {
      console.error("Error al enviar la orden:", error);
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
          <label>Orden</label>
        </ContainerHeader>
        {carrito && carrito.length > 0 ? (
          carrito.map((item) => (
            <Carrito_Item key={item.id_linea_pedido}>
              <Carrito_Text>
                <Carrito_Nombre>{item.nombre_producto}</Carrito_Nombre>
                <Carrito_Precio>{item.precio_producto}</Carrito_Precio>
                <Carrito_Desc>{item.descripcion_platillo}</Carrito_Desc>
                <p>Cantidad: {item.cantidad}</p>
              </Carrito_Text>
              <Carrito_Button onClick={() => removeFromCart(item)}>
                Eliminar
              </Carrito_Button>
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
          Enviar Orden
        </EnviarOrdenButton>
      )}
    </div>
  );
};

export default Carrito;
