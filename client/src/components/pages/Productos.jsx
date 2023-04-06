import s from "./Productos.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  createNewProduct,
  deleteProduct,
  editProduct,
  editAumento,
} from "../../redux/actions";
import Loader from "../Loader";

export default function Productos() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) =>
    state.allProducts
      .filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.name === value.name)
      )
      .filter((c) => !c.deleted)
  );

  const [modalBtnState, setModalBtnState] = useState(false);
  const [verBtnState, setVerBtnState] = useState(false);
  const [formInput, setFormInput] = useState({
    name: "",
    type: "",
  });

  const [inflacionState, setInflacionState] = useState(false);
  const [inflacionInput, setInflacionInput] = useState("");

  useEffect(() => {
    dispatch(getAllProducts());
  }, [modalBtnState, verBtnState]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (formInput.name.length) {
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

  const handleDelete = (e, name) => {
    e.preventDefault();
    setVerBtnState(false);
    let productName = allProducts.filter((p) => p.name === name)[0].name;
    console.log(productName);
    dispatch(deleteProduct(productName));
  };

  const handleFormInputChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleAumentoInputChange = (e) => {
    setInflacionInput(e.target.value);
  };

  const handleModificarAumento = (e) => {
    e.preventDefault();
    if (inflacionInput > 0 && inflacionInput < 100) {
      console.log(inflacionInput);
      dispatch(editAumento(parseFloat(`1.${inflacionInput}`)));
    }
  };

  return (
    <div className={s.container}>
      <button onClick={() => setModalBtnState(true)} id={s.addBtn}>
        Agregar Producto
      </button>
      <button onClick={() => setVerBtnState(true)} id={s.addBtn}>
        Ver Productos
      </button>
      <button onClick={() => setInflacionState(true)} id={s.addBtn}>
        Modificar Costos Global
      </button>
      <div className={s.grid}>
        <div className={s.gridTitles}>
          <p>Productos</p>
        </div>
        {allProducts.length ? (
          allProducts.map((el, index) => {
            return (
              <div key={index} className={s.gridLines}>
                <Link id={s.link} to={`/productos/${el.name}`}>
                  <button id={s.btn}>{el.name}</button>
                </Link>
              </div>
            );
          })
        ) : (
          <Loader />
        )}
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
                <option value="buzo">Buzo</option>
                <option value="remera">Remera</option>
                <option value="chaleco">Chaleco</option>
                <option value="camisa">Camisa</option>
                <option value="chomba">Chomba</option>
                <option value="campera">Campera</option>
                <option value="pantalon">Pantalon</option>
                <option value="gorra">Gorra</option>
                <option value="articulo vario">Articulos Varios</option>
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
                        <button
                          id={s.eliminar}
                          onClick={(e) => handleDelete(e, el.name)}
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

      {inflacionState && (
        <div className={s.modal}>
          <div className={s.modalContainer}>
            <p onClick={() => setInflacionState(false)}>✖</p>
            <div className={s.verContainer}>
              <form>
                <label>Ingresar Porcentaje de Aumento</label>
                <h4 id={s.entre}>Entre 1% y 99%</h4>
                <div className={s.porcentajeContainer}>
                  <p>%</p>
                  <input
                    onChange={(e) => handleAumentoInputChange(e)}
                    type="number"
                    name="name"
                    min="0"
                    value={inflacionInput}
                  />
                </div>

                <button onClick={(e) => handleModificarAumento(e)}>
                  Aumentar Costos Globales
                </button>
                <br />
                <text>
                  El porcentaje ingresado actualizara el precio de todos los
                  productos con sus respectivos costos de produccion.
                </text>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
