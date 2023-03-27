const { Router } = require("express");
const router = Router();
const { AporteYGasto } = require("../db");

router.get("/aporteYGasto", async (req, res) => {
  try {
    const allAporteYGasto = await AporteYGasto.findAll();
    res.status(200).json(allAporteYGasto);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/aporteYGasto", async (req, res) => {
  try {
    let newAporteYGasto = await AporteYGasto.create({ ...req.body });
    res.status(200).json(newAporteYGasto);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/aporteYGasto", async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    AporteYGasto.update(
      {
        deleted: true,
      },
      { where: { id: id } }
    );
    res.status(200).send(`Producto con el id ${id} modificado correctamente`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/aporteYGasto/delete", async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    AporteYGasto.update({ deleted: true }, { where: { id: id } });
    res.status(200).send(`Producto con el id ${id} eliminado correctamente`);
  } catch (error) {
    res.status(400).send("error");
  }
});

module.exports = router;
