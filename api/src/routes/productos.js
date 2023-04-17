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

  // let details = {
  //   tela: "0",
  //   corte: "0",
  //   costura: "0",
  //   cierreDeCuello: "0",
  //   ribsPuñoCuello: "0",
  //   tancaYCordon: "0",
  //   velcro: "0",
  //   cordonElastico: "0",
  //   hebillasLaterales: "0",
  //   cierreLateral: "0",
  //   bolsa: "0",
  //   estampado: "0",
  //   bordado: "0",
  //   cintaReflexiva: "0",
  //   peliculas: "0",
  // };

  // let costs = {
  //   kilosComprados: "0",
  //   kilosXPrenda: "0",
  //   precioXKiloFinal: "0",
  // };

  try {
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
            details: details,
            costs: costs,
          });
        }
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/productos", async (req, res) => {
  const { details, costs, name } = req.body;

  try {
    let total = Object.keys(details).reduce((acc, el) => {
      return parseFloat(details[`${el}`]) + acc;
    }, 0);

    let costoFinal = Math.ceil(
      (total * 1.21 * costs?.porcentajeDeBeneficio) / 100 + total * 1.21
    );

    let allProducts = await Producto.findAll();

    allProducts
      .filter((p) => p.name === name)
      .forEach(async (el) => {
        await Producto.update(
          {
            details: details,
            costs: {
              ...costs,
              costoFinal: costoFinal,
            },
          },
          { where: { id: el.id } }
        );
      });

    res
      .status(200)
      .send(`Producto con nombre ${name} modificado correctamente`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/productos/stock", async (req, res) => {
  const { id, stock } = req.body;
  try {
    await Producto.update(
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
    res.status(200).send(`Producto ${name} eliminado correctamente`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/productos/aumento", async (req, res) => {
  const { aumento } = req.body;
  try {
    let allProducts = await Producto.findAll();
    let obj = {};

    allProducts.forEach(async (el) => {
      Object.keys(el.details).forEach((key) => {
        obj[key] = String(parseFloat(el.details[key]) * aumento);
      });
      await Producto.update(
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
