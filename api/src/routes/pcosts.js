const { Router } = require("express");
const router = Router();
const {
  Pedido,
  Cliente,
  SubPedido,
  Producto,
  Pdetails,
  Pcosts,
} = require("../db");

router.get("/pcosts", async (req, res) => {
  try {
    const allPcosts = await Pcosts.findAll();
    res.status(200).json(allPcosts);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/pcosts", async (req, res) => {
  const { id, costoFinal } = req.body;

  try {
    await Pcosts.update(
      {
        ...req.body,
        costoFinal: costoFinal,
      },
      { where: { id: id } }
    );
    res.status(200).send(`Costos con el id ${id} modificado correctamente`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/pcosts/delete", async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    await Pcosts.destroy({ where: { id: id } });
    res.status(200).send(`pcosts con el id: ${id} eliminado correctamente`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
