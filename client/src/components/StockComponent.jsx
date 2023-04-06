import React from "react";
import { useParams } from "react-router-dom";
import s from "./StockComponent.module.css";
import { Link } from "react-router-dom";

export default function StockComponent() {
  const { productName } = useParams();

  return (
    <div className={s.container}>
      <div className={s.tableContainer}>
        <h2>
          Colores de <br/> {productName}
        </h2>
        <Link to={"blanco"}>Blanco</Link>
        <Link to={"negro"}>Negro</Link>
        <Link to={"gris"}>Gris</Link>
        <Link to={"azul marino"}>Azul Marino</Link>
        <Link to={"otro"}>Otro</Link>
      </div>
    </div>
  );
}
