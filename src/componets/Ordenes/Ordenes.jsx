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
  Button_Aceptar,
  TableTH
} from "./Orden.style";

const Orden = ({ data }) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data]);

  return (
    <Container_Ordenes>
      <Title_Orden>Historial de Orden</Title_Orden>
      <Table_Conteiner>
        <TableHead>
          <tr>
            <TableTH>Orden</TableTH>
            <TableTH>ID</TableTH>
            <TableTH>Productos</TableTH>
            <TableTH>Observaciones</TableTH>
            <TableTH>Estado de la orden</TableTH>
          </tr>
        </TableHead>
        <tbody>
          {filteredData.map((orden) => (
            <TableTR key={orden.id_orden}>
              <TableCell>{orden.id_orden}</TableCell>
              <TableCell>{orden.mesa}</TableCell>
              <TableCell>{orden.producto}</TableCell>
              <TableCell>{orden.observaciones}</TableCell>
              <TableCell>
                <Button_Aceptar>Aceptar</Button_Aceptar>
              </TableCell>
            </TableTR>
          ))}
        </tbody>
      </Table_Conteiner>
      <Container_Buttons>
        <Button_Regresar>Regresar</Button_Regresar>
      </Container_Buttons>
    </Container_Ordenes>
  );
};

export default Orden;
