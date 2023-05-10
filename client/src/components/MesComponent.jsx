import React from "react";
import s from "./MesComponent.module.css";
import { Link } from "react-router-dom";

export default function MesComponent() {
  let meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return (
    <div className={s.container}>
      <div className={s.mesContainer}>
        {meses.map((m) => {
          return (
            <Link id={s.link} to={`/aportesygastos/${m}`}>
              {m}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
