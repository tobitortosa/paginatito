import s from "./NavBar.module.css";
import { Link } from "react-router-dom";

export default function NavBar({ toggleNav }) {
  return (
    <div className={s.container}>
      {[
        "Facturas de Compras",
        "Aportes y Gastos",
        "Clientes",
        "Pedidos",
        "Stock",
        "Gastos",
        "Productos",
      ].map((el, index) => {
        return (
          <div key={index}>
            <Link to={el}>
              <button key={el} className={s.btnElement}>
                {el}
              </button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
