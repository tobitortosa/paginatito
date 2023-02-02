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

  const [btnState, setBtnState] = useState(false);
  const [costsBtnState, setCostsBtnState] = useState(false);
  const [editDetailsInput, setEditDetailsInput] = useState({});
  const [editCostsInput, setEditCostsInput] = useState({});

  useEffect(() => {
    dispatch(getAllProducts());
  }, [btnState, costsBtnState]);

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

  const mediaSuma =
    parseInt(product?.details?.estampado) +
    parseInt(product?.details?.bordado) +
    parseInt(product?.details?.cintaReflexiva) +
    parseInt(product?.details?.peliculas);

  console.log(mediaSuma);

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

  return (
    <div className={s.container}>
      <h2>{product?.name}</h2>
      <div className={s.box}>
        <div className={s.line}>
          <h3>Costos de Produccion</h3>
          <button onClick={() => handleEditBtn()} id={s.addBtn}>
            Modificar Costos de Produccion
          </button>
          <div className={s.grid}>
            <div className={`${s.gridTitles} ${s.participacion}`}>
              <p id={s.participacionTitle}>% de Participacion</p>
              <p>
                {product?.details?.tela
                  ? `${String((product?.details?.tela / total) * 100).slice(
                      0,
                      2
                    )}%`
                  : "-"}
              </p>
              <p>
                {product?.details?.corte
                  ? `${String((product?.details?.corte / total) * 100).slice(
                      0,
                      2
                    )}%`
                  : "-"}
              </p>
              <p>
                {product?.details?.costura
                  ? `${String((product?.details?.costura / total) * 100).slice(
                      0,
                      2
                    )}%`
                  : "-"}
              </p>
              <p>
                {product?.details?.cierreDeCuello
                  ? `${String(
                      (product?.details?.cierreDeCuello / total) * 100
                    ).slice(0, 2)}%`
                  : "-"}
              </p>
              <p>
                {product?.details?.ribsPuñoCuello
                  ? `${String(
                      (product?.details?.ribsPuñoCuello / total) * 100
                    ).slice(0, 2)}%`
                  : "-"}
              </p>
              <p>
                {product?.details?.tancaYCordon
                  ? `${String(
                      (product?.details?.tancaYCordon / total) * 100
                    ).slice(0, 2)}%`
                  : "-"}
              </p>
              <p>
                {product?.details?.velcro
                  ? `${String((product?.details?.velcro / total) * 100).slice(
                      0,
                      2
                    )}%`
                  : "-"}
              </p>
              <p>
                {product?.details?.cordonElastico
                  ? `${String(
                      (product?.details?.cordonElastico / total) * 100
                    ).slice(0, 2)}%`
                  : "-"}
              </p>
              <p>
                {product?.details?.hebillasLaterales
                  ? `${String(
                      (product?.details?.hebillasLaterales / total) * 100
                    ).slice(0, 2)}%`
                  : "-"}
              </p>
              <p>
                {product?.details?.cierreLateral
                  ? `${String(
                      (product?.details?.cierreLateral / total) * 100
                    ).slice(0, 2)}%`
                  : "-"}
              </p>
              <p>
                {product?.details?.bolsa
                  ? `${String((product?.details?.bolsa / total) * 100).slice(
                      0,
                      2
                    )}%`
                  : "-"}
              </p>
              <p id={s.total}></p>
              <p>
                {product?.details?.estampado
                  ? `${String(
                      (product?.details?.estampado / total) * 100
                    ).slice(0, 2)}%`
                  : "-"}
              </p>
              <p>
                {product?.details?.bordado
                  ? `${String((product?.details?.bordado / total) * 100).slice(
                      0,
                      2
                    )}%`
                  : "-"}
              </p>
              <p>
                {product?.details?.cintaReflexiva
                  ? `${String(
                      (product?.details?.cintaReflexiva / total) * 100
                    ).slice(0, 2)}%`
                  : "-"}
              </p>
              <p>
                {product?.details?.peliculas
                  ? `${String(
                      (product?.details?.peliculas / total) * 100
                    ).slice(0, 2)}%`
                  : "-"}
              </p>
              <p id={s.total}></p>
              <p id={s.total}></p>
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
              <p>Hebillas Laterales</p>
              <p>Cierre Lateral</p>
              <p>Bolsa</p>
              <p id={s.total}>Total</p>
              <p>Estampado</p>
              <p>Bordado</p>
              <p>Cinta Reflexiva</p>
              <p>Peliculas C/U</p>
              <p id={s.total}>Total</p>
              <p id={s.total}>Total con Iva</p>
            </div>
            <div className={s.gridLines}>
              <p>
                {product?.details?.tela ? `$${product?.details?.tela}` : "-"}
              </p>
              <p>
                {product?.details?.corte ? `$${product?.details?.corte}` : "-"}
              </p>
              <p>
                {product?.details?.costura
                  ? `$${product?.details?.costura}`
                  : "-"}
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
                {product?.details?.velcro
                  ? `$${product?.details?.velcro}`
                  : "-"}
              </p>
              <p>
                {product?.details?.cordonElastico
                  ? `$${product?.details?.cordonElastico}`
                  : "-"}
              </p>
              <p>
                {product?.details?.hebillasLaterales
                  ? `$${product?.details?.hebillasLaterales}`
                  : "-"}
              </p>
              <p>
                {product?.details?.cierreLateral
                  ? `$${product?.details?.cierreLateral}`
                  : "-"}
              </p>
              <p>
                {product?.details?.bolsa ? `$${product?.details?.bolsa}` : "-"}
              </p>
              <p id={s.total}>{`$${
                total === null ? "-" : total - mediaSuma
              }`}</p>
              <p>
                {product?.details?.estampado
                  ? `$${product?.details?.estampado}`
                  : "-"}
              </p>
              <p>
                {product?.details?.bordado
                  ? `$${product?.details?.bordado}`
                  : "-"}
              </p>
              <p>
                {product?.details?.cintaReflexiva
                  ? `$${product?.details?.cintaReflexiva}`
                  : "-"}
              </p>
              <p>
                {product?.details?.peliculas
                  ? `$${product?.details?.peliculas}`
                  : "-"}
              </p>
              <p id={s.total}>{`$${total === null ? "-" : total}`}</p>
              <p id={s.total}>{`$${total === null ? "-" : total * 1.21}`}</p>
            </div>
          </div>
        </div>
        <div className={s.line}>
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
                  ? `${product?.costs?.kilosComprados}`
                  : "-"}
              </p>
              <p>
                {product?.costs?.kilosXPrenda
                  ? `${product?.costs?.kilosXPrenda}`
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
        </div>
      </div>

      {btnState && (
        <div className={s.modal}>
          <div className={s.modalContainer}>
            <h3>Costos de Produccion</h3>
            <p id={s.x} onClick={() => setBtnState(false)}>
              ✖
            </p>
            <div className={s.inputsContainer}>
              <div className={s.inputContainer}>
                <div className={s.modalTitles}>
                  <div className={s.titleContainer}>
                    <p>Tela</p>
                    <p>Corte</p>
                    <p>Costura</p>
                    <p>Cierre de Cuello</p>
                    <p>Ribs + Puño + Cuello</p>
                    <p>Tanca y Cordon</p>
                    <p>Velcro</p>
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
                      value={editDetailsInput?.cierreDeCuello || ""}
                    />
                    <input
                      name="ribsPuñoCuello"
                      type="text"
                      onChange={(e) => handleInputChange(e)}
                      value={editDetailsInput?.ribsPuñoCuello || ""}
                    />
                    <input
                      name="tancaYCordon"
                      type="text"
                      onChange={(e) => handleInputChange(e)}
                      value={editDetailsInput?.tancaYCordon || ""}
                    />
                    <input
                      name="velcro"
                      type="text"
                      onChange={(e) => handleInputChange(e)}
                      value={editDetailsInput?.velcro || ""}
                    />
                  </div>
                </div>
                <div className={s.modalTitles}>
                  <div className={s.titleContainer}>
                    <p>Cordon Elastico</p>
                    <p>Hebillas Laterales</p>
                    <p>Cierre Lateral</p>
                    <p>Bolsa</p>
                    <p>Estampado</p>
                    <p>Bordado</p>
                    <p>Cinta Relfexiva</p>
                    <p>Peliculas C/U</p>
                  </div>
                  <div className={s.modalLines}>
                    <input
                      name="cordonElastico"
                      type="text"
                      onChange={(e) => handleInputChange(e)}
                      value={editDetailsInput?.cordonElastico || ""}
                    />
                    <input
                      name="hebillasLaterales"
                      type="text"
                      onChange={(e) => handleInputChange(e)}
                      value={editDetailsInput?.hebillasLaterales || ""}
                    />
                    <input
                      name="cierreLateral"
                      type="text"
                      onChange={(e) => handleInputChange(e)}
                      value={editDetailsInput?.cierreLateral || ""}
                    />
                    <input
                      name="bolsa"
                      type="text"
                      onChange={(e) => handleInputChange(e)}
                      value={editDetailsInput?.bolsa || ""}
                    />
                    <input
                      name="estampado"
                      type="text"
                      onChange={(e) => handleInputChange(e)}
                      value={editDetailsInput?.estampado || ""}
                    />
                    <input
                      name="bordado"
                      type="text"
                      onChange={(e) => handleInputChange(e)}
                      value={editDetailsInput?.bordado || ""}
                    />
                    <input
                      name="cintaReflexiva"
                      type="text"
                      onChange={(e) => handleInputChange(e)}
                      value={editDetailsInput?.cintaReflexiva || ""}
                    />
                    <input
                      name="peliculas"
                      type="text"
                      onChange={(e) => handleInputChange(e)}
                      value={editDetailsInput?.peliculas || ""}
                    />
                  </div>
                </div>
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
            <h3>Costos del Producto</h3>
            <p id={s.x} onClick={() => setCostsBtnState(false)}>
              ✖
            </p>
            <div className={s.inputsContainer}>
              <div className={s.inputContainer}>
                <div className={s.modalTitles}>
                  <div className={s.titleContainer}>
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
              </div>
            </div>
            <button onClick={() => handleCostsEdit()}>Modificar Costos</button>
          </div>
        </div>
      )}
    </div>
  );
}
