const { Router } = require("express");
const router = Router();
const { Pedido, Cliente, SubPedido, Producto, Pdetails } = require("../db");

router.get("/pdetails", async (req, res) => {
  try {
    const allPdetails = await Pdetails.findAll();
    res.status(200).json(allPdetails);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/pdetails", async (req, res) => {
  const { id } = req.body;
  try {
    await Pdetails.update(
      {
        ...req.body,
      },
      { where: { id: id } }
    );
    res.status(200).send(`Detalles con el id ${id} modificado correctamente`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/pdetails/delete", async (req, res) => {
  const { id } = req.body;
  try {
    await Pdetails.destroy({ where: { id: id } });
    res.status(200).send(`pdetails con el id: ${id} eliminado correctamente`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
