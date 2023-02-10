import s from "./NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const handleCerrarSesion = () => {
    navigate("/");
    localStorage.removeItem("logged");
    location.reload();
  };

  return (
    <div className={s.container}>
      {[
        "Facturas de Compras",
        "Aportes y Gastos",
        "Clientes",
        "Pedidos",
        "Sub Pedidos",
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
      <button id={s.btn} onClick={() => handleCerrarSesion()}>
        Cerrar Sesion
      </button>
    </div>
  );
}
