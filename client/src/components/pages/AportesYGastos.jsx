import s from "./AportesYGastos.module.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllAporteYGasto,
  createAporteYGasto,
  deleteAporteYGasto,
} from "../../redux/actions";
import { useEffect } from "react";
import Loader from "../Loader";

export default function AportesYGastos() {
  const dispatch = useDispatch();

  const [btnState, setBtnState] = useState(false);
  const stateAllAportesYGastos = useSelector((state) =>
    state.allAportesYGastos.filter((a) => !a.deleted)
  );

  const [allAportesYGastos, setAllAportesYGastos] = useState([]);
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    dispatch(getAllAporteYGasto());
  }, []);

  useEffect(() => {
    if (flag && stateAllAportesYGastos.length) {
      setAllAportesYGastos(stateAllAportesYGastos);
      setFlag(false);
    }
  }, [stateAllAportesYGastos]);

  console.log(allAportesYGastos);

  const [input, setInput] = useState({
    type: "",
    cost: "",
    date: "",
    description: "",
  });

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setBtnState(false);
    dispatch(createAporteYGasto(input));
    setAllAportesYGastos([...allAportesYGastos, input]);
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    if (id) {
      dispatch(deleteAporteYGasto(id));
      setAllAportesYGastos([...allAportesYGastos.filter((ap) => ap.id !== id)]);
    } else {
      location.reload();
    }
  };

  let aportes = allAportesYGastos
    .filter((a) => a.type === "Aporte")
    .reduce((acc, el) => {
      return (acc += parseFloat(el.cost));
    }, 0);

  let gastos = allAportesYGastos
    .filter((a) => a.type === "Gasto")
    .reduce((acc, el) => {
      return (acc += parseFloat(el.cost));
    }, 0);

  return (
    <div className={s.container}>
      <button onClick={() => setBtnState(true)} id={s.addBtn}>
        Agregar Aporte o Gasto
      </button>

      <div className={s.table}>
        <div className={s.tableTitles}>
          <p>Tipo</p>
          <p>Fecha</p>
          <p id={s.descriptionTitle}>Descripcion</p>
          <p>Costo</p>
          <p></p>
        </div>
        {allAportesYGastos.length ? (
          allAportesYGastos.map((el, index) => {
            return (
              <div key={index} className={s.tableLine}>
                <p>{el.type}</p>
                <p>{el.date}</p>
                <p className={s.descriptionTitle}>{el.description}</p>
                <p>{`$${el.cost}`}</p>
                <button onClick={(e) => handleDelete(e, el.id)}>
                  Eliminar
                </button>
              </div>
            );
          })
        ) : (
          <Loader />
        )}
        <div className={s.tableTitles}>
          <p></p>
          <p></p>
          <p id={s.total} className={s.descriptionTitle}>
            Total :
          </p>
          <p id={s.total}>{`$${aportes - gastos}`}</p>
          <p></p>
        </div>
      </div>

      {btnState && (
        <div className={s.modal}>
          <div className={s.modalContainer}>
            <p id={s.x} onClick={() => setBtnState(false)}>
              ✖
            </p>
            <form>
              <label>Tipo</label>
              <select
                onChange={(e) => handleInputChange(e)}
                defaultValue="Elegir Aporte o Gasto..."
                name="type"
              >
                <option disabled>Elegir Aporte o Gasto...</option>
                <option value="Aporte">Aporte</option>
                <option value="Gasto">Gasto</option>
              </select>
              <label>Fecha</label>
              <input
                onChange={(e) => handleInputChange(e)}
                type="date"
                name="date"
              />
              <label>Descripcion</label>
              <textarea
                onChange={(e) => handleInputChange(e)}
                name="description"
                id={s.descripcion}
              ></textarea>

              <label>Costo</label>
              <input
                onChange={(e) => handleInputChange(e)}
                type="number"
                name="cost"
              />
              <button onClick={(e) => handleAdd(e)}>
                Agregar Aporte o Gasto
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
