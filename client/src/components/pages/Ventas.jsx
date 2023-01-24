import s from "./Ventas.module.css";

export default function Ventas() {
  return (
    <div className={s.container}>
      <button id={s.addBtn}>Agregar Factura</button>
      <div className={s.grid}>
        <div className={s.gridTitles}>
          <p>Fecha</p>
          <p>Proveedor</p>
          <p>Cuit</p>
        </div>
      </div>
    </div>
  );
}
