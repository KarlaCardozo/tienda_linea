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
        <p>Seleccione el metodo de pago de su preferencia</p>
        <Container_Met>
          <input
            type="radio"
            value="debit"
            checked={selectedMethod === "debit"}
            onChange={handleSelectMethod}
          />
          Tarjeta de debito / crédito
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
          Tienda de coneviencia
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

      <div>
        <button>Confirmar Pago</button>
      </div>
    </div>
  );
};

const DebitCard = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [useAsDefault, setUseAsDefault] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", {
      cardNumber,
      cardName,
      expiryDate,
      securityCode,
      useAsDefault,
    });
  };

  return (
    <Container>
      <Title>Agregar una tarjeta de crédito o débito</Title>
      <Form onSubmit={handleSubmit}>
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
          placeholder="Fecha de vencimiento"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Código de Seguridad"
          value={securityCode}
          onChange={(e) => setSecurityCode(e.target.value)}
        />
        <Checkbox
          type="checkbox"
          checked={useAsDefault}
          onChange={(e) => setUseAsDefault(e.target.checked)}
        />
        <Label htmlFor="useAsDefault">Usar como mi pago predeterminado</Label>
        <Button type="submit">Confirmació CARNET</Button>
      </Form>
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
      <Text>
        ¿Deseas cambiar de método de pago? <Link>Ingresa aquí</Link>
      </Text>
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
