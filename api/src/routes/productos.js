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

router.get("/productos", async (req, res) => {
  try {
    // const allProducts = await Producto.findAll({
    //   include: [{ model: Pdetails }, { model: Pcosts }],
    // });

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

  const newPcosts = await Pcosts.create();
  const newPdetails = await Pdetails.create();

  try {
    if (req.body.type === "pantalon" || req.body.type === "camisa") {
      for (let i = 0; i < colores.length; i++) {
        for (let j = 0; j < tallesPantalonCamisa.length; j++) {
          await Producto.create({
            ...req.body,
            color: colores[i],
            talle: tallesPantalonCamisa[j],
            pcostId: newPcosts.dataValues.id,
            pdetailId: newPdetails.dataValues.id,
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
            pcostId: newPcosts.dataValues.id,
            pdetailId: newPdetails.dataValues.id,
          });
        }
      }
    }
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
  const { aumento, type } = req.body;

  let aumentoFinal;

  if (type === "aumento" && aumento.toString().length == 1) {
    aumentoFinal = parseFloat(`1.0${aumento.toString()}`);
  }

  if (type === "aumento" && aumento.toString().length == 2) {
    aumentoFinal = parseFloat(`1.${aumento.toString()}`);
  }
  if (type === "descuento" && aumento.toString().length == 1) {
    aumentoFinal = parseFloat(`0.0${aumento.toString()}`);
  }

  if (type === "descuento" && aumento.toString().length == 2) {
    aumentoFinal = parseFloat(`0.${aumento.toString()}`);
  }

  try {
    const allDetails = await Pdetails.findAll();
    const allPcosts = await Pcosts.findAll();

    allDetails.forEach(async (pd) => {
      await Pdetails.update(
        {
          tela: Math.ceil(pd["dataValues"]["tela"] * aumentoFinal),
          corte: Math.ceil(pd["dataValues"]["corte"] * aumentoFinal),
          costura: Math.ceil(pd["dataValues"]["costura"] * aumentoFinal),
          cierreDeCuello: Math.ceil(
            pd["dataValues"]["cierreDeCuello"] * aumentoFinal
          ),
          ribsPuñoCuello: Math.ceil(
            pd["dataValues"]["ribsPuñoCuello"] * aumentoFinal
          ),
          tancaYCordon: Math.ceil(
            pd["dataValues"]["tancaYCordon"] * aumentoFinal
          ),
          velcro: Math.ceil(pd["dataValues"]["velcro"] * aumentoFinal),
          cordonElastico: Math.ceil(
            pd["dataValues"]["cordonElastico"] * aumentoFinal
          ),
          hebillasLaterales: Math.ceil(
            pd["dataValues"]["hebillasLaterales"] * aumentoFinal
          ),
          cierreLateral: Math.ceil(
            pd["dataValues"]["cierreLateral"] * aumentoFinal
          ),
          bolsa: Math.ceil(pd["dataValues"]["bolsa"] * aumentoFinal),
          estampado: Math.ceil(pd["dataValues"]["estampado"] * aumentoFinal),
          bordado: Math.ceil(pd["dataValues"]["bordado"] * aumentoFinal),
          cintaReflexiva: Math.ceil(
            pd["dataValues"]["cintaReflexiva"] * aumentoFinal
          ),
          peliculas: Math.ceil(pd["dataValues"]["peliculas"] * aumentoFinal),
        },
        {
          where: {
            id: pd["dataValues"]["id"],
          },
        }
      );
    });

    allPcosts.forEach(async (pc) => {
      await Pcosts.update(
        {
          costoFinal: parseInt(pc["dataValues"]["costoFinal"] * aumentoFinal),
        },
        {
          where: {
            id: pc["dataValues"]["id"],
          },
        }
      );
    });

    res.status(200).send(`Costos Actualizados por ${aumentoFinal}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
