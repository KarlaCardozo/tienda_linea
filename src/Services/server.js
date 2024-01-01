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
    const orden = await pool.query("SELECT * FROM producto");
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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
