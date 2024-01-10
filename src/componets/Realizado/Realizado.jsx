import React from "react";
import {
  Realizado_Container,
  Text_Pague,
  Carrito_Icon,
} from "./Realizado.style";
import { Link } from "react-router-dom";

const Realizado = () => {
  return (
    <Realizado_Container>
      <Text_Pague>Pedido Realizado con exito </Text_Pague>
      <Carrito_Icon />
      <Link to="/">
        <Text_Pague>Regresar al la tienda</Text_Pague>
      </Link>
    </Realizado_Container>
  );
};

export default Realizado;
