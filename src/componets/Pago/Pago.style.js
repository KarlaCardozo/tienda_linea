import styled from "styled-components";

export const Container_Pago = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

export const Container_Met = styled.label`
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;
  width: 250px;
`;

export const Container = styled.div`
  padding: 20px;
  width: 40%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 5px;
  border: 1px solid black;
  background-color: #f2f2f7;
`;

export const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
`;

export const Checkbox = styled.input`
  margin-bottom: 10px;
`;

export const Label = styled.label`
  font-size: 16px;
  margin-bottom: 10px;
`;

export const Button = styled.button`
  background-color: #141414;
  color: white;
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 0 auto;

  &:hover {
    background-color: #2a2a2a;
  }
`;

export const Link = styled.a`
  color: #0070ba;
  cursor: pointer;
  text-decoration: underline;
`;

export const Text = styled.p`
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
`;

export const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #f5f5f5;
  font-family: Arial, sans-serif;
`;

export const Header = styled.h1`
  color: #4a4a4a;
  margin-bottom: 20px;
`;

export const Section = styled.div`
  margin-bottom: 20px;
`;

export const List = styled.ul`
  padding: 0;
  list-style-type: none;
`;

export const ListItem = styled.li`
  padding: 5px 0;
`;

export const StyledContainer = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const StyledTitle = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

export const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const StyledListItem = styled.li`
  color: #777;
  margin-bottom: 10px;
`;

export const ButtonConfirm = styled.button`
  border: 1px solid black;
  background-color: #9ca5f0;
  border-radius: 5px;
  margin: 0 auto;
  cursor: pointer;
  padding: 10px;
`;

export const ButtonCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Pedido = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;
