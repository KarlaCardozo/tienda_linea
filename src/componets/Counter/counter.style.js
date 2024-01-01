import styled from "styled-components";
import { DashCircle } from "@styled-icons/bootstrap/DashCircle";
import { PlusCircle } from "@styled-icons/bootstrap/PlusCircle";

export const ContainerCounter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "Quicksand", sans-serif;
  align-items: center;
  width: 100%;
`;

export const ContainerButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 30%;
`;

export const LessIcon = styled(DashCircle)`
  color: #349740;
  width: 25px;
  cursor: pointer;
`;

export const Counter = styled.div`
  display: flex;
  justofy-content: center;
  aling-items: center;
  text-aling: center;
`;

export const AddIcon = styled(PlusCircle)`
  color: #349740;
  width: 25px;
  cursor: pointer;
`;
