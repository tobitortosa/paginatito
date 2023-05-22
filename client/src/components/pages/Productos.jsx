import s from "./Productos.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  createNewProduct,
  deleteProduct,
  editAumento,
  deleteProductCost,
  deleteProductDetails,
  getAllSubPedidos,
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
  const [deleteErrorState, setDeleteErrorState] = useState(false);
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

  const allSubPedidos = useSelector((state) => state.allSubPedidos);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllSubPedidos());
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

  const handleDelete = (e, name, productId) => {
    e.preventDefault();
    setVerBtnState(false);

    let spExist = allSubPedidos.filter((sp) => sp.producto.name === name);

    if (spExist.length === 0) {
      let productName = products.filter((p) => p.name === name)[0].name;
      let productCostsId = products.filter((p) => p.name === name)[0].pcostId;
      let productDetailsId = products.filter((p) => p.name === name)[0]
        .pdetailId;
      if ((productCostsId || productDetailsId) && spExist.length === 0) {
        dispatch(deleteProduct(productName));
        dispatch(deleteProductCost(productCostsId));
        dispatch(deleteProductDetails(productDetailsId));
        setProducts([...products.filter((p) => p.name !== name)]);
      } else {
        location.reload();
      }
    } else {
      setDeleteErrorState(true);
    }
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
      handleInflacionModal();
      dispatch(editAumento(parseFloat(inflacionInput)));
    }
  };

  const verifyExisting = (name) => {
    let exist = allProduct.filter((p) => p.name === name);
    if (exist.length == 0) {
      location.reload();
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
                  <button onClick={() => verifyExisting(el.name)} id={s.btn}>
                    {el.name}
                  </button>
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
                          onClick={(e) => handleDelete(e, el.name, el.id)}
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

      {deleteErrorState && (
        <div className={s.modal}>
          <div className={s.modalContainer}>
            <p onClick={() => setDeleteErrorState(false)}>✖</p>
            <div id={s.deleteError} className={s.verContainer}>
              <form>
                <div id={s.text} className={s.deleteErrorTxt}>
                  No se puede eliminar el producto ya que existen pedidos que lo
                  utilizan. Por favor elimine el producto de los pedidos antes
                  de eliminarlo.
                </div>
                <button
                  id={s.errorBtn}
                  className={s.deleteErrorTxt}
                  onClick={() => setDeleteErrorState(false)}
                >
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
