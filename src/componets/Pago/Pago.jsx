import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/Navbar";
import {
  Container_Pago,
  Container_Met,
  Container,
  Title,
  Form,
  Input,
  Button,
  Text,
  Wrapper,
  Header,
  Section,
  StyledContainer,
  StyledTitle,
  StyledList,
  StyledListItem,
  Pedido,
} from "./Pago.style";
import { Link } from "react-router-dom";
import axios from "axios";

const PaymentMethods = ({ pedido }) => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [paymentOptions, setPaymentOptions] = useState([]);

  console.log({ pedido });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosResponse = await axios.get(
          "http://localhost:3000/metodo-pago"
        );
        setPaymentOptions(productosResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectMethod = (event) => {
    setSelectedMethod(event.target.value);
  };

  const renderSelectedMethod = () => {
    switch (selectedMethod) {
      case "Tarjeta de débito ":
        return <DebitCard pedido={pedido} />;
      case "Tarjeta de crédito":
        return <CreditCard pedido={pedido} />;
      case "Pasarela de pago":
        return <PayPal />;
      case "Tienda de conveniencia":
        return <Cash />;
      case "Deposito":
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
        {paymentOptions.map((option) => (
          <Container_Met key={option.id}>
            <input
              type="radio"
              value={option.tipo_metodo}
              checked={selectedMethod === option.tipo_metodo}
              onChange={handleSelectMethod}
            />
            {option.tipo_metodo}{" "}
          </Container_Met>
        ))}
      </Container_Pago>
      {renderSelectedMethod()}
    </div>
  );
};

const CreditCard = ({ pedido }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [registeredCards, setRegisteredCards] = useState([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState(-1);
  const [selectedCardData, setSelectedCardData] = useState(null);

  console.log(pedido[0].totalOrden);

  console.log({ selectedCardData });

  const enviarPedidoPago = async () => {
    if (pedido && pedido.length > 0 && pedido[0].idOrden) {
      //console.log("si entra");
      const promises = pedido.map(async (item) => {
        try {
          const response = await axios.post(
            "http://localhost:3000/nuevo_pago",
            {
              ID_METODO_PAGO: 1,
              ID_ORDEN: 3,
              ID_DESCRIPCION: selectedCardData.id_descripcion,
              MONTO_TOTAL: item.totalOrden,
            }
          );
          return response.data;
        } catch (error) {
          console.error("Error al enviar la solicitud POST:", error);
          throw error;
        }
      });

      const results = await Promise.all(promises);
      console.log("Respuestas:", results);
    } else {
      console.error("Pedido no válido o sin datos de orden.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const metodo = await axios.get(
          "http://localhost:3000/descripcion_metodo"
        );
        setRegisteredCards(metodo.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddCard = async (e) => {
    e.preventDefault();
    const newCard = {
      id_cliente: 1, // Supongamos que hay un ID de cliente predefinido o puedes obtenerlo de alguna manera
      id_metodo_pago: 1, // Supongamos que el ID del método de pago es 1 (debes obtenerlo de la interfaz)
      num_tarjeta: cardNumber,
      nom_tarjeta: cardName,
      exp_tarjeta: cardExp,
      cvv_tarjeta: cardCVV,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/nuevo_descripcion_metodo",
        newCard
      );
      console.log(response.data); // Muestra la respuesta de la API en la consola
      setRegisteredCards([...registeredCards, newCard]); // Agrega la tarjeta a la lista solo después de que se confirma en la base de datos
      setCardNumber("");
      setCardName("");
      setCardExp("");
      setCardCVV("");
    } catch (error) {
      console.error("Error al agregar la tarjeta:", error);
      // Puedes manejar el error de alguna manera aquí, como mostrar un mensaje al usuario
    }
  };

  const handleSelectMethod = (index) => {
    setSelectedCardIndex(index);
    setSelectedMethod(`card${index}`);
    const selectedCard = registeredCards.find((card, i) => i === index);
    setSelectedCardData(selectedCard);
  };

  return (
    <Container>
      <div>
        {registeredCards
          .filter((card) => card.id_metodo_pago === 1)
          .map((card, index) => (
            <Container_Pago key={index}>
              <Container_Met>
                <input
                  type="radio"
                  value={`card${index}`}
                  checked={selectedMethod === `card${index}`}
                  onChange={() => handleSelectMethod(index)}
                />
                {card.num_tarjeta} - {card.nom_tarjeta}
              </Container_Met>
            </Container_Pago>
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
        <Link to="/Realizado">
          <Button
            onClick={(e) => {
              enviarPedidoPago();
              handleAddCard(e);
            }}
          >
            Confirmar tarjeta
          </Button>
        </Link>
      </Form>
      <Pedido>
        <Link to="/Realizado">
          <Button
            onClick={(e) => {
              enviarPedidoPago();
            }}
            disabled={!selectedCardData}
          >
            Hacer Orden
          </Button>
        </Link>
      </Pedido>
    </Container>
  );
};

const DebitCard = ({ pedido }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [registeredCards, setRegisteredCards] = useState([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState(-1);
  const [selectedCardData, setSelectedCardData] = useState(null);

  console.log(pedido[0].totalOrden);

  console.log({ selectedCardIndex });

  const enviarPedidoPago = async () => {
    if (pedido && pedido.length > 0 && pedido[0].idOrden) {
      const promises = pedido.map(async (item) => {
        try {
          const response = await axios.post(
            "http://localhost:3000/nuevo_pago",
            {
              ID_METODO_PAGO: 2,
              ID_ORDEN: 3,
              ID_DESCRIPCION: selectedCardIndex,
              MONTO_TOTAL: item.totalOrden,
            }
          );
          return response.data;
        } catch (error) {
          console.error("Error al enviar la solicitud POST:", error);
          throw error;
        }
      });

      const results = await Promise.all(promises);
      console.log("Respuestas:", results);
    } else {
      console.error("Pedido no válido o sin datos de orden.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const metodo = await axios.get(
          "http://localhost:3000/descripcion_metodo"
        );
        setRegisteredCards(metodo.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddCard = async (e) => {
    e.preventDefault();
    const newCard = {
      id_cliente: 1, // Supongamos que hay un ID de cliente predefinido o puedes obtenerlo de alguna manera
      id_metodo_pago: 2, // Supongamos que el ID del método de pago es 1 (debes obtenerlo de la interfaz)
      num_tarjeta: cardNumber,
      nom_tarjeta: cardName,
      exp_tarjeta: cardExp,
      cvv_tarjeta: cardCVV,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/nuevo_descripcion_metodo",
        newCard
      );
      console.log(response.data); // Muestra la respuesta de la API en la consola
      setRegisteredCards([...registeredCards, newCard]); // Agrega la tarjeta a la lista solo después de que se confirma en la base de datos
      setCardNumber("");
      setCardName("");
      setCardExp("");
      setCardCVV("");
    } catch (error) {
      console.error("Error al agregar la tarjeta:", error);
      // Puedes manejar el error de alguna manera aquí, como mostrar un mensaje al usuario
    }
  };

  const handleSelectMethod = (index) => {
    setSelectedCardIndex(index);
    setSelectedMethod(`card${index}`);
    const selectedCard = registeredCards.find((card, i) => i === index);
    setSelectedCardData(selectedCard);
  };

  return (
    <Container>
      <div>
        {registeredCards
          .filter((card) => card.id_metodo_pago === 2)
          .map((card, index) => (
            <Container_Pago key={index}>
              <Container_Met>
                <input
                  type="radio"
                  value={`card${index}`}
                  checked={selectedMethod === `card${index}`}
                  onChange={() => handleSelectMethod(index)}
                />
                {card.num_tarjeta} - {card.nom_tarjeta}
              </Container_Met>
            </Container_Pago>
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
        <Link to="/Realizado">
          <Button
            onClick={(e) => {
              enviarPedidoPago();
              handleAddCard(e);
            }}
          >
            Confirmar tarjeta
          </Button>
        </Link>
      </Form>
      <Pedido>
        <Link to="/Realizado">
          <Button
            onClick={(e) => {
              enviarPedidoPago();
            }}
            disabled={!selectedCardData}
          >
            Hacer Orden
          </Button>
        </Link>
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
        <h2>3. Realizar el pago en efectivo por {}</h2>
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
