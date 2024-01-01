import React from "react";
import { Link } from "react-router-dom";
import { Navbar_Container, Carrito, LabelTitle,ContainerLogo } from "./Navbar.style";

const NavBar = () => {
  return (
    <Navbar_Container>
      <Link to="/">
        <ContainerLogo>
          <LabelTitle> Tienda en linea </LabelTitle>
        </ContainerLogo>
      </Link>
      <LabelTitle> Historial de pedidos </LabelTitle>
      <Link to="/Carrito">
        <Carrito />
      </Link>
    </Navbar_Container>
  );
};

export default NavBar;
