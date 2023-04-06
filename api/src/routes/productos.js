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
  // let colores = ["blanco"];
  let colores = ["blanco", "negro", "gris", "azul marino", "otro"];
  // let talles = ["xs", "s"];
  let talles = ["xs", "s", "m", "l", "xl", "xxl", "xxxl"];
  let tallesPantalonCamisa = [
    "36",
    "38",
    "40",
    "42",
    "44",
    "46",
    "48",
    "50",
    "52",
    "54",
    "56",
    "58",
    "60",
  ];

  try {
    console.log(req.body);
    if (req.body.type === "pantalon" || req.body.type === "camisa") {
      for (let i = 0; i < colores.length; i++) {
        for (let j = 0; j < tallesPantalonCamisa.length; j++) {
          await Producto.create({
            ...req.body,
            color: colores[i],
            talle: tallesPantalonCamisa[j],
          });
        }
      }
    } else {
      for (let i = 0; i < colores.length; i++) {
        for (let j = 0; j < talles.length; j++) {
          await Producto.create({
            ...req.body,
            color: colores[i],
            talle: talles[j],
          });
        }
      }
    }
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
  const { name } = req.body;
  try {
    Producto.destroy({ where: { name: name } });
    res.status(200).send(`Producto con el id ${id} eliminado correctamente`);
  } catch (error) {
    res.status(400).send("error");
  }
});

router.put("/productos/aumento", async (req, res) => {
  const { aumento } = req.body;
  try {
    let allProducts = await Producto.findAll();
    let obj = {};

    allProducts.forEach((el) => {
      Object.keys(el.details).forEach((key) => {
        obj[key] = String(parseFloat(el.details[key]) * aumento);
      });
      Producto.update(
        {
          details: obj,
        },
        { where: { id: el.id } }
      );
    });
    res.status(200).send(`Costos Actualizados por ${aumento}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
