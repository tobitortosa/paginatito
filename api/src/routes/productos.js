const { Router } = require("express");
const router = Router();
const { Pedido, Cliente, SubPedido, Producto } = require("../db");

router.get("/productos", async (req, res) => {
  try {
    const allProducts = await Producto.findAll();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/productos", async (req, res) => {
  try {
    let newProduct = await Producto.create({ ...req.body });
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/productos", async (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  try {
    Producto.update(
      {
        ...req.body,
      },
      { where: { id: id } }
    );
    res.status(200).send(`Producto con el id ${id} modificado correctamente`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/productos/stock", async (req, res) => {
  const { id, stock } = req.body;
  console.log(req.body);
  try {
    Producto.update(
      {
        stock,
      },
      { where: { id: id } }
    );
    res.status(200).send(`Producto con el id ${id} modificado correctamente`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/productos/delete", async (req, res) => {
  const { id } = req.body;
  try {
    Producto.update({ deleted: true }, { where: { id: id } });
    res.status(200).send(`Producto con el id ${id} eliminado correctamente`);
  } catch (error) {
    res.status(400).send("error");
  }
});

module.exports = router;
