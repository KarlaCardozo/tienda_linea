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
    const orden = await pool.query(
      "SELECT o.id_orden, o.fecha_orden, c.id_cliente, c.nombre_cliente, lp.id_linea_prod, lp.id_producto, p.nombre_producto, lp.cantidad, lp.precio_prod, (lp.cantidad*lp.precio_prod) AS Monto FROM orden o JOIN cliente c ON o.id_cliente = c.id_cliente JOIN linea_producto lp ON o.id_orden = lp.id_orden JOIN producto p ON lp.id_producto = p.id_producto "
    );
    res.json(orden.rows);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Unable to fetch products" });
  }
});

app.get("/metodo-pago", async (req, res) => {
  try {
    const metodo = await pool.query("SELECT * FROM metodo_pago");
    res.json(metodo.rows);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Unable to fetch products" });
  }
});

app.get("/descripcion_metodo", async (req, res) => {
  try {
    const metodo = await pool.query("SELECT * FROM descripcion_metodo");
    res.json(metodo.rows);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Unable to fetch products" });
  }
});

app.post("/nuevo_descripcion_metodo", async (req, res) => {
  try {
    // Suponiendo que los datos que deseas agregar están en el cuerpo de la solicitud (req.body)
    const { nuevoDato1, nuevoDato2 } = req.body; // Desestructura los datos que llegan en la solicitud

    // Realiza una consulta para insertar los datos en la base de datos
    const result = await pool.query(
      "INSERT INTO descripcion_metodo (columna1, columna2, ...) VALUES ($1, $2, ...)",
      [nuevoDato1, nuevoDato2] // Los valores a insertar en la base de datos
    );

    res.status(200).json({ message: "Datos agregados correctamente" });
  } catch (error) {
    console.error("Error al agregar datos:", error);
    res.status(500).json({ error: "No se pudieron agregar los datos" });
  }
});

app.post("/nueva_orden", async (req, res) => {
  try {
    const { ID_CLIENTE, FECHA_ORDEN } = req.body;

    if (!ID_CLIENTE) {
      return res.status(400).json({ error: "ID_CLIENTE es requerido" });
    }

    const result = await pool.query(
      "INSERT INTO ORDEN (ID_CLIENTE, FECHA_ORDEN) VALUES ($1,CURRENT_DATE )",
      [ID_CLIENTE]
    );

    res.status(200).json({ message: "Orden agregada correctamente" });
  } catch (error) {
    console.error("Error al agregar orden:", error);
    res.status(500).json({ error: "No se pudo agregar la orden" });
  }
});

app.post("/nuevo_linea_producto", async (req, res) => {
  try {
    const {
      ID_PRODUCTO,
      ID_ORDEN,
      CANTIDAD,
      PRECIO_PROD,
      DESCUENTO_LINEA,
      MONTO,
    } = req.body;

    const result = await pool.query(
      "INSERT INTO LINEA_PRODUCTO (ID_PRODUCTO, ID_ORDEN, CANTIDAD, PRECIO_PROD, DESCUENTO_LINEA, MONTO) VALUES ($1, $2, $3, $4, $5, $6)",
      [ID_PRODUCTO, ID_ORDEN, CANTIDAD, PRECIO_PROD, DESCUENTO_LINEA, MONTO]
    );

    res
      .status(200)
      .json({
        message: "Datos de la línea de producto agregados correctamente",
      });
  } catch (error) {
    console.error("Error al agregar datos de la línea de producto:", error);
    res
      .status(500)
      .json({
        error: "No se pudieron agregar los datos de la línea de producto",
      });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
