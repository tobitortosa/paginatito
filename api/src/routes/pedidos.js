const { Router } = require("express");
const router = Router();
const { Pedido, Cliente, SubPedido } = require("../db");

router.get("/pedidos", async (req, res) => {
  try {
    const dbPedidos = await Pedido.findAll({
      include: [
        {
          model: Cliente,
          attributes: ["redSocial", "direccion", "localidad", "tel1"],
        },
        {
          model: SubPedido,
          attributes: ["total"],
        },
      ],
    });
    res.status(200).json(dbPedidos);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/pedidos", async (req, res) => {
  const { idCliente, pedidoDate, entregaDate, seña, entrego } = req.body;
  if (!idCliente) {
    return res.status(400).send("Parametros insuficientes");
  }

  try {
    const nuevoPedido = await Pedido.create({
      pedidoDate,
      entregaDate,
      seña,
      entrego,
    });

    const cliente = await Cliente.findByPk(idCliente);

    await cliente.addPedido(nuevoPedido);

    res.status(200).send(nuevoPedido);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
