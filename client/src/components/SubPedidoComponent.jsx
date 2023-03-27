import s from "./SubPedidoComponent.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getAllClients,
  getAllProducts,
  getAllPedidos,
  editSubPedido,
  createSubPedido,
  getAllSubPedidos,
  deleteSubPedido,
} from "../redux/actions/index";

export default function SubPedidosComponent() {
  const dispatch = useDispatch();

  const { pedidoId } = useParams();
  const allProducts = useSelector((state) => state.allProducts);
  const pedido = useSelector(
    (state) => state.allPedidos.filter((p) => p.id === pedidoId)[0]
  );

  const [input, setInput] = useState({
    idPedido: pedido?.id,
    idProducto: "",
    cantidad: "",
  });

  const [btnState, setBtnState] = useState(false);
  const [editBtnState, setEditBtnState] = useState(false);
  const [editBtnObj, setEditBtnObj] = useState({ a: "a" });

  useEffect(() => {
    dispatch(getAllPedidos());
  }, [btnState, editBtnState, editBtnObj]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditInputChange = (e) => {
    setEditBtnObj({
      ...editBtnObj,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setBtnState(false);
    dispatch(
      createSubPedido({
        ...input,
        total:
          input.cantidad *
          allProducts.filter((p) => p.id === input.idProducto)[0].costs
            .costoFinal,
      })
    );
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setEditBtnState(false);
    dispatch(editSubPedido(editBtnObj));
  };

  console.log(pedido);

  const handleEditBtn = (id) => {
    setEditBtnState(true);
    setEditBtnObj({ ...pedido.subPedidos.filter((p) => p.id === id)[0] });
  };

  const handleDeleteBtn = (id) => {
    setEditBtnObj({});
    dispatch(deleteSubPedido(id));
  };

  return (
    <div className={s.container}>
      <h2>{pedido?.cliente?.redSocial}</h2>
      <div className={s.searchContainer}>
        <button onClick={() => setBtnState(true)} id={s.addBtn}>
          Agregar SubPedido
        </button>
      </div>
      <div className={s.grid}>
        <div className={s.gridTitles}>
          <p>Producto</p>
          <p>Precio</p>
          <p>Cantidad</p>
        </div>
        {pedido?.subPedidos.length
          ? pedido.subPedidos.map((el, index) => {
              return (
                <div key={index} className={s.gridLines}>
                  <p>
                    {allProducts.filter((p) => p.id === el.productoId)[0]?.name}
                  </p>
                  <p>{`$${
                    allProducts.filter((p) => p.id === el.productoId)[0]?.costs
                      ?.costoFinal
                  }`}</p>
                  <p>{el.cantidad}</p>
                  <button id={s.editBtn} onClick={() => handleEditBtn(el.id)}>
                    Editar
                  </button>
                  <button
                    id={s.deleteBtn}
                    onClick={() => handleDeleteBtn(el.id)}
                  >
                    Eliminar
                  </button>
                </div>
              );
            })
          : null}
      </div>
      {btnState && (
        <div className={s.modal}>
          <div className={s.modalContainer}>
            <p onClick={() => setBtnState(false)}>✖</p>
            <form>
              <div className={s.lineForm}>
                <label>Producto</label>
                <select
                  onChange={(e) => handleInputChange(e)}
                  defaultValue="Elegir Producto..."
                  name="idProducto"
                >
                  <option disabled>Elegir Producto...</option>
                  {allProducts.length &&
                    allProducts.map((el, index) => {
                      return (
                        <option key={index} value={el.id}>
                          {el.name}
                        </option>
                      );
                    })}
                </select>
                <label>Cantidad</label>
                <input
                  onChange={(e) => handleInputChange(e, )}
                  type="number"
                  name="cantidad"
                />
              </div>
            </form>
            <button onClick={(e) => handleAdd(e)}>Agregar Sub Pedido</button>
          </div>
        </div>
      )}
      {editBtnState && (
        <div className={s.modal}>
          <div className={s.modalContainer}>
            <p onClick={() => setEditBtnState(false)}>✖</p>
            <form>
              <div className={s.lineForm}>
                <label>Producto</label>
                <select
                  onChange={(e) => handleEditInputChange(e)}
                  defaultValue="Elegir Producto..."
                  name="idProducto"
                  value={
                    allProducts.filter((p) => p.id === editBtnObj.productoId)[0]
                      ?.name || ""
                  }
                >
                  <option disabled>Elegir Producto...</option>
                  {allProducts.length &&
                    allProducts.map((el, index) => {
                      return (
                        <option key={index} value={el.id}>
                          {el.name}
                        </option>
                      );
                    })}
                </select>
                <label>Cantidad</label>
                <input
                  onChange={(e) => handleEditInputChange(e)}
                  type="number"
                  name="cantidad"
                />
              </div>

              {/* <div className={s.lineForm}>
                <label>Producto</label>
                <input
                  onChange={(e) => handleEditInputChange(e)}
                  type="date"
                  name="pedidoDate"
                  value={editBtnObj.pedidoDate || ""}
                />
                <label>Fecha de Entrega</label>
                <input
                  onChange={(e) => handleEditInputChange(e)}
                  type="date"
                  name="entregaDate"
                  value={editBtnObj.entregaDate || ""}
                />
                <label>Seña</label>
                <input
                  onChange={(e) => handleEditInputChange(e)}
                  type="number"
                  name="seña"
                  value={editBtnObj.seña || ""}
                />
              </div> */}
            </form>
            <button onClick={(e) => handleEdit(e)}>Editar Pedido</button>
          </div>
        </div>
      )}
    </div>
  );
}
