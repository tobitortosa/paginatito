import s from "./DateComponent.module.css";
import { Link, useParams } from "react-router-dom"
import { useState } from "react";

export default function Costos() {

  const {} = useParams()

  const [prendas, setPrendas] = useState(["Buzo Friza con Cierre", "Buzo Cuello Redondo", "Chalecos Soft Shell", "Camperas Soft Shell", "Camperas de Traker y Matelase"])
  const [btnState, setBtnState] = useState(false)
  const [input, setInput] = useState("")

  const handleAdd = (e) => {
    e.preventDefault()
    setPrendas([...prendas, input])
    setBtnState(false)
  }

  return (
    <div className={s.container}>
      <button onClick={() => setBtnState(true)} id={s.addBtn}>
        Agregar Prenda
      </button>
      <div className={s.grid}>
        <div className={s.gridTitles}>
          <p>Fechas</p>
        </div>
        {prendas.map((el) => {
          console.log(el)
          return (
            <div className={s.gridLines}>
              <Link to={`${el}`}><button id={s.btn}>{el}</button></Link>
            </div>
          );
        })}
        
      </div>
      {btnState && (
        <div className={s.modal}>
          <div className={s.modalContainer}>
            <p onClick={() => setBtnState(false)}>✖</p>
            <form>
              <label>Fecha</label>
              <input
                onChange={(e) => setInput(e.target.value)}
                type="text"
              />
              <button onClick={(e) => handleAdd(e)}>Agregar Prenda</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}