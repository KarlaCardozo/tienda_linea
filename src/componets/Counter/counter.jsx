import React, { useState } from "react";
import {
  ContainerCounter,
  ContainerButtons,
  AddIcon,
  LessIcon,
  Counter,
} from "./counter.style";

const Contador = ({ onCountChange }) => {
  const [contador, setContador] = useState(0);

  const incrementar = () => {
    const newCount = contador + 1;
    setContador(newCount);
    onCountChange(newCount);
  };

  const decrementar = () => {
    if (contador > 0) {
      const newCount = contador - 1;
      setContador(newCount);
      onCountChange(newCount);
    }
  };

  return (
    <ContainerCounter>
      <ContainerButtons>
        <LessIcon onClick={decrementar} />
        <Counter>{contador}</Counter>
        <AddIcon onClick={incrementar} />
      </ContainerButtons>
    </ContainerCounter>
  );
};

export default Contador;
