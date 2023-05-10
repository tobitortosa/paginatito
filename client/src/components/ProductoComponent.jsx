import { useState, useEffect } from "react";
import { useSelector, useDispatch, Provider } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getAllProducts,
  getProductCosts,
  editProductCosts,
  getProductDetails,
  editProductDetails,
} from "../redux/actions";
import s from "./ProductoComponent.module.css";

export default function ProductoComponent() {
  const { productName } = useParams();

  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);
  const allPcosts = useSelector((state) => state.allPcosts);
  const allPdetails = useSelector((state) => state.allPdetails);

  const [btnState, setBtnState] = useState(false);
  const [costsBtnState, setCostsBtnState] = useState(false);
  const [editDetailsInput, setEditDetailsInput] = useState({});
  const [editCostsInput, setEditCostsInput] = useState({});
  const [finalCostsObj, setFinalCostsObj] = useState({});
  const [finalDetailsObj, setFinalDetailsObj] = useState({});
  const [product, setProduct] = useState({});
  const [flag, setFlag] = useState(true);
  const costs = allPcosts.filter((pc) => pc.id === product.pcostId)[0];
  const details = allPdetails.filter((pd) => pd.id === product.pdetailId)[0];
  const precioFinal =
    finalCostsObj.kilosComprados && finalCostsObj.precioXKiloFinal
      ? finalCostsObj.kilosComprados * (finalCostsObj.precioXKiloFinal * 1.21)
      : costs?.kilosComprados * (costs?.precioXKiloFinal * 1.21);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getProductCosts());
    dispatch(getProductDetails());
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

    if (Object.keys(finalDetailsObj).length) {
      setEditDetailsInput(finalDetailsObj);
    } else {
      setEditDetailsInput({
        ...details,
      });
    }
  };

  const handleEditCostsBtn = () => {
    setCostsBtnState(true);

    if (Object.keys(finalCostsObj).length) {
      setEditCostsInput(finalCostsObj);
    } else {
      setEditCostsInput({
        ...costs,
      });
    }
  };

  const total = Object.keys(finalDetailsObj).length
    ? Object.keys(finalDetailsObj)
        .filter((k) => k !== "id")
        .reduce((acc, el) => {
          return parseInt(finalDetailsObj[`${el}`]) + acc;
        }, 0)
    : details
    ? Object.keys(details)
        .filter((k) => k !== "id")
        .reduce((acc, el) => {
          return parseInt(details[`${el}`]) + acc;
        }, 0)
    : 0;

  const handleDetailsEdit = (e) => {
    setBtnState(false);
    setFinalDetailsObj(editDetailsInput);
    dispatch(editProductDetails(editDetailsInput));

    let totalEdit = Object.keys(editDetailsInput)
      .filter((k) => k !== "id")
      .reduce((acc, el) => {
        return parseInt(editDetailsInput[`${el}`]) + acc;
      }, 0);

    if (finalCostsObj.porcentajeDeBeneficio) {
      dispatch(
        editProductCosts({
          ...finalCostsObj,
          costoFinal: Math.ceil(
            (totalEdit * 1.21 * finalCostsObj.porcentajeDeBeneficio) / 100 +
              totalEdit * 1.21
          ),
        })
      );
    } else {
      dispatch(
        editProductCosts({
          ...costs,
          costoFinal: Math.ceil(
            (totalEdit * 1.21 * costs.porcentajeDeBeneficio) / 100 +
              totalEdit * 1.21
          ),
        })
      );
    }
  };

  const handleCostsEdit = (e) => {
    setCostsBtnState(false);

    setFinalCostsObj({
      ...editCostsInput,
      costoFinal: Math.ceil(
        (total * 1.21 * editCostsInput.porcentajeDeBeneficio) / 100 +
          total * 1.21
      ),
    });

    dispatch(
      editProductCosts({
        ...editCostsInput,
        costoFinal: Math.ceil(
          (total * 1.21 * editCostsInput.porcentajeDeBeneficio) / 100 +
            total * 1.21
        ),
      })
    );
  };

  const mediaSuma = Object.keys(finalDetailsObj).length
    ? parseInt(finalDetailsObj.estampado) +
      parseInt(finalDetailsObj.bordado) +
      parseInt(finalDetailsObj.cintaReflexiva) +
      parseInt(finalDetailsObj.peliculas)
    : parseInt(details?.estampado) +
      parseInt(details?.bordado) +
      parseInt(details?.cintaReflexiva) +
      parseInt(details?.peliculas);

  const salen =
    finalCostsObj.kilosComprados && finalCostsObj.kilosXPrenda
      ? finalCostsObj.kilosComprados * finalCostsObj.kilosXPrenda
      : costs?.kilosComprados * costs?.kilosXPrenda;

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
                  {finalDetailsObj.tela && total !== 0
                    ? `${String(
                        (parseFloat(finalDetailsObj.tela) / total) * 100
                      ).slice(0, 3)}%`
                    : total !== 0
                    ? `${String((details?.tela / total) * 100).slice(0, 3)}%`
                    : "-"}
                </p>
                <p>
                  {finalDetailsObj.corte && total !== 0
                    ? `${String(
                        (parseFloat(finalDetailsObj.corte) / total) * 100
                      ).slice(0, 3)}%`
                    : total !== 0
                    ? `${String((details?.corte / total) * 100).slice(0, 3)}%`
                    : "-"}
                </p>
                <p>
                  {finalDetailsObj.costura && total !== 0
                    ? `${String(
                        (parseFloat(finalDetailsObj.costura) / total) * 100
                      ).slice(0, 3)}%`
                    : total !== 0
                    ? `${String((details?.costura / total) * 100).slice(0, 3)}%`
                    : "-"}
                </p>
                <p>
                  {finalDetailsObj.cierreDeCuello && total !== 0
                    ? `${String(
                        (parseFloat(finalDetailsObj.cierreDeCuello) / total) *
                          100
                      ).slice(0, 3)}%`
                    : total !== 0
                    ? `${String((details?.cierreDeCuello / total) * 100).slice(
                        0,
                        3
                      )}%`
                    : "-"}
                </p>
                <p>
                  {finalDetailsObj.ribsPuñoCuello && total !== 0
                    ? `${String(
                        (parseFloat(finalDetailsObj.ribsPuñoCuello) / total) *
                          100
                      ).slice(0, 3)}%`
                    : total !== 0
                    ? `${String((details?.ribsPuñoCuello / total) * 100).slice(
                        0,
                        3
                      )}%`
                    : "-"}
                </p>
                <p>
                  {finalDetailsObj.tancaYCordon && total !== 0
                    ? `${String(
                        (parseFloat(finalDetailsObj.tancaYCordon) / total) * 100
                      ).slice(0, 3)}%`
                    : total !== 0
                    ? `${String((details?.tancaYCordon / total) * 100).slice(
                        0,
                        3
                      )}%`
                    : "-"}
                </p>
                <p>
                  {finalDetailsObj.velcro && total !== 0
                    ? `${String(
                        (parseFloat(finalDetailsObj.velcro) / total) * 100
                      ).slice(0, 3)}%`
                    : total !== 0
                    ? `${String((details?.velcro / total) * 100).slice(0, 3)}%`
                    : "-"}
                </p>
                <p>
                  {finalDetailsObj.cordonElastico && total !== 0
                    ? `${String(
                        (parseFloat(finalDetailsObj.cordonElastico) / total) *
                          100
                      ).slice(0, 3)}%`
                    : total !== 0
                    ? `${String((details?.cordonElastico / total) * 100).slice(
                        0,
                        3
                      )}%`
                    : "-"}
                </p>
                <p>
                  {finalDetailsObj.hebillasLaterales && total !== 0
                    ? `${String(
                        (parseFloat(finalDetailsObj.hebillasLaterales) /
                          total) *
                          100
                      ).slice(0, 3)}%`
                    : total !== 0
                    ? `${String(
                        (details?.hebillasLaterales / total) * 100
                      ).slice(0, 3)}%`
                    : "-"}
                </p>
                <p>
                  {finalDetailsObj.cierreLateral && total !== 0
                    ? `${String(
                        (parseFloat(finalDetailsObj.cierreLateral) / total) *
                          100
                      ).slice(0, 3)}%`
                    : total !== 0
                    ? `${String((details?.cierreLateral / total) * 100).slice(
                        0,
                        3
                      )}%`
                    : "-"}
                </p>
                <p>
                  {finalDetailsObj.bolsa && total !== 0
                    ? `${String(
                        (parseFloat(finalDetailsObj.bolsa) / total) * 100
                      ).slice(0, 3)}%`
                    : total !== 0
                    ? `${String((details?.bolsa / total) * 100).slice(0, 3)}%`
                    : "-"}
                </p>
                <p id={s.total}></p>
                <p>
                  {finalDetailsObj.estampado && total !== 0
                    ? `${String(
                        (parseFloat(finalDetailsObj.estampado) / total) * 100
                      ).slice(0, 3)}%`
                    : total !== 0
                    ? `${String((details?.estampado / total) * 100).slice(
                        0,
                        3
                      )}%`
                    : "-"}
                </p>
                <p>
                  {finalDetailsObj.bordado && total !== 0
                    ? `${String(
                        (parseFloat(finalDetailsObj.bordado) / total) * 100
                      ).slice(0, 3)}%`
                    : total !== 0
                    ? `${String((details?.bordado / total) * 100).slice(0, 3)}%`
                    : "-"}
                </p>
                <p>
                  {finalDetailsObj.cintaReflexiva && total !== 0
                    ? `${String(
                        (parseFloat(finalDetailsObj.cintaReflexiva) / total) *
                          100
                      ).slice(0, 3)}%`
                    : total !== 0
                    ? `${String((details?.cintaReflexiva / total) * 100).slice(
                        0,
                        3
                      )}%`
                    : "-"}
                </p>
                <p>
                  {finalDetailsObj.peliculas && total !== 0
                    ? `${String(
                        (parseFloat(finalDetailsObj.peliculas) / total) * 100
                      ).slice(0, 3)}%`
                    : total !== 0
                    ? `${String((details?.peliculas / total) * 100).slice(
                        0,
                        3
                      )}%`
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
                  {finalDetailsObj.tela
                    ? `$${Math.ceil(finalDetailsObj.tela)}`
                    : `$${Math.ceil(details?.tela)}`}
                </p>
                <p>
                  {finalDetailsObj.corte
                    ? `$${Math.ceil(finalDetailsObj.corte)}`
                    : `$${Math.ceil(details?.corte)}`}
                </p>
                <p>
                  {finalDetailsObj.costura
                    ? `$${Math.ceil(finalDetailsObj.costura)}`
                    : `$${Math.ceil(details?.costura)}`}
                </p>
                <p>
                  {finalDetailsObj.cierreDeCuello
                    ? `$${Math.ceil(finalDetailsObj.cierreDeCuello)}`
                    : `$${Math.ceil(details?.cierreDeCuello)}`}
                </p>
                <p>
                  {finalDetailsObj.ribsPuñoCuello
                    ? `$${Math.ceil(finalDetailsObj.ribsPuñoCuello)}`
                    : `$${Math.ceil(details?.ribsPuñoCuello)}`}
                </p>
                <p>
                  {finalDetailsObj.tancaYCordon
                    ? `$${Math.ceil(finalDetailsObj.tancaYCordon)}`
                    : `$${Math.ceil(details?.tancaYCordon)}`}
                </p>
                <p>
                  {finalDetailsObj.velcro
                    ? `$${Math.ceil(finalDetailsObj.velcro)}`
                    : `$${Math.ceil(details?.velcro)}`}
                </p>
                <p>
                  {finalDetailsObj.cordonElastico
                    ? `$${Math.ceil(finalDetailsObj.cordonElastico)}`
                    : `$${Math.ceil(details?.cordonElastico)}`}
                </p>
                <p>
                  {finalDetailsObj.hebillasLaterales
                    ? `$${Math.ceil(finalDetailsObj.hebillasLaterales)}`
                    : `$${Math.ceil(details?.hebillasLaterales)}`}
                </p>
                <p>
                  {finalDetailsObj.cierreLateral
                    ? `$${Math.ceil(finalDetailsObj.cierreLateral)}`
                    : `$${Math.ceil(details?.cierreLateral)}`}
                </p>
                <p>
                  {finalDetailsObj.bolsa
                    ? `$${Math.ceil(finalDetailsObj.bolsa)}`
                    : `$${Math.ceil(details?.bolsa)}`}
                </p>
                <p id={s.total}>{`$${Math.ceil(total - mediaSuma)}`}</p>
                <p>
                  {finalDetailsObj.estampado
                    ? `$${Math.ceil(finalDetailsObj.estampado)}`
                    : `$${Math.ceil(details?.estampado)}`}
                </p>
                <p>
                  {finalDetailsObj.bordado
                    ? `$${Math.ceil(finalDetailsObj.bordado)}`
                    : `$${Math.ceil(details?.bordado)}`}
                </p>
                <p>
                  {finalDetailsObj.cintaReflexiva
                    ? `$${Math.ceil(finalDetailsObj.cintaReflexiva)}`
                    : `$${Math.ceil(details?.cintaReflexiva)}`}
                </p>
                <p>
                  {finalDetailsObj.cintaReflexiva
                    ? `$${Math.ceil(finalDetailsObj.cintaReflexiva)}`
                    : `$${Math.ceil(details?.cintaReflexiva)}`}
                </p>
                <p id={s.total}>{`$${Math.ceil(total)}`}</p>
                <p id={s.total}>{`$${Math.ceil(total * 1.21)}`}</p>
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
                  {finalCostsObj.kilosComprados
                    ? finalCostsObj.kilosComprados
                    : costs?.kilosComprados}
                </p>
                <p>
                  {finalCostsObj.kilosXPrenda
                    ? finalCostsObj.kilosXPrenda
                    : costs?.kilosXPrenda}
                </p>
                <p>{`$${
                  finalCostsObj.precioXKiloFinal
                    ? finalCostsObj.precioXKiloFinal
                    : costs?.precioXKiloFinal
                }`}</p>
                <p id={s.salen}>{Math.floor(salen)}</p>
                <p id={s.total}>{`$${precioFinal}`}</p>
                <p>{`${
                  finalCostsObj.porcentajeDeBeneficio
                    ? finalCostsObj.porcentajeDeBeneficio
                    : costs?.porcentajeDeBeneficio
                }%`}</p>
                <p id={s.total}>
                  {finalCostsObj.porcentajeDeBeneficio
                    ? `$${Math.ceil(
                        (total * finalCostsObj.porcentajeDeBeneficio) / 100 +
                          total
                      )}`
                    : `$${Math.ceil(
                        (total * costs?.porcentajeDeBeneficio) / 100 + total
                      )}`}
                </p>
                <p id={s.total}>
                  {finalCostsObj.porcentajeDeBeneficio
                    ? `$${Math.ceil(
                        ((total * finalCostsObj.porcentajeDeBeneficio) / 100 +
                          total) *
                          1.21
                      )}`
                    : `$${Math.ceil(
                        ((total * costs?.porcentajeDeBeneficio) / 100 + total) *
                          1.21
                      )}`}
                </p>
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
              <p id={s.aviso}>Dejar 0 si no se utiliza</p>
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
                      value={Math.ceil(editDetailsInput?.tela)}
                    />
                    <input
                      name="corte"
                      type="number"
                      onChange={(e) => handleInputChange(e)}
                      value={Math.ceil(editDetailsInput?.corte)}
                    />
                    <input
                      name="costura"
                      type="number"
                      onChange={(e) => handleInputChange(e)}
                      value={Math.ceil(editDetailsInput?.costura)}
                    />
                    <input
                      name="cierreDeCuello"
                      type="number"
                      onChange={(e) => handleInputChange(e)}
                      value={Math.ceil(editDetailsInput?.cierreDeCuello)}
                    />
                    <input
                      name="ribsPuñoCuello"
                      type="number"
                      onChange={(e) => handleInputChange(e)}
                      value={Math.ceil(editDetailsInput?.ribsPuñoCuello)}
                    />
                    <input
                      name="tancaYCordon"
                      type="number"
                      onChange={(e) => handleInputChange(e)}
                      value={Math.ceil(editDetailsInput?.tancaYCordon)}
                    />
                    <input
                      name="velcro"
                      type="number"
                      onChange={(e) => handleInputChange(e)}
                      value={Math.ceil(editDetailsInput?.velcro)}
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
                    <p>Cinta Reflectiva</p>
                    <p>Peliculas C/U</p>
                  </div>
                  <div className={s.modalLines}>
                    <input
                      name="cordonElastico"
                      type="number"
                      onChange={(e) => handleInputChange(e)}
                      value={Math.ceil(editDetailsInput?.cordonElastico)}
                    />
                    <input
                      name="hebillasLaterales"
                      type="number"
                      onChange={(e) => handleInputChange(e)}
                      value={Math.ceil(editDetailsInput?.hebillasLaterales)}
                    />
                    <input
                      name="cierreLateral"
                      type="number"
                      onChange={(e) => handleInputChange(e)}
                      value={Math.ceil(editDetailsInput?.cierreLateral)}
                    />
                    <input
                      name="bolsa"
                      type="number"
                      onChange={(e) => handleInputChange(e)}
                      value={Math.ceil(editDetailsInput?.bolsa)}
                    />
                    <input
                      name="estampado"
                      type="number"
                      onChange={(e) => handleInputChange(e)}
                      value={Math.ceil(editDetailsInput?.estampado)}
                    />
                    <input
                      name="bordado"
                      type="number"
                      onChange={(e) => handleInputChange(e)}
                      value={Math.ceil(editDetailsInput?.bordado)}
                    />
                    <input
                      name="cintaReflexiva"
                      type="number"
                      onChange={(e) => handleInputChange(e)}
                      value={Math.ceil(editDetailsInput?.cintaReflexiva)}
                    />
                    <input
                      name="peliculas"
                      type="number"
                      onChange={(e) => handleInputChange(e)}
                      value={Math.ceil(editDetailsInput?.peliculas)}
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
                      value={editCostsInput.kilosComprados}
                    />
                    <input
                      name="kilosXPrenda"
                      type="number"
                      onChange={(e) => handleCostsInputChange(e)}
                      value={editCostsInput.kilosXPrenda}
                    />
                    <input
                      name="precioXKiloFinal"
                      type="number"
                      onChange={(e) => handleCostsInputChange(e)}
                      value={editCostsInput.precioXKiloFinal}
                    />
                    <input
                      name="porcentajeDeBeneficio"
                      type="number"
                      onChange={(e) => handleCostsInputChange(e)}
                      value={editCostsInput.porcentajeDeBeneficio}
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
