import s from "./Clientes.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllClients,
  createNewClient,
  editClient,
  deleteClient,
  createPedido,
  getAllPedidos,
} from "../../redux/actions";

export default function Pedidos() {
  const dispatch = useDispatch();

  const allPedidos = useSelector((state) => state.allPedidos);
  const allClients = useSelector((state) => state.allClients);

  console.log(allPedidos);
  // console.log(allClients);

  useEffect(() => {
    dispatch(getAllPedidos());
    dispatch(getAllClients());
  }, []);

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

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  console.log(input);

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
    dispatch(editClient(editBtnObj));
  };

  const handleEditBtn = (id) => {
    setEditBtnState(true);
    setEditBtnObj({ ...allPedidos.filter((client) => client.id === id)[0] });
  };

  const handleDeleteBtn = (id) => {
    dispatch(deleteClient(id));
    console.log(id);
  };

  const handleEntrego = () => {

  }

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
        {searchBarInput.length === 0
          ? allPedidos.map((el, index) => {
              return (
                <div key={index} className={s.gridLines}>
                  <p>{el.cliente.redSocial || "-"}</p>
                  <p>{el.pedidoDate}</p>
                  <p>{el.entregaDate || "-"}</p>
                  <p>{el.cliente.direccion || "-"}</p>
                  <p>{el.cliente.localidad || "-"}</p>
                  <p>{el.cliente.tel1 || "-"}</p>
                  <p>{el.subPedidos.total || "-"}</p>
                  <p>{el.seña || "-"}</p>
                  <p>{el.subPedidos.total - el.seña || "-"}</p>
                  <button onClick={() =>  handleEntrego(el.entrego)}>{el.entrego ? "entrego" : "no entrego"}</button>
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
          : allPedidos
              .filter((client) =>
                client.redSocial
                  .toLowerCase()
                  .includes(searchBarInput.toLowerCase())
              )
              .map((el, index) => {
                return (
                  <div key={index} className={s.gridLines}>
                    <p>{el.redSocial || "-"}</p>
                    <p>{el.name}</p>
                    <p>{el.lastName || "-"}</p>
                    <p>{el.email || "-"}</p>
                    <p>{el.rubro || "-"}</p>
                    <p>{el.cargo || "-"}</p>
                    <p>{el.direccion || "-"}</p>
                    <p>{el.ndireccion || "-"}</p>
                    <p>{el.localidad || "-"}</p>
                    <p>{el.cp || "-"}</p>
                    <p>{el.provincia || "-"}</p>
                    <p>{el.tel1 || "-"}</p>
                    <p>{el.tel2 || "-"}</p>
                    <p>{el.celular || "-"}</p>
                    <p>{el.fax || "-"}</p>
                    <p>
                      <a href={el.paginaWeb}>{el.paginaWeb || "-"}</a>
                    </p>
                    <p id={s.obs}>{el.observaciones || "-"}</p>
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
              })}
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
                <label>Nombre</label>
                <input
                  onChange={(e) => handleEditInputChange(e)}
                  type="text"
                  name="name"
                  value={editBtnObj.name || ""}
                />
                <label>Apellido</label>
                <input
                  onChange={(e) => handleEditInputChange(e)}
                  type="text"
                  name="lastName"
                  value={editBtnObj.lastName || ""}
                />
                <label>Email</label>
                <input
                  onChange={(e) => handleEditInputChange(e)}
                  type="text"
                  name="email"
                  value={editBtnObj.email || ""}
                />
                <label>Rubro</label>
                <input
                  onChange={(e) => handleEditInputChange(e)}
                  type="text"
                  name="rubro"
                  value={editBtnObj.rubro || ""}
                />
                <label>Cargo</label>
                <input
                  onChange={(e) => handleEditInputChange(e)}
                  type="text"
                  name="cargo"
                  value={editBtnObj.cargo || ""}
                />

                <label>Red Social</label>
                <input
                  onChange={(e) => handleEditInputChange(e)}
                  type="text"
                  name="redSocial"
                  value={editBtnObj.redSocial || ""}
                />

                <label>Direccion</label>
                <input
                  onChange={(e) => handleEditInputChange(e)}
                  type="text"
                  name="direccion"
                  value={editBtnObj.direccion || ""}
                />

                <label>N°</label>
                <input
                  onChange={(e) => handleEditInputChange(e)}
                  type="number"
                  name="ndireccion"
                  value={editBtnObj.ndireccion || ""}
                />
                <label>Localidad</label>
                <input
                  onChange={(e) => handleEditInputChange(e)}
                  type="text"
                  name="localidad"
                  value={editBtnObj.localidad || ""}
                />
              </div>
              <div className={s.lineForm}>
                <label>CP</label>
                <input
                  onChange={(e) => handleEditInputChange(e)}
                  type="number"
                  name="cp"
                  value={editBtnObj.cp || ""}
                />
                <label>Provincia</label>
                <input
                  onChange={(e) => handleEditInputChange(e)}
                  type="text"
                  name="provincia"
                  value={editBtnObj.provincia || ""}
                />
                <label>Tel1</label>
                <input
                  onChange={(e) => handleEditInputChange(e)}
                  type="text"
                  name="tel1"
                  value={editBtnObj.tel1 || ""}
                />
                <label>Tel2</label>
                <input
                  onChange={(e) => handleEditInputChange(e)}
                  type="text"
                  name="tel2"
                  value={editBtnObj.tel2 || ""}
                />
                <label>Celular</label>
                <input
                  onChange={(e) => handleEditInputChange(e)}
                  type="text"
                  name="celular"
                  value={editBtnObj.celular || ""}
                />

                <label>Fax</label>
                <input
                  onChange={(e) => handleEditInputChange(e)}
                  type="text"
                  name="fax"
                  value={editBtnObj.fax || ""}
                />
                <label>Pagina Web</label>
                <input
                  onChange={(e) => handleEditInputChange(e)}
                  type="text"
                  name="paginaWeb"
                  value={editBtnObj.paginaWeb || ""}
                />

                <label>Observaciones</label>
                <textarea
                  onChange={(e) => handleEditInputChange(e)}
                  name="observaciones"
                  value={editBtnObj.observaciones || ""}
                ></textarea>
              </div>
            </form>
            <button onClick={(e) => handleEdit(e)}>Editar Cliente</button>
          </div>
        </div>
      )}
    </div>
  );
}
