// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/producto", async (req, res) => {
  try {
    const orden = await pool.query("SELECT * FROM PRODUCTO");
    res.json(orden.rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Unable to fetch products" });
  }
});

app.get("/categoria", async (req, res) => {
  try {
    const orden = await pool.query("SELECT * FROM categoria");
    res.json(orden.rows);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Unable to fetch products" });
  }
});


app.get("/ordenes", async (req, res) => {
  try {
    const orden = await pool.query("SELECT o.id_orden, o.fecha_orden, c.id_cliente, c.nombre_cliente, lp.id_linea_prod, lp.id_producto, p.nombre_producto, lp.cantidad, lp.precio_prod, (lp.cantidad*lp.precio_prod) AS Monto FROM orden o JOIN cliente c ON o.id_cliente = c.id_cliente JOIN linea_producto lp ON o.id_orden = lp.id_orden JOIN producto p ON lp.id_producto = p.id_producto ");
    res.json(orden.rows);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Unable to fetch products" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


const enviarOrden = async () => {
  if (clienteId) {
    try {
      const promises = carrito.map(async (item) => {
        const response = await axios.post(
          "http://localhost:3000/enviar_orden",
          {
            id_linea_pedido: item.id_linea_pedido,
            id_mesa: 2,
            id_cliente: clienteId, // Agrega el ID del cliente al pedido
          }
        );
        return response.data;
      });

      const orderResponses = await Promise.all(promises);
      console.log(orderResponses);
      setShowModal(false); // Cerrar el modal después de enviar la orden
    } catch (error) {
      console.error("Error al enviar la orden:", error);
    }
  } else {
    // Mostrar mensaje de error si no se ingresa el ID del cliente
    alert("Por favor, ingresa tu ID de cliente");
  }
};