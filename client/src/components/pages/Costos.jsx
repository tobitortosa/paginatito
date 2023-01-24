import s from "./Costos.module.css"
import { useState } from "react";
import DateComponent from "../DateComponent";
import { Link } from "react-router-dom"

export default function Costos() {

  const [fechas, setFechas] = useState(["Hasta el 28 de Febrero"])
  const [btnState, setBtnState] = useState(false)
  const [input, setInput] = useState("")

  const handleAdd = (e) => {
    e.preventDefault()
    setFechas([...fechas, input])
    setBtnState(false)
  }

  return (
    <div className={s.container}>
      <button onClick={() => setBtnState(true)} id={s.addBtn}>
        Agregar Fecha
      </button>
      <div className={s.grid}>
        <div className={s.gridTitles}>
          <p>Fechas</p>
        </div>
        {fechas.map((el) => {
          console.log(el)
          return (
            <div className={s.gridLines}>
              <Link to={`/Costos/${el}`}><button id={s.btn}>{el}</button></Link>
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
              <button onClick={(e) => handleAdd(e)}>Agregar Fecha</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

