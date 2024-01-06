import styled from "styled-components";

export const Container_Ordenes = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0 10px 0;
  width: 100%;
  background: linear-gradient(to right, rgb(225, 230, 245), rgb(247, 252, 248));
  height: 700px;
`;

export const Title_Orden = styled.label`
  font-size: 20px;
  color: black;
  text-align: center;
  margin-top: 20px;
  font-weight: 600;
`;

export const Table_Conteiner = styled.table`
  width: 80%;
  margin: 20px auto;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  color: black;
  background-color: rgb(191, 222, 221);
`;

export const TableCell = styled.td`
  padding: 8px;
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
export const TableTH = styled.th`
  text-align: center;
  font-weight: 600;
`;

export const TableTR = styled.tr`
  &:nth-child(even) {
    background-color: rgb(241, 248, 254);
  }

  &:nth-child(odd) {
    background-color: white;
  }
`;

export const Container_Buttons = styled.div`
  display: flex;
  padding: 10px 0 10px 0;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
`;

export const Button_Regresar = styled.button`
  position: relative;
  z-index: 0;
  width: 7%;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 2px;
  transition: all 0.3s ease;
  background-color: rgb(173,222,241);
  border-radius: 10px;
  padding: 2px;
  border:1px solid black;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3); /* Sombra por defecto */
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    background-color: #A3E9F9; 
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5); /* Sombra al pasar el mouse */
  transform: translateY(-3px);

  &:active {
    background-color: #A3CEF9; 
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5); /* Sombra al pasar el mouse */
  transform: translateY(-6px);
  }
`;

export const Button_Aceptar = styled.button`
  position: relative;
  z-index: 0;
  width: 45%;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 2px;
  transition: all 0.3s ease;
  background-color: rgb(231,245,244);
  border-radius: 10px;
  padding: 2px;
  border:1px solid black;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3); /* Sombra por defecto */
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    background-color: #B6F8CF; 
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5); /* Sombra al pasar el mouse */
  transform: translateY(-3px);

  &:active {
    background-color: #99CAA5; 
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5); /* Sombra al pasar el mouse */
  transform: translateY(-6px);
  }
`;
