import styled from "styled-components";

export const ContainerMenus = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: "Quicksand", sans-serif;
  align-items: center;
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
`;

export const ContainerCards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  overflow-y: auto;
`;

export const CardsLabel = styled.label`
  margin: 10px;
`;

export const CardImage = styled.div`
  width: 100%;
  height: 100%;
`;

export const CardsOptions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px 1px 15px #d2d2d2;
  border-radius: 5px;
  color: black;
  box-shadow: 3px 3px 3px 3px grey;
  width: 80%;
  margin: 20px;
  font-family: "Quicksand", sans-serif;
  font-weight: 700;
  font-size: 20px;
  cursor: pointer;
`;

