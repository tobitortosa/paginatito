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
      <div className={s.navContainer}>
        <Link to={"/aportesygastos"}>
          <button className={s.btnElement}>Aportes y Gastos</button>
        </Link>
        <Link to={"/clientes"}>
          <button className={s.btnElement}>Clientes</button>
        </Link>
        <Link to={"/pedidos"}>
          <button className={s.btnElement}>Pedidos</button>
        </Link>
        <Link to={"/stock"}>
          <button className={s.btnElement}>Stock</button>
        </Link>
        <Link to={"/productos"}>
          <button className={s.btnElement}>Productos</button>
        </Link>
        <Link to={"/precios"}>
          <button className={s.btnElement}>Lista de Precios</button>
        </Link>
        <button id={s.btn} onClick={() => handleCerrarSesion()}>
          Cerrar Sesion
        </button>
      </div>
    </div>
  );
}
