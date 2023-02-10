const { Router } = require("express");
const router = Router();
const { Pedido, Cliente, SubPedido, Producto } = require("../db");

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

router.put("/pedidos", async (req, res) => {
  const { id } = req.body;
  try {
    Pedido.update(
      {
        ...req.body,
      },
      { where: { id: id } }
    );
    res.status(200).send(`Pedido con el id ${id} modificado correctamente`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/pedidos/delete", async (req, res) => {
  const { id } = req.body;
  try {
    Pedido.destroy({ where: { id: id } });
    res.status(200).send(`Pedido con el id ${id} eliminado correctamente`);
  } catch (error) {
    res.status(400).send("error");
  }
});

module.exports = router;
