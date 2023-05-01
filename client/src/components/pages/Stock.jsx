import s from "./Stock.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../redux/actions";
import Loader from "../Loader";

export default function Stock() {
  const dispatch = useDispatch();

  const allProducts = useSelector((state) =>
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

  return (
    <div className={s.container}>
      <div>
        <h2 id={s.title}>Productos</h2>
        <div className={s.tableContainer}>
          {allProducts.length ? (
            allProducts.map((el, index) => {
              return (
                <div id={s.div} key={index}>
                  <Link to={el.name}>{el.name}</Link>
                </div>
              );
            })
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
}
