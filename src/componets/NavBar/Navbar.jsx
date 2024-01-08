import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar_Container,
  Carrito,
  LabelTitle,
  ContainerLogo,
} from "./Navbar.style";

const NavBar = () => {
  return (
    <Navbar_Container>
      <Link to="/">
        <ContainerLogo>
          <LabelTitle> Tienda en linea </LabelTitle>
        </ContainerLogo>
      </Link>
      <Link to="/Ordenes">
        <LabelTitle> Historial de pedidos </LabelTitle>
      </Link>
      <Link to="/Ediatr">
        <LabelTitle> Editar productos </LabelTitle>
      </Link>
      <Link to="/Carrito">
        <Carrito />
      </Link>
    </Navbar_Container>
  );
};

export default NavBar;
