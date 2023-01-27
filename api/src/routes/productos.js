const { Router } = require("express");
const router = Router();
const { Producto } = require("../db");

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

module.exports = router;
