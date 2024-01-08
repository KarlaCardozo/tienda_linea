import React, { useState } from "react";
import NavBar from "../NavBar/Navbar";
import styled from "styled-components";
import {
  Container_Pago,
  Container_Met,
  Container,
  Title,
  Form,
  Input,
  Checkbox,
  Label,
  Button,
  Link,
  Text,
  Wrapper,
  Header,
  Section,
  StyledContainer,
  StyledTitle,
  StyledList,
  StyledListItem,
  Pedido
} from "./Pago.style";

const PaymentMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState("");

  const handleSelectMethod = (event) => {
    setSelectedMethod(event.target.value);
  };

  const renderSelectedMethod = () => {
    switch (selectedMethod) {
      case "debit":
        return <DebitCard />;
      case "paypal":
        return <PayPal />;
      case "cash":
        return <Cash />;
      case "transfer":
        return <Transferencia />;
      default:
        return null;
    }
  };

  return (
    <div>
      <NavBar />
      <Container_Pago>
        <p>Seleccione el método de pago de su preferencia</p>
        {/* Renderizar las opciones de pago */}
        <Container_Met>
          <input
            type="radio"
            value="debit"
            checked={selectedMethod === "debit"}
            onChange={handleSelectMethod}
          />
          Tarjeta de débito/crédito
        </Container_Met>
        <Container_Met>
          <input
            type="radio"
            value="paypal"
            checked={selectedMethod === "paypal"}
            onChange={handleSelectMethod}
          />
          PayPal
        </Container_Met>
        <Container_Met>
          <input
            type="radio"
            value="cash"
            checked={selectedMethod === "cash"}
            onChange={handleSelectMethod}
          />
          Tienda de conveniencia
        </Container_Met>
        <Container_Met>
          <input
            type="radio"
            value="transfer"
            checked={selectedMethod === "transfer"}
            onChange={handleSelectMethod}
          />
          Transferencia
        </Container_Met>
      </Container_Pago>
      {renderSelectedMethod()}
    </div>
  );
};

const DebitCard = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [registeredCards, setRegisteredCards] = useState([
    // Ejemplo de tarjetas registradas por el cliente
    { cardNumber: "**** **** **** 1234", cardName: "Cliente Tarjeta" },
    // Agrega más tarjetas si las tienes registradas
  ]);
  const handleAddCard = () => {
    const newCard = {
      cardNumber: cardNumber,
      cardName: cardName,
      cardExp: cardExp,
      cardCVV: cardCVV,
    };
    setRegisteredCards([...registeredCards, newCard]);
    setCardNumber("");
    setCardName("");
  };

  const handleSelectMethod = (event) => {
    setSelectedMethod(event.target.value);
  };

  return (
    <Container>
      <div>
        {registeredCards.map((card, index) => (
          <Container_Met key={index}>
            <input
              type="radio"
              value={`card${index}`}
              onChange={handleSelectMethod}
            />
            {card.cardNumber} - {card.cardName}
          </Container_Met>
        ))}
      </div>
      <Title>Agregar una tarjeta de crédito o débito</Title>
      <Form>
        <Input
          type="text"
          placeholder="Número de tarjeta"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Nombre en la tarjeta"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Fecha vencimiento"
          value={cardExp}
          onChange={(e) => setCardExp(e.target.value)}
        />
        <Input
          type="text"
          placeholder="CVV"
          value={cardCVV}
          onChange={(e) => setCardCVV(e.target.value)}
        />
        <Button onClick={handleAddCard}>Confirmar tarjeta</Button>
      </Form>
      <Pedido>
        <Button>Hacer Orden</Button>
      </Pedido>
    </Container>
  );
};

const PayPal = () => {
  return (
    <Container>
      <Title>Paga con PayPal</Title>
      <Text>
        Paga con PayPal con cualquiera de tus cuentas. Al finalizar mi compra
        acepto los Términos y condiciones del servicio.
      </Text>
      <Button>Pagar con PayPal</Button>
    </Container>
  );
};

const Cash = () => {
  return (
    <Wrapper>
      <Header>Instrucciones para realizar el pago</Header>
      <Section>
        <h2>1. Acude a cualquier tienda afiliada</h2>
      </Section>
      <Section>
        <h2>
          2. Entrega al cajero el código de barras y menciona que realizarás un
          pago de servicio Paynet
        </h2>
      </Section>
      <Section>
        <h2>3. Realizar el pago en efectivo por $750.00 MXN</h2>
      </Section>
      <Section>
        <h2>4. Conserva el ticket para cualquier aclaración</h2>
      </Section>
      <Section>
        <h2>
          5. Si tienes dudas comunicate a Mojave al teléfono (442) 555-5555 o al
          correo israel.grijava+mojave@openpay.mx
        </h2>
      </Section>
      <Section>
        <h2>Bodega Aurrera</h2>
        <h2>Sams</h2>
        <h2>Waldo's</h2>
      </Section>
      <Section>
        <h2>
          Para cualquier duda sobre como cobrar, por favor llamar al teléfono
          (55) 5351 7371 en un horario de 8am a 9pm de lunes a domingo
        </h2>
      </Section>
    </Wrapper>
  );
};

const Transferencia = () => {
  return (
    <StyledContainer>
      <StyledTitle>
        Instrucciones para tu cliente, una vez realizada la compra
      </StyledTitle>
      <StyledList>
        <StyledListItem>Nombre del banco: Citibank</StyledListItem>
        <StyledListItem>Número de cuenta: 0/908724/038</StyledListItem>
        <StyledListItem>CBU: 016888810009087240382</StyledListItem>
        <StyledListItem>Alias: MFC.INDUMENTARIA</StyledListItem>
        <StyledListItem>Titular de la cuenta: MFC S.R.L.</StyledListItem>
        <StyledListItem>CUIT: 30-71201835-9</StyledListItem>
      </StyledList>
      <p>
        Luego, es necesario que nos envíes el comprobante a hola@mfc.com para
        que confirmes el pago y podamos enviar tu compra :)
      </p>
    </StyledContainer>
  );
};

export default PaymentMethods;
