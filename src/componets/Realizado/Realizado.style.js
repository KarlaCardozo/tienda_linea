import styled from "styled-components";
import { BagCheckFill } from "@styled-icons/bootstrap/BagCheckFill";

export const Realizado_Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  width: 96%;
`;

export const Text_Pague = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #333333;
`;

export const Carrito_Icon = styled(BagCheckFill)`
  color: black;
  width: 60px;
  margin-right: 10px;
`;
