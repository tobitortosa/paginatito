import s from "./Stock.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  editProduct,
  editProductStock,
} from "../../redux/actions";
import Loader from "../Loader";

export default function Stock() {
  const dispatch = useDispatch();

  const allProducts = useSelector((state) =>
    state.allProducts.filter((c) => !c.deleted)
  );

  const [input, setInput] = useState({});
  const [editBtnState, setEditBtnState] = useState(false);

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  console.log(input);

  const handleEdit = (e, el) => {
    e.preventDefault();
    setInput(el);
    setEditBtnState(true);
  };

  const handleModificar = (e) => {
    e.preventDefault();
    setEditBtnState(false);
    dispatch(editProductStock(input.id, input.stock));
  };

  return (
    <div className={s.container}>
      <div className={s.tableContainer}>
        <div className={s.tableTitles}>
          <p>Producto</p>
          <p>Stock</p>
          <p></p>
        </div>
        {allProducts.length ? (
          allProducts.map((el, index) => {
            return (
              <div key={index} className={s.line}>
                <p>{el.name}</p>
                <p>{el.stock}</p>
                <p>
                  <button onClick={(e) => handleEdit(e, el)}>Modificar</button>
                </p>
              </div>
            );
          })
        ) : (
          <Loader />
        )}
      </div>
      {editBtnState && (
        <div className={s.modal}>
          <div className={s.modalContainer}>
            <p id={s.x} onClick={() => setEditBtnState(false)}>
              ✖
            </p>

            <div className={s.formContainer}>
              <label>{input.name}</label>
              <input
                type="number"
                value={input.stock}
                name="stock"
                onChange={(e) => handleInputChange(e)}
              />
              <button onClick={(e) => handleModificar(e)}>
                Modificar Stock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
