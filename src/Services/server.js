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

app.post("/nueva_orden", async (req, res) => {
  try {
    const { ID_CLIENTE, FECHA_ORDEN } = req.body;

    if (!ID_CLIENTE) {
      return res.status(400).json({ error: "ID_CLIENTE es requerido" });
    }

    const result = await pool.query(
      "INSERT INTO ORDEN (ID_CLIENTE, FECHA_ORDEN) VALUES ($1, CURRENT_DATE) RETURNING *",
      [ID_CLIENTE]
    );

    const nuevaOrden = result.rows[0]; // Obtenemos la nueva orden agregada

    res
      .status(200)
      .json({ message: "Orden agregada correctamente", nuevaOrden });
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

    res.status(200).json({
      message: "Datos de la línea de producto agregados correctamente",
    });
  } catch (error) {
    console.error("Error al agregar datos de la línea de producto:", error);
    res.status(500).json({
      error: "No se pudieron agregar los datos de la línea de producto",
    });
  }
});

app.post("/nuevo_descripcion_metodo", async (req, res) => {
  try {
    const {
      id_cliente,
      id_metodo_pago,
      num_tarjeta,
      nom_tarjeta,
      exp_tarjeta,
      cvv_tarjeta,
      referencia_tienda,
      cuenta_pasarela,
      cuenta_deposito,
    } = req.body; // Obtén los datos del cuerpo de la solicitud

    const result = await pool.query(
      `INSERT INTO descripcion_metodo 
      (id_cliente, id_metodo_pago, num_tarjeta, nom_tarjeta, exp_tarjeta, cvv_tarjeta, referencia_tienda, cuenta_pasarela, cuenta_deposito)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        id_cliente,
        id_metodo_pago,
        num_tarjeta,
        nom_tarjeta,
        exp_tarjeta,
        cvv_tarjeta,
        referencia_tienda,
        cuenta_pasarela,
        cuenta_deposito,
      ]
    );

    res
      .status(200)
      .json({ message: "Datos de método de pago agregados correctamente" });
  } catch (error) {
    console.error("Error al agregar datos de método de pago:", error);
    res
      .status(500)
      .json({ error: "No se pudieron agregar los datos de método de pago" });
  }
});

app.post("/nuevo_pago", async (req, res) => {
  try {
    const {
      ID_METODO_PAGO,
      ID_ORDEN,
      ID_DESCRIPCION,
      MONTO_TOTAL,
    } = req.body;

    const result = await pool.query(
      "INSERT INTO LINEA_PRODUCTO (ID_METODO_PAGO, ID_ORDEN, ID_DESCRIPCION, FECHA_PAGO, MONTO_TOTAL) VALUES ($1, $2, $3, CURRENT_DATE, $5)",
      [ID_METODO_PAGO, ID_ORDEN, ID_DESCRIPCION, MONTO_TOTAL]
    );

    res.status(200).json({
      message: "Datos del pago de producto agregados correctamente",
    });
  } catch (error) {
    console.error("Error al agregar los datos del pago de la orden:", error);
    res.status(500).json({
      error: "No se pudieron agregar los datos del pago de la orden",
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
