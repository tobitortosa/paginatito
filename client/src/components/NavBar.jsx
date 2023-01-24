import s from "./NavBar.module.css";
import {Link} from "react-router-dom"

export default function NavBar({ toggleNav }) {
  return (
    <div className={s.container}>
      {[
        "Facturas de Compras",
        "Aportes y Gastos",
        "Ventas",
        "Prendas",
        "Stock",
        "Gastos",
        "Costos",
      ].map((el) => {
        return (
          <Link to={el}>
          <button
            key={el}
            className={s.btnElement}
            >
            {el}
          </button>
            </Link>
        );
      })}
    </div>
  );
}
