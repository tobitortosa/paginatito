import { useState } from "react";
import s from "./FacturasDeCompras.module.css";

export default function FacturasDeCompras() {
  const [input, setInput] = useState({
    Fecha: "",
    Proveedor: "",
    Cuit: 0,
    "Precio Neto": 0,
    "% de Iva": 0,
    "Corresponde a": "",
  });

  const [facturas, setFacturas] = useState([]);
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
    setFacturas([...facturas, input]);
    setInput({
      Fecha: "",
      Proveedor: "",
      Cuit: 0,
      "Precio Neto": 0,
      "% de Iva": 0,
      "Corresponde a": "",
    });
  };

  console.log(input);

  return (
    <div className={s.container}>
      <button onClick={() => setBtnState(true)} id={s.addBtn}>
        Agregar Factura
      </button>
      <div className={s.grid}>
        <div className={s.gridTitles}>
          <p>Fecha</p>
          <p>Proveedor</p>
          <p>Cuit</p>
          <p>Neto</p>
          <p>Iva</p>
          <p>Total</p>
          <p>Corresponde a</p>
        </div>
        {facturas.map((el) => {
          return (
            <div className={s.gridLines}>
              <p>{el["Fecha"]}</p>
              <p>{el["Proveedor"]}</p>
              <p>{el["Cuit"]}</p>
              <p>{`$ ${el["Precio Neto"]}`}</p>
              <div className={s.iva}>
                <span id={s.ivaPorcentaje}>{`% ${el["% de Iva"]}`}</span>
                <span>{`$ ${(el["Precio Neto"] * el["% de Iva"]) / 100}`}</span>
              </div>
              <p>
                {`$ ${
                  parseInt(el["Precio Neto"]) +
                  (parseInt(el["Precio Neto"]) * parseInt(el["% de Iva"])) / 100
                }`}
              </p>
              <p
                onClick={() => handleCorrespondeState(el["Corresponde a"])}
                id={s.correspondeLink}
              >
                {`${el["Corresponde a"].slice(0, 10)}...`}
              </p>
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
                name="Fecha"
              />
              <label>Proveedor</label>
              <input
                onChange={(e) => handleInputChange(e)}
                type="text"
                name="Proveedor"
              />
              <label>Cuit</label>
              <input
                onChange={(e) => handleInputChange(e)}
                type="number"
                name="Cuit"
              />
              <label>Precio Neto</label>
              <input
                onChange={(e) => handleInputChange(e)}
                type="number"
                name="Precio Neto"
              />
              <label>% de Iva</label>
              <input
                onChange={(e) => handleInputChange(e)}
                type="number"
                name="% de Iva"
              />
              <label>Corresponde a</label>
              <textarea
                onChange={(e) => handleInputChange(e)}
                name="Corresponde a"
              ></textarea>
              <button onClick={(e) => handleAdd(e)}>Agregar Factura</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
