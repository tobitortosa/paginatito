import s from "./Pedidos.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllClients,
  createPedido,
  getAllPedidos,
  editPedido,
  deletePedido
} from "../../redux/actions";

export default function Pedidos() {
  const dispatch = useDispatch();

  const allPedidos = useSelector((state) => state.allPedidos);
  const allClients = useSelector((state) => state.allClients);

  console.log(allPedidos);
  // console.log(allClients);

  const [searchBarInput, setSearchBarInput] = useState("");
  const handleClientSearchInput = (e) => {
    setSearchBarInput(e.target.value);
  };

  const [input, setInput] = useState({
    idCliente: "",
    pedidoDate: "",
    entregaDate: "",
    seña: "",
    entrego: false,
  });

  const [btnState, setBtnState] = useState(false);
  const [btnLineState, setBtnLineState] = useState(false);
  const [editBtnState, setEditBtnState] = useState(false);
  const [editBtnObj, setEditBtnObj] = useState({});

  useEffect(() => {
    dispatch(getAllPedidos());
    dispatch(getAllClients());
  }, [btnState, editBtnState, editBtnObj]);

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
    dispatch(createPedido(input));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setEditBtnState(false);
    dispatch(editPedido(editBtnObj));
  };

  const handleEditBtn = (id) => {
    setEditBtnState(true);
    setEditBtnObj({ ...allPedidos.filter((client) => client.id === id)[0] });
  };

  const handleDeleteBtn = (id) => {
    dispatch(deletePedido(id));
  };

  const handleEntrego = (el, entrego) => {
    console.log(entrego);
    dispatch(
      editPedido({
        ...el,
        entrego: !entrego,
      })
    );
  };

  return (
    <div className={s.container}>
      <div className={s.searchContainer}>
        <div className={s.sbar}>
          <input type="text" onChange={(e) => handleClientSearchInput(e)} />
          <button>Buscar Pedido</button>
        </div>
        <button onClick={() => setBtnState(true)} id={s.addBtn}>
          Agregar Nuevo Pedido
        </button>
      </div>
      <div className={s.grid}>
        <div className={s.gridTitles}>
          <p>Cliente</p>
          <p>Productos</p>
          <p>Fecha de Pedido</p>
          <p>Fecha de Entrega</p>
          <p>Direccion</p>
          <p>Localidad</p>
          <p>Tel</p>
          <p>Total</p>
          <p>Seña</p>
          <p>Total sin Seña</p>
          <p>Entrego</p>
        </div>
        {allPedidos.length
          ? allPedidos.map((el, index) => {
              return (
                <div key={index} className={s.gridLines}>
                  <p>{el.cliente?.redSocial || "-"}</p>
                  <Link to={`/Pedidos/${el.id}`}>
                    <p>Ver Productos</p>
                  </Link>
                  <p>{el.pedidoDate}</p>
                  <p>{el.entregaDate || "-"}</p>
                  <p>{el.cliente?.direccion || "-"}</p>
                  <p>{el.cliente?.localidad || "-"}</p>
                  <p>{el.cliente?.tel1 || "-"}</p>
                  <p>
                    {`$${el.subPedidos.reduce((acc, el) => {
                      return el.total * el.cantidad + acc;
                    }, 0)}` || "-"}
                  </p>
                  <p>{`$${el.seña}` || "-"}</p>
                  <p>
                    {el.subPedidos.length
                      ? `$${
                          el.subPedidos.reduce((acc, el) => {
                            return el.total * el.cantidad + acc;
                          }, 0) - el.seña
                        }`
                      : "-"}
                  </p>
                  <button
                    id={el.entrego ? s.entrego : s.noEntrego}
                    onClick={() => handleEntrego(el, el.entrego)}
                  ></button>
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
      {btnLineState && (
        <div className={s.lineModal}>
          <div className={s.text}>
            <p onClick={() => setBtnLineState(false)}>✖</p>
          </div>
        </div>
      )}
      {btnState && (
        <div className={s.modal}>
          <div className={s.modalContainer}>
            <p onClick={() => setBtnState(false)}>✖</p>
            <form>
              <div className={s.lineForm}>
                <label>Cliente</label>
                <select
                  onChange={(e) => handleInputChange(e)}
                  defaultValue="Elegir Cliente..."
                  name="idCliente"
                >
                  <option disabled>Elegir Cliente...</option>
                  {allClients.length &&
                    allClients.map((el, index) => {
                      return (
                        <option key={index} value={el.id}>
                          {el.redSocial}
                        </option>
                      );
                    })}
                </select>
                <label>Fecha de Pedido</label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  type="date"
                  name="pedidoDate"
                />
                <label>Fecha de Entrega</label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  type="date"
                  name="entregaDate"
                />
                <label>Seña</label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  type="number"
                  name="seña"
                />
              </div>
            </form>
            <button onClick={(e) => handleAdd(e)}>Agregar Pedido</button>
          </div>
        </div>
      )}
      {editBtnState && (
        <div className={s.modal}>
          <div className={s.modalContainer}>
            <p onClick={() => setEditBtnState(false)}>✖</p>
            <form>
              <div className={s.lineForm}>
                <label>Fecha de Pedido</label>
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
              </div>
            </form>
            <button onClick={(e) => handleEdit(e)}>Editar Pedido</button>
          </div>
        </div>
      )}
    </div>
  );
}
