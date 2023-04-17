import { useState, useEffect } from "react";
import { useSelector, useDispatch, Provider } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllProducts, editProduct } from "../redux/actions";
import s from "./ProductoComponent.module.css";

export default function ProductoComponent() {
  const { productName } = useParams();

  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);

  const [btnState, setBtnState] = useState(false);
  const [costsBtnState, setCostsBtnState] = useState(false);
  const [editDetailsInput, setEditDetailsInput] = useState({});
  const [editCostsInput, setEditCostsInput] = useState({});
  const [product, setProduct] = useState({});
  const [flag, setFlag] = useState(true);

  const precioFinal =
    product?.costs?.kilosComprados && product?.costs?.precioXKiloFinal
      ? product?.costs?.kilosComprados *
        (product?.costs?.precioXKiloFinal * 1.21)
      : "-";

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    if (flag && allProducts.length) {
      setProduct(allProducts.filter((p) => p.name === productName)[0]);
      setFlag(false);
    }
  }, [allProducts]);

  if (!product) location.reload();

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

  const handleEditBtn = () => {
    setBtnState(true);
    setEditDetailsInput(
      product?.details
        ? product?.details
        : {
            tela: "0",
            corte: "0",
            costura: "0",
            cierreDeCuello: "0",
            ribsPuñoCuello: "0",
            tancaYCordon: "0",
            velcro: "0",
            cordonElastico: "0",
            hebillasLaterales: "0",
            cierreLateral: "0",
            bolsa: "0",
            estampado: "0",
            bordado: "0",
            cintaReflexiva: "0",
            peliculas: "0",
          }
    );
  };

  const handleEditCostsBtn = () => {
    setCostsBtnState(true);
    setEditCostsInput(
      product?.costs
        ? product?.costs
        : {
            kilosComprados: "0",
            kilosXPrenda: "0",
            precioXKiloFinal: "0",
            porcentajeDeBeneficio: "0",
            costoFinal: "0",
          }
    );
  };

  const handleDetailsEdit = (e) => {
    setBtnState(false);

    setProduct({ ...product, details: editDetailsInput });
    dispatch(
      editProduct({
        ...product,
        details: editDetailsInput,
      })
    );
  };

  const total =
    product?.details &&
    Object.keys(product?.details).reduce((acc, el) => {
      return parseInt(product?.details[`${el}`]) + acc;
    }, 0);

  const handleCostsEdit = (e) => {
    setCostsBtnState(false);

    setProduct({
      ...product,
      costs: {
        ...editCostsInput,
        costoFinal: Math.ceil(
          (total * 1.21 * product?.costs?.porcentajeDeBeneficio) / 100 +
            total * 1.21
        ),
      },
    });

    dispatch(
      editProduct({
        ...product,
        costs: {
          ...editCostsInput,
          costoFinal: Math.ceil(
            (total * 1.21 * product?.costs?.porcentajeDeBeneficio) / 100 +
              total * 1.21
          ),
        },
      })
    );
  };

  const mediaSuma =
    parseInt(product?.details?.estampado) +
    parseInt(product?.details?.bordado) +
    parseInt(product?.details?.cintaReflexiva) +
    parseInt(product?.details?.peliculas);

  const salen =
    product?.costs?.kilosComprados && product?.costs?.kilosXPrenda
      ? product?.costs?.kilosComprados * product?.costs?.kilosXPrenda
      : "-";

  return (
    <div className={s.container}>
      <div>
        <h2>{product?.name}</h2>
        <h4>
          {product?.type?.charAt(0).toUpperCase() + product?.type?.slice(1)}
        </h4>
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
                        3
                      )}%`
                    : "-"}
                </p>
                <p>
                  {product?.details?.corte
                    ? `${String((product?.details?.corte / total) * 100).slice(
                        0,
                        3
                      )}%`
                    : "-"}
                </p>
                <p>
                  {product?.details?.costura
                    ? `${String(
                        (product?.details?.costura / total) * 100
                      ).slice(0, 3)}%`
                    : "-"}
                </p>
                <p>
                  {product?.details?.cierreDeCuello
                    ? `${String(
                        (product?.details?.cierreDeCuello / total) * 100
                      ).slice(0, 3)}%`
                    : "-"}
                </p>
                <p>
                  {product?.details?.ribsPuñoCuello
                    ? `${String(
                        (product?.details?.ribsPuñoCuello / total) * 100
                      ).slice(0, 3)}%`
                    : "-"}
                </p>
                <p>
                  {product?.details?.tancaYCordon
                    ? `${String(
                        (product?.details?.tancaYCordon / total) * 100
                      ).slice(0, 3)}%`
                    : "-"}
                </p>
                <p>
                  {product?.details?.velcro
                    ? `${String((product?.details?.velcro / total) * 100).slice(
                        0,
                        3
                      )}%`
                    : "-"}
                </p>
                <p>
                  {product?.details?.cordonElastico
                    ? `${String(
                        (product?.details?.cordonElastico / total) * 100
                      ).slice(0, 3)}%`
                    : "-"}
                </p>
                <p>
                  {product?.details?.hebillasLaterales
                    ? `${String(
                        (product?.details?.hebillasLaterales / total) * 100
                      ).slice(0, 3)}%`
                    : "-"}
                </p>
                <p>
                  {product?.details?.cierreLateral
                    ? `${String(
                        (product?.details?.cierreLateral / total) * 100
                      ).slice(0, 3)}%`
                    : "-"}
                </p>
                <p>
                  {product?.details?.bolsa
                    ? `${String((product?.details?.bolsa / total) * 100).slice(
                        0,
                        3
                      )}%`
                    : "-"}
                </p>
                <p id={s.total}></p>
                <p>
                  {product?.details?.estampado
                    ? `${String(
                        (product?.details?.estampado / total) * 100
                      ).slice(0, 3)}%`
                    : "-"}
                </p>
                <p>
                  {product?.details?.bordado
                    ? `${String(
                        (product?.details?.bordado / total) * 100
                      ).slice(0, 3)}%`
                    : "-"}
                </p>
                <p>
                  {product?.details?.cintaReflexiva
                    ? `${String(
                        (product?.details?.cintaReflexiva / total) * 100
                      ).slice(0, 3)}%`
                    : "-"}
                </p>
                <p>
                  {product?.details?.peliculas
                    ? `${String(
                        (product?.details?.peliculas / total) * 100
                      ).slice(0, 3)}%`
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
                  {product?.details?.tela
                    ? `$${Math.ceil(product?.details?.tela)}`
                    : "-"}
                </p>
                <p>
                  {product?.details?.tela
                    ? `$${Math.ceil(product?.details?.corte)}`
                    : "-"}
                </p>
                <p>
                  {product?.details?.tela
                    ? `$${Math.ceil(product?.details?.costura)}`
                    : "-"}
                </p>
                <p>
                  {product?.details?.cierreDeCuello
                    ? `$${Math.ceil(product?.details?.cierreDeCuello)}`
                    : "-"}
                </p>
                <p>
                  {product?.details?.ribsPuñoCuello
                    ? `$${Math.ceil(product?.details?.ribsPuñoCuello)}`
                    : "-"}
                </p>
                <p>
                  {product?.details?.tancaYCordon
                    ? `$${Math.ceil(product?.details?.tancaYCordon)}`
                    : "-"}
                </p>
                <p>
                  {product?.details?.velcro
                    ? `$${Math.ceil(product?.details?.velcro)}`
                    : "-"}
                </p>
                <p>
                  {product?.details?.cordonElastico
                    ? `$${Math.ceil(product?.details?.cordonElastico)}`
                    : "-"}
                </p>
                <p>
                  {product?.details?.hebillasLaterales
                    ? `$${Math.ceil(product?.details?.hebillasLaterales)}`
                    : "-"}
                </p>
                <p>
                  {product?.details?.cierreLateral
                    ? `$${Math.ceil(product?.details?.cierreLateral)}`
                    : "-"}
                </p>
                <p>
                  {product?.details?.bolsa
                    ? `$${Math.ceil(product?.details?.bolsa)}`
                    : "-"}
                </p>
                <p id={s.total}>{`$${
                  total === null ? "-" : Math.ceil(total) - mediaSuma
                }`}</p>
                <p>
                  {product?.details?.estampado
                    ? `$${Math.ceil(product?.details?.estampado)}`
                    : "-"}
                </p>
                <p>
                  {product?.details?.bordado
                    ? `$${Math.ceil(product?.details?.bordado)}`
                    : "-"}
                </p>
                <p>
                  {product?.details?.cintaReflexiva
                    ? `$${Math.ceil(product?.details?.cintaReflexiva)}`
                    : "-"}
                </p>
                <p>
                  {product?.details?.peliculas
                    ? `$${Math.ceil(product?.details?.peliculas)}`
                    : "-"}
                </p>
                <p id={s.total}>{`$${
                  total === null ? "-" : Math.ceil(total)
                }`}</p>
                <p id={s.total}>{`$${
                  total === null ? "-" : Math.ceil(total * 1.21)
                }`}</p>
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
                <p>Prendas por kilo</p>
                <p>Precio por Kilo Final</p>
                <p>Salen</p>
                <p id={s.total}>Precio Final Tela</p>
                <p>Porcentaje De Beneficio</p>
                <p id={s.total}>Precio Final</p>
                <p id={s.total}>Precio Final con Iva</p>
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
                <p id={s.salen}>{Math.floor(salen) || "-"}</p>
                <p id={s.total}>
                  {precioFinal !== "-" ? `$${precioFinal}` : "-"}
                </p>
                <p>
                  {product?.costs?.porcentajeDeBeneficio
                    ? `${product?.costs?.porcentajeDeBeneficio}%`
                    : "-"}
                </p>
                <p id={s.total}>{`$${
                  total === null || !product?.costs?.porcentajeDeBeneficio
                    ? "-"
                    : Math.ceil(
                        (total * product?.costs?.porcentajeDeBeneficio) / 100 +
                          total
                      )
                }`}</p>
                <p id={s.total}>{`$${
                  total === null || !product?.costs?.porcentajeDeBeneficio
                    ? "-"
                    : Math.ceil(
                        (total * 1.21 * product?.costs?.porcentajeDeBeneficio) /
                          100 +
                          total * 1.21
                      )
                }`}</p>
              </div>
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
                      type="number"
                      onChange={(e) => handleInputChange(e)}
                      value={
                        editDetailsInput?.tela
                          ? `${Math.ceil(editDetailsInput?.tela)}`
                          : "-"
                      }
                    />
                    <input
                      name="corte"
                      type="number"
                      onChange={(e) => handleInputChange(e)}
                      value={
                        editDetailsInput?.corte
                          ? `${Math.ceil(editDetailsInput?.corte)}`
                          : "-"
                      }
                    />
                    <input
                      name="costura"
                      type="number"
                      onChange={(e) => handleInputChange(e)}
                      value={
                        editDetailsInput?.costura
                          ? `${Math.ceil(editDetailsInput?.costura)}`
                          : "-"
                      }
                    />
                    <input
                      name="cierreDeCuello"
                      type="number"
                      onChange={(e) => handleInputChange(e)}
                      value={
                        editDetailsInput?.cierreDeCuello
                          ? `${Math.ceil(editDetailsInput?.cierreDeCuello)}`
                          : "-"
                      }
                    />
                    <input
                      name="ribsPuñoCuello"
                      type="number"
                      onChange={(e) => handleInputChange(e)}
                      value={
                        editDetailsInput?.ribsPuñoCuello
                          ? `${Math.ceil(editDetailsInput?.ribsPuñoCuello)}`
                          : "-"
                      }
                    />
                    <input
                      name="tancaYCordon"
                      type="number"
                      onChange={(e) => handleInputChange(e)}
                      value={
                        editDetailsInput?.tancaYCordon
                          ? `${Math.ceil(editDetailsInput?.tancaYCordon)}`
                          : "-"
                      }
                    />
                    <input
                      name="velcro"
                      type="number"
                      onChange={(e) => handleInputChange(e)}
                      value={
                        editDetailsInput?.velcro
                          ? `${Math.ceil(editDetailsInput?.velcro)}`
                          : "-"
                      }
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
                    <p>Cinta Reflexiva</p>
                    <p>Peliculas C/U</p>
                  </div>
                  <div className={s.modalLines}>
                    <input
                      name="cordonElastico"
                      type="number"
                      onChange={(e) => handleInputChange(e)}
                      value={
                        editDetailsInput?.cordonElastico
                          ? `${Math.ceil(editDetailsInput?.cordonElastico)}`
                          : "-"
                      }
                    />
                    <input
                      name="hebillasLaterales"
                      type="number"
                      onChange={(e) => handleInputChange(e)}
                      value={
                        editDetailsInput?.hebillasLaterales
                          ? `${Math.ceil(editDetailsInput?.hebillasLaterales)}`
                          : "-"
                      }
                    />
                    <input
                      name="cierreLateral"
                      type="number"
                      onChange={(e) => handleInputChange(e)}
                      value={
                        editDetailsInput?.cierreLateral
                          ? `${Math.ceil(editDetailsInput?.cierreLateral)}`
                          : "-"
                      }
                    />
                    <input
                      name="bolsa"
                      type="number"
                      onChange={(e) => handleInputChange(e)}
                      value={
                        editDetailsInput?.bolsa
                          ? `${Math.ceil(editDetailsInput?.bolsa)}`
                          : "-"
                      }
                    />
                    <input
                      name="estampado"
                      type="number"
                      onChange={(e) => handleInputChange(e)}
                      value={
                        editDetailsInput?.estampado
                          ? `${Math.ceil(editDetailsInput?.estampado)}`
                          : "-"
                      }
                    />
                    <input
                      name="bordado"
                      type="number"
                      onChange={(e) => handleInputChange(e)}
                      value={
                        editDetailsInput?.bordado
                          ? `${Math.ceil(editDetailsInput?.bordado)}`
                          : "-"
                      }
                    />
                    <input
                      name="cintaReflexiva"
                      type="number"
                      onChange={(e) => handleInputChange(e)}
                      value={
                        editDetailsInput?.cintaReflexiva
                          ? `${Math.ceil(editDetailsInput?.cintaReflexiva)}`
                          : "-"
                      }
                    />
                    <input
                      name="peliculas"
                      type="number"
                      onChange={(e) => handleInputChange(e)}
                      value={
                        editDetailsInput?.peliculas
                          ? `${Math.ceil(editDetailsInput?.peliculas)}`
                          : "-"
                      }
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
                    <p>Prendas por Kilo</p>
                    <p>Precio por Kilo Final</p>
                    <p>Porcentaje de Beneficio</p>
                  </div>
                  <div className={s.modalLines}>
                    <input
                      name="kilosComprados"
                      type="number"
                      onChange={(e) => handleCostsInputChange(e)}
                      value={editCostsInput?.kilosComprados || ""}
                    />
                    <input
                      name="kilosXPrenda"
                      type="number"
                      onChange={(e) => handleCostsInputChange(e)}
                      value={editCostsInput?.kilosXPrenda || ""}
                    />
                    <input
                      name="precioXKiloFinal"
                      type="number"
                      onChange={(e) => handleCostsInputChange(e)}
                      value={editCostsInput?.precioXKiloFinal || ""}
                    />
                    <input
                      name="porcentajeDeBeneficio"
                      type="number"
                      onChange={(e) => handleCostsInputChange(e)}
                      value={editCostsInput?.porcentajeDeBeneficio || ""}
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
