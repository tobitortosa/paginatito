const { Router } = require("express");
const router = Router();
const { Pedido, Cliente, SubPedido, Producto } = require("../db");

router.get("/subpedidos", async (req, res) => {
  try {
    const dbSubPedidos = await SubPedido.findAll({
      include: [
        {
          model: Producto,
          attibutes: ["name", "cost"],
        },
      ],
    });
    res.status(200).json(dbSubPedidos);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/subpedidos", async (req, res) => {
  const { idPedido, idProducto, cantidad, total } = req.body;

  console.log(req.body);

  try {
    const nuevoSubPedido = await SubPedido.create({
      productoId: idProducto,
      cantidad,
      total,
    });

    const pedido = await Pedido.findByPk(idPedido);
    await pedido.addSubPedido(nuevoSubPedido);

    res.status(200).json(nuevoSubPedido);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/subpedidos", async (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  try {
    SubPedido.update(
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

router.post("/subpedidos/delete", async (req, res) => {
  const { id } = req.body;
  try {
    SubPedido.destroy({ where: { id: id } });
    res.status(200).send(`SubPedido con el id ${id} eliminado correctamente`);
  } catch (error) {
    res.status(400).send("error");
  }
});

module.exports = router;
