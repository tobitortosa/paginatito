import s from "./SubPedidos.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  deleteProduct,
  editProduct,
  getAllPedidos,
  getAllSubPedidos,
  createSubPedido,
} from "../../redux/actions";

export default function Productos() {
  const dispatch = useDispatch();
  const allSubPedidos = useSelector((state) => state.allSubPedidos);
  const allPedidos = useSelector((state) => state.allPedidos);
  const [modalBtnState, setModalBtnState] = useState(false);
  const [verBtnState, setVerBtnState] = useState(false);
  const [modificarBtnState, setModificarBtnState] = useState(false);
  const [modificarBtnObj, setModificarBtnObj] = useState({});
  const [formInput, setFormInput] = useState({
    idPedido: "",
  });

  console.log(allSubPedidos);
  console.log(allPedidos);

  useEffect(() => {
    dispatch(getAllSubPedidos());
  }, []);

  const handleAdd = (e) => {
    setModalBtnState(false);
  };

  const handleModificar = (e) => {
    e.preventDefault();
    dispatch(editProduct(modificarBtnObj));
    setModificarBtnState(false);
  };

  const handleFormInputChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleModificarInputChange = (e) => {
    setModificarBtnObj({
      ...modificarBtnObj,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={s.container}>
      <div className={s.grid}>
        <div className={s.gridTitles}>
          <p>Sub Pedidos</p>
        </div>
        {allPedidos.map((el, index) => {
          return (
            <div key={index} className={s.gridLines}>
              <Link id={s.link} to={`/Pedidos/${el.id}`}>
                <button id={s.btn}>{el.cliente?.redSocial}</button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
