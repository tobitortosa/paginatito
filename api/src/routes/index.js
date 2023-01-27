const { Router } = require("express");
const router = Router();
const clientes = require("./clientes");
const pedidos = require("./pedidos");
const subPedido = require("./subPedidos");
const productos = require("./productos");

router.get("/", async (req, res) => {
  try {
    res.status(200).send("Prueba de ruta");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.use("/", productos);
router.use("/", subPedido);
router.use("/", pedidos);
router.use("/", clientes);

module.exports = router;
