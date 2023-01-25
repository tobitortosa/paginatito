const { Router } = require("express");
const router = Router();
const clientes = require("./clientes");

router.get("/", async (req, res) => {
  try {
    res.status(200).send("Prueba de ruta");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.use("/", clientes);

module.exports = router;
