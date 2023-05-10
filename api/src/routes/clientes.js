const { Router } = require("express");
const router = Router();
const { Cliente } = require("../db");

router.get("/clientes", async (req, res) => {
  try {
    const dbClients = await Cliente.findAll();
    res.status(200).json(dbClients);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/clientes", async (req, res) => {
  try {
    let newClient = await Cliente.create({ ...req.body });
    res.status(200).json(newClient);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/clientes", async (req, res) => {
  const { id } = req.body;
  try {
    Cliente.update(
      {
        ...req.body,
      },
      { where: { id: id } }
    );
    res.status(200).send(`Cliente con el id ${id} modificado correctamente`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/clientes/delete", async (req, res) => {
  const { id } = req.body;
  try {
    Cliente.update(
      {
        deleted: true,
      },
      { where: { id: id } }
    );
    res.status(200).send(`Cliente con el id ${id} eliminado correctamente`);
  } catch (error) {
    res.status(400).send("error");
  }
});

module.exports = router;
