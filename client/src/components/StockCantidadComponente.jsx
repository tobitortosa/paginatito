import React from "react";
import s from "./StockCantidadComponente.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllProducts } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { editProductStock } from "../redux/actions";

export default function StockCantidadComponente() {
  const { productName, color } = useParams();
  const dispatch = useDispatch();
  const allProducts = useSelector((state) =>
    state.allProducts.filter((c) => !c.deleted)
  );

  const [editState, setEditState] = useState(false);
  const [editObj, setEditObj] = useState({});
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  let product = allProducts.filter(
    (p) => p.name === productName && p.color === color
  );

  const handleFormInputChange = (e) => {
    setEditObj({
      ...editObj,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditStock = (el) => {
    setEditObj({
      ...el,
    });
    setEditState(true);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(editProductStock(editObj.id, editObj.stock));
    setEditState(false);
  };

  return (
    <div className={s.container}>
      <h3>{productName}</h3>
      <h4>Color: {color}</h4>
      <div className={s.box}>
        <div className={s.titles}>
          <h3>Talles</h3>
          <h3>Stock</h3>
          <h3></h3>
        </div>
        <div className={s.tallesContainer}>
          <div className={s.tallesTitles}>
            {product.map((el, index) => {
              return <p id={s.talle} key={index}>{el.talle}</p>;
            })}
          </div>
          <div className={s.tallesTitles}>
            {product.map((el, index) => {
              return <p key={index}>{el.stock}</p>;
            })}
          </div>
          <div className={s.tallesTitles}>
            {product.map((el, index) => {
              return (
                <button onClick={() => handleEditStock(el)} key={index}>
                  Modificar
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {editState && (
        <div className={s.modal}>
          <div className={s.modalContainer}>
            <p onClick={() => setEditState(false)}>✖</p>
            <form>
              <h3>Modificar Stock</h3>
              <label>{`Producto: ${productName}`}</label>
              <label>{`Color: ${color}`}</label>
              <label>{`Talle: ${editObj.talle.toUpperCase()}`}</label>
              <input
                onChange={(e) => handleFormInputChange(e)}
                name="stock"
                type="number"
                value={editObj.stock}
              />
              <button onClick={(e) => handleEdit(e)}>Modificar Producto</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
