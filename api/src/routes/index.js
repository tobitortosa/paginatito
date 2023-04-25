const { Router } = require("express");
const router = Router();
const clientes = require("./clientes");
const pedidos = require("./pedidos");
const subPedido = require("./subPedidos");
const productos = require("./productos");
const login = require("./login");
const aporteYGasto = require("./aporteYGasto");
const pdetails = require("./pdetails");
const pcosts = require("./pcosts");

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
router.use("/", login);
router.use("/", aporteYGasto);
router.use("/", pdetails);
router.use("/", pcosts);

module.exports = router;
