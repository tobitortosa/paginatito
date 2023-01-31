import s from "./Productos.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, createNewProduct } from "../../redux/actions";

export default function Productos() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);
  const [modalBtnState, setModalBtnState] = useState(false);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    setModalBtnState(false);
    dispatch(createNewProduct(formInput));
  };

  const [formInput, setFormInput] = useState({
    name: "",
    type: "",
  });

  const handleFormInputChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  console.log(allProducts);
  console.log(formInput);

  return (
    <div className={s.container}>
      <button onClick={() => setModalBtnState(true)} id={s.addBtn}>
        Agregar Producto
      </button>
      <div className={s.grid}>
        <div className={s.gridTitles}>
          <p>Productos</p>
        </div>
        {allProducts.map((el, index) => {
          return (
            <div key={index} className={s.gridLines}>
              <Link to={`/Productos/${el.id}`}>
                <button id={s.btn}>{el.name}</button>
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
    </div>
  );
}
