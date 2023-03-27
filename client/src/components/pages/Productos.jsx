import s from "./Productos.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  createNewProduct,
  deleteProduct,
  editProduct,
} from "../../redux/actions";
import Loader from "../Loader";

export default function Productos() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts.filter((c) => !c.deleted));
  const [modalBtnState, setModalBtnState] = useState(false);
  const [verBtnState, setVerBtnState] = useState(false);
  const [modificarBtnState, setModificarBtnState] = useState(false);
  const [modificarBtnObj, setModificarBtnObj] = useState({});
  const [formInput, setFormInput] = useState({
    name: "",
    type: "",
  });

  useEffect(() => {
    dispatch(getAllProducts());
  }, [modalBtnState, verBtnState, modificarBtnState, modificarBtnObj]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (formInput.name.length) {
      e.preventDefault();
      setModalBtnState(false);
      dispatch(createNewProduct(formInput));
    }
  };

  const handleModificarBtn = (id) => {
    setVerBtnState(false);
    setModificarBtnState(true);
    setModificarBtnObj({
      ...allProducts.filter((product) => product.id === id)[0],
    });
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    setVerBtnState(false);
    let productId = allProducts.filter((p) => p.id === id)[0].id;
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

  console.log(allProducts)

  return (
    <div className={s.container}>
      <button onClick={() => setModalBtnState(true)} id={s.addBtn}>
        Agregar Producto
      </button>
      <button onClick={() => setVerBtnState(true)} id={s.addBtn}>
        Ver Productos
      </button>
      <div className={s.grid}>
        <div className={s.gridTitles}>
          <p>Productos</p>
        </div>
        {allProducts.length ? allProducts.map((el, index) => {
          return (
            <div key={index} className={s.gridLines}>
              <Link id={s.link} to={`/Productos/${el.id}`}>
                <button id={s.btn}>{el.name}</button>
              </Link>
            </div>
          );
        }) : <Loader />}
      </div>
      {modalBtnState && (
        <div className={s.modal}>
          <div className={s.modalContainer}>
            <p onClick={() => setModalBtnState(false)}>✖</p>
            <form>
              <label>Producto</label>
              <input
                onChange={(e) => handleFormInputChange(e)}
                name="name"
                type="text"
              />
              <select
                defaultValue="Tipo de Producto..."
                name="type"
                onChange={(e) => handleFormInputChange(e)}
              >
                <option disabled>Tipo de Producto...</option>
                <option value="buso">Buso</option>
                <option value="remera">Remera</option>
                <option value="chaleco">Chaleco</option>
                <option value="campera">Campera</option>
              </select>
              <button onClick={(e) => handleAdd(e)}>Agregar Producto</button>
            </form>
          </div>
        </div>
      )}
      {verBtnState && (
        <div className={s.modal}>
          <div className={s.modalContainer}>
            <p onClick={() => setVerBtnState(false)}>✖</p>
            <div className={s.verContainer}>
              {allProducts.map((el, index) => {
                return (
                  <div key={index} className={s.verProductos}>
                    <div className={s.productoContainer}>
                      <a>{el.name}</a>
                      <div className={s.btns}>
                        <button onClick={() => handleModificarBtn(el.id)}>
                          Modificar
                        </button>
                        <button
                          id={s.eliminar}
                          onClick={(e) => handleDelete(e, el.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
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
