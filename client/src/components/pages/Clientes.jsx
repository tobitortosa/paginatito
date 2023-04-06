import s from "./Clientes.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import {
  getAllClients,
  createNewClient,
  editClient,
  deleteClient,
} from "../../redux/actions";

export default function Clientes() {
  const dispatch = useDispatch();

  const allClients = useSelector((state) =>
    state.allClients
      .filter((c) => !c.deleted)
      .sort((a, b) => a.redSocial.localeCompare(b.redSocial))
  );

  const [searchBarInput, setSearchBarInput] = useState("");
  const handleClientSearchInput = (e) => {
    setSearchBarInput(e.target.value);
  };

  const [input, setInput] = useState({
    name: "",
    lastName: "",
    redSocial: "",
    rubro: "",
    direccion: "",
    ndireccion: "",
    localidad: "",
    cp: "",
    provincia: "",
    tel1: "",
    tel2: "",
    celular: "",
    fax: "",
    paginaWeb: "",
    email: "",
    observaciones: "",
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

  const handleEditInputChange = (e) => {
    setEditBtnObj({
      ...editBtnObj,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setBtnState(false);
    dispatch(createNewClient(input));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setEditBtnState(false);
    dispatch(editClient(editBtnObj));
  };

  const handleEditBtn = (id) => {
    setEditBtnState(true);
    setEditBtnObj({ ...allClients.filter((client) => client.id === id)[0] });
  };

  const handleDeleteBtn = (id) => {
    dispatch(deleteClient(id));
  };

  useEffect(() => {
    dispatch(getAllClients());
  }, [editBtnState, btnState, btnLineState, editBtnObj]);

  return (
    <div className={s.container}>
      <div className={s.searchContainer}>
        <div className={s.sbar}>
          <input type="text" onChange={(e) => handleClientSearchInput(e)} />
          <button>Buscar Cliente</button>
        </div>
        <button onClick={() => setBtnState(true)} id={s.addBtn}>
          Agregar Cliente
        </button>
      </div>
      <div className={s.grid}>
        <div className={s.gridTitles}>
          <p>Red Social</p>
          <p>Nombre</p>
          <p>Apellido</p>
          <p>Email</p>
          <p>Rubro</p>
          <p>Cargo</p>
          <p>Direccion</p>
          <p>N°</p>
          <p>Localidad</p>
          <p>CP</p>
          <p>Provincia</p>
          <p>Tel1</p>
          <p>Tel2</p>
          <p>Celular</p>
          <p>Fax</p>
          <p>Pagina Web</p>
          <p id={s.objTitle}>Observaciones</p>
        </div>
        {searchBarInput.length === 0 ? (
          allClients.length ? (
            allClients.map((el, index) => {
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
                    <a
                      href={`https://${el.paginaWeb.toLowerCase()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {el.paginaWeb.toLowerCase() || "-"}
                    </a>
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
            })
          ) : (
            <Loader />
          )
        ) : (
          allClients
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
            })
        )}
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
                <label>Nombre</label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  type="text"
                  name="name"
                />
                <label>Apellido</label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  type="text"
                  name="lastName"
                />
                <label>Email</label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  type="text"
                  name="email"
                />
                <label>Rubro</label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  type="text"
                  name="rubro"
                />
                <label>Cargo</label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  type="text"
                  name="cargo"
                />

                <label>Red Social</label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  type="text"
                  name="redSocial"
                />

                <label>Direccion</label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  type="text"
                  name="direccion"
                />

                <label>N°</label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  type="number"
                  name="ndireccion"
                />
                <label>Localidad</label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  type="text"
                  name="localidad"
                />
              </div>
              <div className={s.lineForm}>
                <label>CP</label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  type="number"
                  name="cp"
                />
                <label>Provincia</label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  type="text"
                  name="provincia"
                />
                <label>Tel1</label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  type="text"
                  name="tel1"
                />
                <label>Tel2</label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  type="text"
                  name="tel2"
                />
                <label>Celular</label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  type="text"
                  name="celular"
                />

                <label>Fax</label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  type="text"
                  name="fax"
                />
                <label>Pagina Web</label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  type="text"
                  name="paginaWeb"
                />

                <label>Observaciones</label>
                <textarea
                  onChange={(e) => handleInputChange(e)}
                  name="observaciones"
                ></textarea>
              </div>
            </form>
            <button onClick={(e) => handleAdd(e)}>Agregar Cliente</button>
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
