import React from "react";
import s from "./PreciosDeProductos.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProducts, getProductCosts } from "../../redux/actions";

export default function PreciosDeProductos() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) =>
    state.allProducts
      .filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.name === value.name)
      )
      .filter((c) => !c.deleted)
  );
  const allPcosts = useSelector((state) => state.allPcosts);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getProductCosts());
  }, []);

  return (
    <div className={s.container}>
      <div className={s.mainContainer}>
        <div className={s.tableTitles}>
          <div className={s.tableColumn}>
            <div className={s.tableTxt}>
              <h2>Producto</h2>
            </div>
          </div>
          <div className={s.tableColumn}>
            <div className={s.tableTxt}>
              <h2>Precio</h2>
            </div>
          </div>
        </div>
        {allProducts.map((el, index) => {
          return (
            <div key={index}>
              <div className={s.tableContainer}>
                <div className={s.tableColumn}>
                  <div className={s.tableTxt}>
                    <h3>{el.name}</h3>
                  </div>
                </div>
                <div className={s.tableColumn}>
                  <div className={s.tableTxt}>
                    <h3>
                      {`$${
                        allPcosts.filter((pc) => el.pcostId == pc.id)[0]
                          ?.costoFinal
                      }`}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
