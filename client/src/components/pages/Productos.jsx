import s from "./Productos.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  createNewProduct,
  deleteProduct,
  editAumento,
} from "../../redux/actions";
import Loader from "../Loader";

export default function Productos() {
  const dispatch = useDispatch();

  const [modalBtnState, setModalBtnState] = useState(false);
  const [verBtnState, setVerBtnState] = useState(false);
  const [formInput, setFormInput] = useState({
    name: "",
    type: "",
  });

  const [inflacionState, setInflacionState] = useState(false);
  const [inflacionInput, setInflacionInput] = useState("");
  const [inflacionModal, setInflacionModal] = useState(false);
  const [flag, setFlag] = useState(true);
  const [products, setProducts] = useState([]);

  const allProduct = useSelector((state) =>
    state.allProducts
      .filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.name === value.name)
      )
      .filter((c) => !c.deleted)
  );

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    if (flag && allProduct.length) {
      setProducts(allProduct);
      setFlag(false);
    }
  }, [allProduct]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (formInput.name.length && formInput.type !== "") {
      setModalBtnState(false);
      dispatch(createNewProduct(formInput));
      setProducts([...products, formInput]);
    }
  };

  const handleDelete = (e, name) => {
    e.preventDefault();
    setVerBtnState(false);
    let productName = products.filter((p) => p.name === name)[0].name;
    setProducts([...products.filter((p) => p.name !== name)]);
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

  const handleInflacionModal = () => {
    setInflacionModal(true);
    setInflacionState(false);
  };
  const handleModificarAumento = (e) => {
    e.preventDefault();
    if (
      inflacionInput > 0 &&
      inflacionInput < 100 &&
      inflacionInput.length > 0
    ) {
      // alert(
      //   `Se ah actualizado el precio de todos los productos un ${inflacionInput}`
      // );
      handleInflacionModal();
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
        {products.length ? (
          products.map((el, index) => {
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
              {products.map((el, index) => {
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
                <div>
                  El porcentaje ingresado actualizara el precio de todos los
                  productos con sus respectivos costos de produccion.
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {inflacionModal && (
        <div className={s.modal}>
          <div className={s.modalContainer}>
            <p onClick={() => setInflacionModal(false)}>✖</p>
            <div className={s.verContainer}>
              <form>
                <div id={s.text}>
                  {`El precio de todos los productos aumento un ${inflacionInput}%`}
                </div>
                <button onClick={() => setInflacionModal(false)}>
                  Aceptar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
