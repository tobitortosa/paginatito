import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllProducts, editProduct } from "../redux/actions";
import s from "./ProductoComponent.module.css";

export default function ProductoComponent() {
  const { productoId } = useParams();

  const dispatch = useDispatch();
  const product = useSelector(
    (state) => state.allProducts.filter((p) => p.id === productoId)[0]
  );

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const [btnState, setBtnState] = useState(false);
  const [costsBtnState, setCostsBtnState] = useState(false);
  const [editDetailsInput, setEditDetailsInput] = useState({});
  const [editCostsInput, setEditCostsInput] = useState({});

  const handleCostsInputChange = (e) => {
    setEditCostsInput({
      ...editCostsInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputChange = (e) => {
    setEditDetailsInput({
      ...editDetailsInput,
      [e.target.name]: e.target.value,
    });
  };

  console.log(editCostsInput);

  const handleEditBtn = () => {
    setBtnState(true);
    setEditDetailsInput(product?.details);
  };

  const handleEditCostsBtn = () => {
    setCostsBtnState(true);
    setEditCostsInput(product?.costs);
  };

  const handleDetailsEdit = (e) => {
    setBtnState(false);
    setCostsBtnState(false);
    dispatch(
      editProduct({
        ...product,
        details: editDetailsInput,
      })
    );
  };

  const handleCostsEdit = (e) => {
    setBtnState(false);
    setCostsBtnState(false);
    dispatch(
      editProduct({
        ...product,
        costs: editCostsInput,
      })
    );
  };

  const total =
    product?.details &&
    Object.keys(product?.details).reduce((acc, el) => {
      return parseInt(product?.details[`${el}`]) + acc;
    }, 0);

  const salen =
    product?.costs?.kilosComprados && product?.costs?.kilosXPrenda
      ? product?.costs?.kilosComprados / product?.costs?.kilosXPrenda
      : "-";

  const precioFinal =
    product?.costs?.kilosComprados && product?.costs?.precioXKiloFinal
      ? product?.costs?.kilosComprados *
        (product?.costs?.precioXKiloFinal * 1.21)
      : "-";

    const a = Number("4243")
    console.log(a)

  return (
    <div className={s.container}>
      <h2>{product?.name}</h2>
      <h3>Costos de Produccion</h3>
      <button onClick={() => handleEditBtn()} id={s.addBtn}>
        Modificar Costos de Produccion
      </button>
      <div className={s.grid}>
        <div className={`${s.gridTitles} ${s.participacion}`}>
          <p>
            {/* {product?.details?.tela
              ? `${Number.(((product?.details?.tela / total) * 100)).split("").slice(0,50).join("")}%`
              : "-"} */}
          </p>
          <p>{(product?.details?.corte / total) * 100}</p>
          <p>{(product?.details?.costura / total) * 100}</p>
          <p>{(product?.details?.cierreDeCuello / total) * 100}</p>
          <p>{(product?.details?.ribsPuñoCuello / total) * 100}</p>
          <p>{(product?.details?.tancaYCordon / total) * 100}</p>
          <p>{(product?.details?.velcro / total) * 100}</p>
          <p>{(product?.details?.cordonElastico / total) * 100}</p>
          <p></p>
          <p></p>
        </div>
        <div className={s.gridTitles}>
          <p>Tela</p>
          <p>Corte</p>
          <p>Costura</p>
          <p>Cierre de Cuello</p>
          <p>Ribs + Puño + Cuello</p>
          <p>Tanca y Cordon</p>
          <p>Velcro</p>
          <p>Cordon Elastico</p>
          <p>Total</p>
          <p>Total con Iva</p>
        </div>
        <div className={s.gridLines}>
          <p>{product?.details?.tela ? `$${product?.details?.tela}` : "-"}</p>
          <p>{product?.details?.corte ? `$${product?.details?.corte}` : "-"}</p>
          <p>
            {product?.details?.costura ? `$${product?.details?.costura}` : "-"}
          </p>
          <p>
            {product?.details?.cierreDeCuello
              ? `$${product?.details?.cierreDeCuello}`
              : "-"}
          </p>
          <p>
            {product?.details?.ribsPuñoCuello
              ? `$${product?.details?.ribsPuñoCuello}`
              : "-"}
          </p>
          <p>
            {product?.details?.tancaYCordon
              ? `$${product?.details?.tancaYCordon}`
              : "-"}
          </p>
          <p>
            {product?.details?.velcro ? `$${product?.details?.velcro}` : "-"}
          </p>
          <p>
            {product?.details?.cordonElastico
              ? `$${product?.details?.cordonElastico}`
              : "-"}
          </p>
          <p>{total === null ? "-" : total}</p>
          <p>{total === null ? "-" : total * 1.21}</p>
        </div>
      </div>
      <h3>Costos del Producto</h3>
      <button onClick={() => handleEditCostsBtn()} id={s.addBtn}>
        Modificar Costos del Producto
      </button>
      <div className={s.grid}>
        <div className={s.gridTitles}>
          <p>Kilos Comprados</p>
          <p>Kilos x Prenda</p>
          <p>Precio por Kilo Final</p>
          <p>Costo con Iva por Unidad</p>
          <p>Salen</p>
          <p>Precio Final Total</p>
        </div>
        <div className={s.gridLines}>
          <p>
            {product?.costs?.kilosComprados
              ? `${product?.costs?.kilosComprados}k`
              : "-"}
          </p>
          <p>
            {product?.costs?.kilosXPrenda
              ? `${product?.costs?.kilosXPrenda}k`
              : "-"}
          </p>
          <p>
            {product?.costs?.precioXKiloFinal
              ? `$${product?.costs?.precioXKiloFinal}`
              : "-"}
          </p>
          <p>
            {precioFinal === "-" || salen === "-"
              ? "-"
              : `$${precioFinal / salen}`}
          </p>
          <p id={s.salen}>{salen || "-"}</p>
          <p>{precioFinal !== "-" ? `$${precioFinal}` : "-"}</p>
        </div>
      </div>
      {btnState && (
        <div className={s.modal}>
          <div className={s.modalContainer}>
            <p id={s.x} onClick={() => setBtnState(false)}>
              ✖
            </p>
            <div className={s.grid}>
              <div className={s.modalTitles}>
                <p>Tela</p>
                <p>Corte</p>
                <p>Costura</p>
                <p>Cierre de Cuello</p>
                <p>Ribs + Puño + Cuello</p>
                <p>Tanca y Cordon</p>
                <p>Velcro</p>
                <p>Cordon Elastico</p>
              </div>
              <div className={s.modalLines}>
                <input
                  name="tela"
                  type="text"
                  onChange={(e) => handleInputChange(e)}
                  value={editDetailsInput?.tela || ""}
                />
                <input
                  name="corte"
                  type="text"
                  onChange={(e) => handleInputChange(e)}
                  value={editDetailsInput?.corte || ""}
                />
                <input
                  name="costura"
                  type="text"
                  onChange={(e) => handleInputChange(e)}
                  value={editDetailsInput?.costura || ""}
                />
                <input
                  name="cierreDeCuello"
                  type="text"
                  onChange={(e) => handleInputChange(e)}
                />
                <input
                  name="ribsPuñoCuello"
                  type="text"
                  onChange={(e) => handleInputChange(e)}
                />
                <input
                  name="tancaYCordon"
                  type="text"
                  onChange={(e) => handleInputChange(e)}
                />
                <input
                  name="velcro"
                  type="text"
                  onChange={(e) => handleInputChange(e)}
                />
                <input
                  name="cordonElastico"
                  type="text"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
            <button onClick={() => handleDetailsEdit()}>
              Modificar Costos
            </button>
          </div>
        </div>
      )}
      {costsBtnState && (
        <div className={s.modal}>
          <div className={s.modalContainer}>
            <p id={s.x} onClick={() => setCostsBtnState(false)}>
              ✖
            </p>
            <div className={s.grid}>
              <div className={s.modalTitles}>
                <p>Kilos Comprados</p>
                <p>Kilos por Prenda</p>
                <p>Precio por Kilo Final</p>
              </div>
              <div className={s.modalLines}>
                <input
                  name="kilosComprados"
                  type="text"
                  onChange={(e) => handleCostsInputChange(e)}
                  value={editCostsInput?.kilosComprados || ""}
                />
                <input
                  name="kilosXPrenda"
                  type="text"
                  onChange={(e) => handleCostsInputChange(e)}
                  value={editCostsInput?.kilosXPrenda || ""}
                />
                <input
                  name="precioXKiloFinal"
                  type="text"
                  onChange={(e) => handleCostsInputChange(e)}
                  value={editCostsInput?.precioXKiloFinal || ""}
                />
              </div>
            </div>
            <button onClick={() => handleCostsEdit()}>Modificar Costos</button>
          </div>
        </div>
      )}
    </div>
  );
}
