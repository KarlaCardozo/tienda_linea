import styled from "styled-components";

export const ContainerMenus = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: "Quicksand", sans-serif;
  align-items: center;
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
`;

export const ContainerCards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
  font-size: 16px;
  cursor: pointer;
`;

export const ButtonAdd = styled.div`
  border: 1px 1px 15px #e8dafc;
  background-color: #d7dbff;
  border-radius: 5px;
  color: black;
  box-shadow: 3px 3px 3px 3px grey;
  width: 25%;
  margin: 20px;
  font-family: "Quicksand", sans-serif;
  font-size: 12px;
  cursor: pointer;
  text-align: center;
  padding:5px;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;
`;

export const SearchInput = styled.input`
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export const SearchButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
