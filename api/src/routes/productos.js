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

  console.log(req.body);

  const newPcosts = await Pcosts.create();
  const newPdetails = await Pdetails.create();

  console.log(newPcosts.dataValues);
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
  const { aumento } = req.body;
  try {
    console.log(aumento);

    const allDetails = await Pdetails.findAll();
    const allPcosts = await Pcosts.findAll();

    allDetails.forEach(async (pd) => {
      console.log(pd["dataValues"]["id"]);

      await Pdetails.update(
        {
          tela: Math.ceil(pd["dataValues"]["tela"] * aumento),
          corte: Math.ceil(pd["dataValues"]["corte"] * aumento),
          costura: Math.ceil(pd["dataValues"]["costura"] * aumento),
          cierreDeCuello: Math.ceil(
            pd["dataValues"]["cierreDeCuello"] * aumento
          ),
          ribsPuñoCuello: Math.ceil(
            pd["dataValues"]["ribsPuñoCuello"] * aumento
          ),
          tancaYCordon: Math.ceil(pd["dataValues"]["tancaYCordon"] * aumento),
          velcro: Math.ceil(pd["dataValues"]["velcro"] * aumento),
          cordonElastico: Math.ceil(
            pd["dataValues"]["cordonElastico"] * aumento
          ),
          hebillasLaterales: Math.ceil(
            pd["dataValues"]["hebillasLaterales"] * aumento
          ),
          cierreLateral: Math.ceil(pd["dataValues"]["cierreLateral"] * aumento),
          bolsa: Math.ceil(pd["dataValues"]["bolsa"] * aumento),
          estampado: Math.ceil(pd["dataValues"]["estampado"] * aumento),
          bordado: Math.ceil(pd["dataValues"]["bordado"] * aumento),
          cintaReflexiva: Math.ceil(
            pd["dataValues"]["cintaReflexiva"] * aumento
          ),
          peliculas: Math.ceil(pd["dataValues"]["peliculas"] * aumento),
        },
        {
          where: {
            id: pd["dataValues"]["id"],
          },
        }
      );
    });

    allPcosts.forEach(async (pc) => {
      console.log(pc["dataValues"]);

      await Pcosts.update(
        {
          costoFinal: parseInt(pc["dataValues"]["costoFinal"] * aumento),
        },
        {
          where: {
            id: pc["dataValues"]["id"],
          },
        }
      );
    });

    res.status(200).send(`Costos Actualizados por ${aumento}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
