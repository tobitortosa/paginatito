import s from "./AportesYGastos.module.css";
import { useState } from "react";

export default function AportesYGastos() {
  const [input, setInput] = useState({
    fecha: "",
    descripcion: "",
    aportes: 0,
    compras: 0,
    gastos: 0,
    saldos: 0,
    deben: 0,
  });

  const [aportesYGastos, setAportesYGastos] = useState([]);
  const [correspondeAState, setCorrespondeAState] = useState("");
  const [btnState, setBtnState] = useState(false);
  const [btnLineState, setBtnLineState] = useState(false);

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleCorrespondeState = (el) => {
    setBtnLineState(true);
    setCorrespondeAState(el);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setBtnState(false);
    setAportesYGastos([...aportesYGastos, input]);
    setInput({
      fecha: "",
      descripcion: "",
      aportes: 0,
      compras: 0,
      gastos: 0,
      saldos: 0,
      deben: 0,
    });
  };

  console.log(input);

  return (
    <div className={s.container}>
      <button onClick={() => setBtnState(true)} id={s.addBtn}>
        Agregar Aporte o Gasto
      </button>
      <div className={s.grid}>
        <div className={s.gridTitles}>
          <p>Fecha</p>
          <p>Descripcion</p>
          <p>Aporte</p>
          <p>Compras</p>
          <p>Gastos</p>
          <p>Saldos</p>
          <p>Deben</p>
        </div>
        {aportesYGastos.map((el) => {
          return (
            <div className={s.gridLines}>
              <p>{el["fecha"]}</p>
              <p
                onClick={() => handleCorrespondeState(el["Corresponde a"])}
                id={s.correspondeLink}
              >
                {`${el["descripcion"].slice(0, 10)}...`}
              </p>
              <p>{`$ ${el["aportes"]}`}</p>
              <p>{`$ ${el["compras"]}`}</p>
              <p>{`$ ${el["gastos"]}`}</p>
              <p>{`$ ${el["saldos"]}`}</p>
              <p>{`$ ${el["deben"]}`}</p>
            </div>
          );
        })}
      </div>
      {btnLineState && (
        <div className={s.lineModal}>
          <div className={s.text}>
            <p onClick={() => setBtnLineState(false)}>✖</p>
            {correspondeAState}
          </div>
        </div>
      )}
      {btnState && (
        <div className={s.modal}>
          <div className={s.modalContainer}>
            <p onClick={() => setBtnState(false)}>✖</p>
            <form>
              <label>Fecha</label>
              <input
                onChange={(e) => handleInputChange(e)}
                type="date"
                name="fecha"
              />
              <label>Descripcion</label>
              <textarea
                onChange={(e) => handleInputChange(e)}
                name="descripcion"
              ></textarea>
              <label>Aporte</label>
              <input
                onChange={(e) => handleInputChange(e)}
                type="number"
                name="aportes"
              />
              <label>Compras</label>
              <input
                onChange={(e) => handleInputChange(e)}
                type="number"
                name="compras"
              />
              <label>Gastos</label>
              <input
                onChange={(e) => handleInputChange(e)}
                type="number"
                name="gastos"
              />
              <label>Saldos</label>
              <input
                onChange={(e) => handleInputChange(e)}
                type="number"
                name="saldos"
              />
              <label>Deben</label>
              <input
                onChange={(e) => handleInputChange(e)}
                type="number"
                name="deben"
              />
              <button onClick={(e) => handleAdd(e)}>Agregar Aporte o Gasto</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
