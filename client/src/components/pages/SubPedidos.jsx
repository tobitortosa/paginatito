import s from "./SubPedidos.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  deleteProduct,
  editProduct,
  getAllPedidos,
  getAllSubPedidos,
  createSubPedido,
} from "../../redux/actions";

export default function Productos() {
  const dispatch = useDispatch();
  const allSubPedidos = useSelector((state) => state.allSubPedidos);
  const allPedidos = useSelector((state) => state.allPedidos);
  const [modalBtnState, setModalBtnState] = useState(false);
  const [verBtnState, setVerBtnState] = useState(false);
  const [modificarBtnState, setModificarBtnState] = useState(false);
  const [modificarBtnObj, setModificarBtnObj] = useState({});
  const [formInput, setFormInput] = useState({
    idPedido: "",
  });

  console.log(allSubPedidos);
  console.log(allPedidos);

  useEffect(() => {
    dispatch(getAllSubPedidos());
    dispatch(getAllPedidos());
  }, [modalBtnState, verBtnState, modificarBtnState, modificarBtnObj]);

  const handleAdd = (e) => {
    setModalBtnState(false);
  };

  const handleModificarBtn = (id) => {
    setVerBtnState(false);
    setModificarBtnState(true);
    setModificarBtnObj({
      ...allSubPedidos.filter((product) => product.id === id)[0],
    });
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    setVerBtnState(false);
    let productId = allSubPedidos.filter((p) => p.id === id)[0].id;
    dispatch(deleteProduct(productId));
  };

  const handleModificar = (e) => {
    e.preventDefault();
    dispatch(editProduct(modificarBtnObj));
    setModificarBtnState(false);
  };

  const handleFormInputChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleModificarInputChange = (e) => {
    setModificarBtnObj({
      ...modificarBtnObj,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={s.container}>
      <div className={s.grid}>
        <div className={s.gridTitles}>
          <p>Sub Pedidos</p>
        </div>
        {allPedidos.map((el, index) => {
          return (
            <div key={index} className={s.gridLines}>
              <Link id={s.link} to={`/Pedidos/${el.id}`}>
                <button id={s.btn}>{el.cliente?.redSocial}</button>
              </Link>
            </div>
          );
        })}
      </div>
      {modalBtnState && (
        <div className={s.modal}>
          <div className={s.modalContainer}>
            <p onClick={() => setModalBtnState(false)}>✖</p>
            <form>
              <label>Pedido</label>
              <select
                onChange={(e) => handleFormInputChange(e)}
                defaultValue="Elegir Pedido..."
                name="idPedido"
              >
                <option disabled>Elegir Pedido...</option>
                {allPedidos.length &&
                  allPedidos.map((el, index) => {
                    return (
                      <option key={index} value={el.id}>
                        {el.cliente.redSocial}
                      </option>
                    );
                  })}
              </select>
              <button onClick={(e) => handleAdd(e)}>
                Agregar Nuevo SubPedido
              </button>
            </form>
          </div>
        </div>
      )}

      {modificarBtnState && (
        <div className={s.modal}>
          <div className={s.modalContainer}>
            <p onClick={() => setModificarBtnState(false)}>✖</p>
            <div className={s.verContainer}>
              <form>
                <label>Modificar Nombre</label>
                <input
                  onChange={(e) => handleModificarInputChange(e)}
                  type="text"
                  name="name"
                  value={modificarBtnObj.name || ""}
                />
                <label>Modificar Tipo de Producto</label>
                <select
                  defaultValue="Tipo de Producto..."
                  name="type"
                  onChange={(e) => handleModificarInputChange(e)}
                  value={modificarBtnObj.type || ""}
                >
                  <option disabled>Tipo de Producto...</option>
                  <option value="buso">Buso</option>
                  <option value="remera">Remera</option>
                  <option value="chaleco">Chaleco</option>
                  <option value="campera">Campera</option>
                </select>
                <button onClick={(e) => handleModificar(e)}>
                  Modificar Producto
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
