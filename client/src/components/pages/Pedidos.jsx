import s from "./Pedidos.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllClients,
  createPedido,
  getAllPedidos,
  editPedido,
  editSubPedido,
  deletePedido,
  getAllProducts,
  createSubPedido,
  deleteSubPedido,
  editProductStock,
  getProductCosts,
  getAllSubPedidos,
} from "../../redux/actions";
import Loader from "../Loader";

export default function Pedidos() {
  const dispatch = useDispatch();

  const stateAllPedidos = useSelector((state) =>
    state.allPedidos.filter((c) => !c.deleted)
  );
  const allClients = useSelector((state) =>
    state.allClients.filter((c) => !c.deleted)
  );
  const allProducts = useSelector((state) =>
    state.allProducts.filter((c) => !c.deleted)
  );

  const allPcosts = useSelector((state) => state.allPcosts);

  const [flag, setFlag] = useState(true);
  const [allPedidos, setAllPedidos] = useState([]);

  useEffect(() => {
    dispatch(getAllClients());
    dispatch(getAllProducts());
    dispatch(getAllPedidos());
    dispatch(getProductCosts());
    dispatch(getAllSubPedidos());
  }, []);

  useEffect(() => {
    if (flag && stateAllPedidos.length) {
      setAllPedidos(stateAllPedidos);
      setFlag(false);
    }
  }, [allProducts]);

  const [input, setInput] = useState({
    idCliente: "",
    pedidoDate: "",
    entregaDate: "",
    seña: "",
    entrego: false,
  });

  const [subInput, setSubInput] = useState({
    idPedido: "",
    idProducto: "",
    cantidad: "",
    total: "",
  });

  const [btnState, setBtnState] = useState(false);
  const [editBtnState, setEditBtnState] = useState(false);
  const [editProductBtnState, setEditProductBtnState] = useState(false);
  const [editBtnObj, setEditBtnObj] = useState({});
  const [editBtnProductObj, setEditBtnProductObj] = useState({});
  const [btnProductoState, setBtnProductoState] = useState(false);
  const [btnProductoStateContainer, setBtnProductoStateContainer] =
    useState(false);

  const [stockInsuficiente, setStockInsuficiente] = useState(false);
  const [productoExistente, setProductoExistente] = useState(false);

  const [decimalError, setDecimalError] = useState(false);

  const handleEntrego = (el, entrego) => {
    if (el.id) {
      dispatch(
        editPedido({
          ...el,
          entrego: !entrego,
        })
      );
      el.entrego = !entrego;
    } else {
      location.reload();
    }
  };

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditInputChange = (e) => {
    setEditBtnObj({
      ...editBtnObj,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditProductInputChange = (e) => {
    setEditBtnProductObj({
      ...editBtnProductObj,
      [e.target.name]: e.target.value,
    });
  };

  const handleProductoInputChange = (e) => {
    setSubInput({
      ...subInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setBtnState(false);
    dispatch(
      createPedido({
        ...input,
        subPedido: subInput,
      })
    );
    setAllPedidos([...allPedidos, { ...input, subPedido: subInput }]);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setEditBtnState(false);
    dispatch(editPedido(editBtnObj));
    let ped = allPedidos.filter((p) => p.id === editBtnObj.id);
    ped[0].pedidoDate = editBtnObj.pedidoDate;
    ped[0].entregaDate = editBtnObj.entregaDate;
    ped[0].seña = editBtnObj.seña;

    setAllPedidos([
      ...allPedidos.filter((p) => p.id !== editBtnObj.id),
      ped[0],
    ]);
  };

  const handleProductEdit = (e) => {
    e.preventDefault();
    let totalstr;
    totalstr =
      editBtnProductObj.cantidad *
      allPcosts.filter(
        (pc) =>
          pc.id ===
          allProducts.filter((p) => p.id === editBtnProductObj.productoId)[0]
            .pcostId
      )[0].costoFinal;

    totalstr = totalstr.toString();

    let can =
      parseInt(
        allProducts.filter((p) => p.id === editBtnProductObj.productoId)[0]
          ?.stock
      ) -
      editBtnProductObj.cantidad +
      parseInt(editBtnProductObj.initialStock);

    if (Number.isInteger(can)) {
      if (can >= 0) {
        dispatch(editSubPedido({ ...editBtnProductObj, total: totalstr }));
        setEditProductBtnState(false);
        dispatch(editProductStock(editBtnProductObj.productoId, can));
        allPedidos
          .filter((p) => p.id === editBtnProductObj.pedidoId)[0]
          .subPedidos.filter((c) => !c.deleted)
          .filter(
            (sp) => sp.productoId === editBtnProductObj.productoId
          )[0].cantidad = editBtnProductObj.cantidad;

        allPedidos
          .filter((p) => p.id === editBtnProductObj.pedidoId)[0]
          .subPedidos.filter((c) => !c.deleted)
          .filter(
            (sp) => sp.productoId === editBtnProductObj.productoId
          )[0].total =
          editBtnProductObj.cantidad *
          allPcosts.filter(
            (pc) =>
              pc.id ===
              allProducts.filter(
                (p) => p.id === editBtnProductObj.productoId
              )[0].pcostId
          )[0].costoFinal;

        allProducts.filter(
          (p) => p.id === editBtnProductObj.productoId
        )[0].stock = can;
      } else {
        setStockInsuficiente(true);
      }
    } else {
      setDecimalError(true);
    }
  };

  const handleAddProductoState = (e) => {
    e.preventDefault();
    setBtnProductoStateContainer(true);
  };

  const handleAddProducto = (e) => {
    let can =
      parseInt(
        allProducts.filter(
          (p) =>
            p.name === subInput.name &&
            p.color === subInput.color &&
            p.talle === subInput.talle
        )[0]?.stock
      ) - subInput.cantidad;

    let pedido = allPedidos.filter((p) => p.id === subInput.idPedido);
    let copy = pedido[0].subPedidos
      .filter((c) => !c.deleted)
      .filter(
        (s) =>
          s.productoId ===
          allProducts.filter(
            (p) =>
              p.name === subInput.name &&
              p.color === subInput.color &&
              p.talle === subInput.talle
          )[0]?.id
      );

    if (copy.length === 0) {
      if (Number.isInteger(can)) {
        if (can >= 0) {
          e.preventDefault();
          setBtnProductoStateContainer(false);
          let pcosto = allPcosts.filter(
            (pc) =>
              pc.id ===
              allProducts.filter(
                (p) =>
                  p.name === subInput.name &&
                  p.color === subInput.color &&
                  p.talle === subInput.talle
              )[0].pcostId
          )[0].costoFinal;
          let totalf = subInput.cantidad * pcosto;
          let totalstr = String(totalf);
          dispatch(
            createSubPedido({
              ...subInput,
              idProducto: allProducts.filter(
                (p) =>
                  p.name === subInput.name &&
                  p.color === subInput.color &&
                  p.talle === subInput.talle
              )[0]?.id,
              total: totalstr,
            })
          );

          allPedidos
            .filter((p) => p.id === subInput.idPedido)[0]
            .subPedidos.push({
              ...subInput,
              pedidoId: subInput.idPedido,
              deleted: false,
              productoId: allProducts.filter(
                (p) =>
                  p.name === subInput.name &&
                  p.color === subInput.color &&
                  p.talle === subInput.talle
              )[0]?.id,

              total: totalstr,
            }),
            dispatch(
              editProductStock(
                allProducts.filter(
                  (p) =>
                    p.name === subInput.name &&
                    p.color === subInput.color &&
                    p.talle === subInput.talle
                )[0]?.id,
                can
              )
            );
        } else {
          setStockInsuficiente(true);
        }
      } else {
        setDecimalError(true);
      }
    } else {
      setProductoExistente(true);
    }
  };

  const handleDeleteProductBtn = (id, productoId, cantidad, el) => {
    if (id) {
      allPedidos.filter((p) => p.id === el.pedidoId)[0].subPedidos = allPedidos
        .filter((p) => p.id === el.pedidoId)[0]
        .subPedidos.filter((sp) => sp.id !== el.id);
      let can =
        parseInt(allProducts.filter((p) => p.id === productoId)[0]?.stock) +
        parseInt(cantidad);

      dispatch(editProductStock(productoId, can));
      dispatch(deleteSubPedido(id));
    } else {
      location.reload();
    }
  };

  const handleDeleteBtn = (id, subPedidos) => {
    if (id) {
      setAllPedidos([...allPedidos.filter((p) => p.id !== id)]);
      dispatch(deletePedido(id));
    } else {
      location.reload();
    }

    if (subPedidos?.length) {
      subPedidos
        .filter((c) => !c.deleted)
        .forEach((el) => {
          handleDeleteProductBtn(el.id, el.productoId, el.cantidad);
        });
    }
  };

  const handleAddInputState = (id) => {
    if (id) {
      setBtnProductoState(true);
      subInput.idPedido = id;
    } else {
      location.reload();
    }
  };

  const handleEditProductList = (id, pedidoId) => {
    if (id) {
      setEditProductBtnState(true);
      setEditBtnProductObj({
        ...allPedidos
          .filter((p) => p.id === pedidoId)[0]
          .subPedidos.filter((s) => s.id === id)[0],
        initialStock: allPedidos
          .filter((p) => p.id === pedidoId)[0]
          .subPedidos.filter((s) => s.id === id)[0].cantidad,
      });
    } else {
      location.reload();
    }
  };

  const handleEditBtn = (id) => {
    if (id) {
      setEditBtnObj(allPedidos.filter((p) => p.id === id)[0]);
      setEditBtnState(true);
    } else {
      location.reload();
    }
  };

  let productoElegido = allProducts.filter((p) => p.name === subInput?.name)[0];

  const [facturaState, setFacturaState] = useState(false);
  const [facturaObj, setFacturaObj] = useState({});

  const handleFactura = (obj) => {
    if (obj.id) {
      setFacturaState(true);
      setFacturaObj(obj);
    } else {
      location.reload();
    }
  };

  return (
    <div className={s.container}>
      <div className={s.searchContainer}>
        <button onClick={() => setBtnState(true)} id={s.addBtn}>
          Agregar Nuevo Pedido
        </button>
      </div>
      <div className={s.grid}>
        <div className={s.gridTitles}>
          <p>Factura</p>
          <p>Cliente</p>
          <p>Productos</p>
          <p>Fecha de Pedido</p>
          <p>Fecha de Entrega</p>
          <p>Direccion</p>
          <p>Localidad</p>
          <p>Tel</p>
          <p>Total</p>
          <p>Seña</p>
          <p>Total sin Seña</p>
          <p>Entrego</p>
        </div>
        {allPedidos.length ? (
          allPedidos.map((el, index) => {
            return (
              <div key={index} className={s.gridLines}>
                <button onClick={() => handleFactura(el)}>Ver Factura</button>
                <p>
                  {el.clienteId
                    ? el.cliente?.redSocial
                    : allClients.filter((c) => c.id === el.idCliente)[0]
                        ?.redSocial}
                </p>
                <p
                  id={s.verProductos}
                  onClick={() => handleAddInputState(el.id)}
                >
                  VER PRODUCTOS
                </p>
                <p>{el.pedidoDate}</p>
                <p>{el.entregaDate || "-"}</p>
                <p>{el.cliente?.direccion || "-"}</p>
                <p>{el.cliente?.localidad || "-"}</p>
                <p>{el.cliente?.tel1 || "-"}</p>
                <p>
                  {!isNaN(
                    el.subPedidos
                      ?.filter((sp) => !sp.deleted)
                      .reduce((acc, el) => {
                        return parseFloat(el.total) + acc;
                      }, 0)
                  )
                    ? `$${Math.ceil(
                        el.subPedidos
                          ?.filter((sp) => !sp.deleted)
                          .reduce((acc, el) => {
                            return parseFloat(el.total) + acc;
                          }, 0)
                      )}`
                    : "-"}
                </p>
                <p>{el.seña !== "" ? `$${el.seña}` : "-"}</p>
                <p>
                  {!isNaN(
                    el.subPedidos
                      ?.filter((sp) => !sp.deleted)
                      .reduce((acc, el) => {
                        return parseInt(el.total) + acc;
                      }, 0) - el.seña
                  )
                    ? `$${Math.ceil(
                        el.subPedidos
                          ?.filter((sp) => !sp.deleted)
                          .reduce((acc, el) => {
                            return parseInt(el.total) + acc;
                          }, 0) - el.seña
                      )}`
                    : "-"}
                </p>
                <button
                  id={el.entrego ? s.entrego : s.noEntrego}
                  onClick={() => handleEntrego(el, el.entrego)}
                ></button>
                <button id={s.editBtn} onClick={() => handleEditBtn(el.id)}>
                  Editar
                </button>
                <button
                  id={s.deleteBtn}
                  onClick={() => handleDeleteBtn(el.id, el.subPedidos)}
                >
                  Eliminar
                </button>
              </div>
            );
          })
        ) : (
          <Loader />
        )}
      </div>

      {btnState && (
        <div className={s.modal}>
          <div className={s.modalContainer}>
            <p id={s.xProducto} onClick={() => setBtnState(false)}>
              ✖
            </p>
            <form>
              <div className={s.lineForm}>
                <label>Cliente</label>
                <select
                  onChange={(e) => handleInputChange(e)}
                  defaultValue="Elegir Cliente..."
                  name="idCliente"
                >
                  <option disabled>Elegir Cliente...</option>
                  {allClients.length &&
                    allClients
                      .sort((a, b) => a.redSocial.localeCompare(b.redSocial))
                      .map((el, index) => {
                        return (
                          <option key={index} value={el.id}>
                            {el.redSocial}
                          </option>
                        );
                      })}
                </select>
                <label>Fecha de Pedido</label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  type="date"
                  name="pedidoDate"
                />
                <label>Fecha de Entrega</label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  type="date"
                  name="entregaDate"
                />
                <label>Seña</label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  type="number"
                  name="seña"
                  min="0"
                />
              </div>
            </form>
            <button onClick={(e) => handleAdd(e)}>Agregar Pedido</button>
          </div>
        </div>
      )}

      {btnProductoState && (
        <div>
          <div className={s.modal}>
            <div className={s.modalContainer}>
              <p id={s.xProducto} onClick={() => setBtnProductoState(false)}>
                ✖
              </p>
              <div className={s.productosContainer}>
                <button onClick={(e) => handleAddProductoState(e)}>
                  Agregar Producto
                </button>
                <div className={s.divContainer}>
                  <div className={s.boxLine}>
                    <p>Nombre</p>
                    <p>Color</p>
                    <p>Talle</p>
                    <p>Cantidad</p>
                    <p>Precio</p>
                    <p></p>
                    <p></p>
                  </div>
                  {allPedidos
                    .filter((p) => p.id === subInput.idPedido)[0]
                    .subPedidos.filter((sp) => !sp.deleted)
                    .map((el, index) => {
                      return (
                        <div key={index} className={s.productsLine}>
                          <div className={s.txtContainer}>
                            <p>
                              {
                                allProducts.filter(
                                  (p) => p.id === el.productoId
                                )[0]?.name
                              }
                            </p>
                            <p>
                              {
                                allProducts.filter(
                                  (p) => p.id === el.productoId
                                )[0]?.color
                              }
                            </p>
                            <p>
                              {allProducts
                                .filter((p) => p.id === el.productoId)[0]
                                ?.talle.toUpperCase()}
                            </p>
                            <p>{el.cantidad}</p>
                            <p>
                              {allPcosts.filter(
                                (pc) =>
                                  pc.id ===
                                  allProducts.filter(
                                    (p) => p.id === el.productoId
                                  )[0]?.pcostId
                              )[0]?.costoFinal
                                ? `$${
                                    allPcosts.filter(
                                      (pc) =>
                                        pc.id ===
                                        allProducts.filter(
                                          (p) => p.id === el.productoId
                                        )[0].pcostId
                                    )[0].costoFinal
                                  }`
                                : "-"}
                            </p>
                            <button
                              id={s.editPBtn}
                              onClick={() =>
                                handleEditProductList(el.id, el.pedidoId)
                              }
                            >
                              Editar
                            </button>

                            <button
                              id={s.deletePBtn}
                              onClick={() =>
                                handleDeleteProductBtn(
                                  el.id,
                                  el.productoId,
                                  el.cantidad,
                                  el
                                )
                              }
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {editProductBtnState && (
        <div className={s.modal}>
          <div className={s.modalContainer}>
            <p id={s.xProducto} onClick={() => setEditProductBtnState(false)}>
              ✖
            </p>
            <form>
              <div className={s.lineForm}>
                <label>Cantidad</label>
                <input
                  onChange={(e) => handleEditProductInputChange(e)}
                  type="number"
                  name="cantidad"
                  value={editBtnProductObj.cantidad || ""}
                  min="0"
                />
                <p>
                  {`Stock: ${
                    allProducts.filter(
                      (p) => p.id === editBtnProductObj.productoId
                    )[0]?.stock
                      ? allProducts.filter(
                          (p) => p.id === editBtnProductObj.productoId
                        )[0]?.stock
                      : "..."
                  }`}
                </p>
              </div>
            </form>
            <button onClick={(e) => handleProductEdit(e)}>Editar</button>
          </div>
        </div>
      )}

      {btnProductoStateContainer && (
        <div className={s.modal}>
          <div className={s.modalContainer}>
            <p
              id={s.xProducto}
              onClick={() => setBtnProductoStateContainer(false)}
            >
              ✖
            </p>
            <form>
              <div className={s.lineForm}>
                <label>Producto</label>
                <select
                  onChange={(e) => handleProductoInputChange(e)}
                  defaultValue="Elegir Producto..."
                  name="name"
                >
                  <option disabled>Elegir Producto...</option>
                  {allProducts.length &&
                    allProducts
                      .filter(
                        (value, index, self) =>
                          index === self.findIndex((t) => t.name === value.name)
                      )
                      .map((el, index) => {
                        return (
                          <option key={index} value={el.name}>
                            {el.name}
                          </option>
                        );
                      })}
                </select>
                <label>Color</label>
                <select
                  onChange={(e) => handleProductoInputChange(e)}
                  defaultValue="Elegir Color..."
                  name="color"
                >
                  <option disabled>Elegir Color...</option>
                  <option value="blanco">Blanco</option>
                  <option value="negro">Negro</option>
                  <option value="gris">Gris</option>
                  <option value="azul marino">Azul Marino</option>
                  <option value="otro">Otro</option>
                </select>

                <label>Talle</label>
                <select
                  onChange={(e) => handleProductoInputChange(e)}
                  defaultValue="Elegir Talle..."
                  name="talle"
                >
                  <option disabled>Elegir Talle...</option>
                  {productoElegido?.type === "pantalon" ||
                  productoElegido?.type === "camisa" ? (
                    <>
                      <option value="36">36</option>
                      <option value="38">38</option>
                      <option value="40">40</option>
                      <option value="42">42</option>
                      <option value="44">44</option>
                      <option value="46">46</option>
                      <option value="48">48</option>
                      <option value="50">50</option>
                      <option value="52">52</option>
                      <option value="54">54</option>
                      <option value="56">56</option>
                      <option value="58">58</option>
                      <option value="60">60</option>
                    </>
                  ) : (
                    <>
                      <option value="xs">XS</option>
                      <option value="s">S</option>
                      <option value="m">M</option>
                      <option value="l">L</option>
                      <option value="xl">XL</option>
                      <option value="xxl">XXL</option>
                      <option value="xxxl">XXXL</option>
                    </>
                  )}
                </select>

                <label>Cantidad</label>
                <input
                  onChange={(e) => handleProductoInputChange(e)}
                  type="number"
                  name="cantidad"
                  min="0"
                />
                <p>
                  {`Stock: ${
                    allProducts.filter(
                      (p) =>
                        p.name === subInput.name &&
                        p.color === subInput.color &&
                        p.talle === subInput.talle
                    )[0]?.stock
                      ? allProducts.filter(
                          (p) =>
                            p.name === subInput.name &&
                            p.color === subInput.color &&
                            p.talle === subInput.talle
                        )[0]?.stock
                      : "..."
                  }`}
                </p>
              </div>
            </form>
            <button onClick={(e) => handleAddProducto(e)}>
              Agregar Producto
            </button>
          </div>
        </div>
      )}

      {stockInsuficiente && (
        <div className={s.modal}>
          <div className={s.modalContainer}>
            <p id={s.xProducto} onClick={() => setStockInsuficiente(false)}>
              ✖
            </p>
            <p id={s.stockInsuficiente}>STOCK INSUFICIENTE</p>
          </div>
        </div>
      )}

      {decimalError && (
        <div className={s.modal}>
          <div className={s.modalContainer}>
            <p id={s.xProducto} onClick={() => setDecimalError(false)}>
              ✖
            </p>
            <p id={s.stockInsuficiente}>INGRESE UN NUMERO ENTERO</p>
          </div>
        </div>
      )}

      {productoExistente && (
        <div className={s.modal}>
          <div className={s.modalContainer}>
            <p id={s.xProducto} onClick={() => setProductoExistente(false)}>
              ✖
            </p>
            <p id={s.stockInsuficiente}>PRODUCTO YA INGRESADO.</p>
          </div>
        </div>
      )}

      {facturaState && (
        <div className={s.modal}>
          <div className={s.modalContainer}>
            <p id={s.xProducto} onClick={() => setFacturaState(false)}>
              ✖
            </p>
            <div className={s.factura}>
              <div className={s.facturaHeader}>
                <div>
                  <h2>Pertex</h2>
                  <h2>Indumentaria</h2>
                </div>
                <div className={s.headerTxt}>
                  <p>Enrique Portabales</p>
                  <div className={s.celContainer}>
                    <div className={s.cel}>
                      <p>Cel:</p>
                      <p>11 58175400</p>
                    </div>
                    <div className={s.cel}>
                      <p></p>
                      <p>11 38821606</p>
                    </div>
                  </div>
                  <p>Email: e.portabales@hotmail.com</p>
                </div>
              </div>
              <div className={s.facturaBody}>
                <div className={s.nota}>
                  <h4>Nota de pedido</h4>
                  <div className={s.fecha}>
                    <h5>ID: {facturaObj.id}</h5>
                    <h4>{facturaObj.pedidoDate || "______________"}</h4>
                  </div>
                </div>
                <div className={s.lines}>
                  <h3>Cliente: {facturaObj.cliente?.redSocial}</h3>
                  <h3>
                    Domicilio:
                    {` ${facturaObj.cliente?.direccion || "______________"} N°${
                      facturaObj.cliente?.ndireccion || "______"
                    } (${facturaObj.cliente?.localidad || " ____________"})`}
                  </h3>
                  <div className={s.tel}>
                    <h3>
                      Tel: {facturaObj.cliente?.tel1 || "________________"}
                    </h3>
                    <h3>Cel: {facturaObj.cliente?.celular || "___________"}</h3>
                  </div>
                </div>
                <h3 id={s.pedido}>Pedido</h3>
                <div className={s.pedidoContainer}>
                  <div className={s.facturaTitles}>
                    <p id={s.cant}>Cant.</p>
                    <p id={s.producto}>Producto</p>
                    <p>Prec. Unit.</p>
                    <p>Total</p>
                  </div>
                  <div>
                    {facturaObj.subPedidos
                      .filter((c) => !c.deleted)
                      .map((el, index) => {
                        return (
                          <div key={index} className={s.line}>
                            <p id={s.cant}>{el.cantidad}</p>
                            <p id={s.producto}>
                              {
                                allProducts.filter(
                                  (p) => p.id === el.productoId
                                )[0]?.name
                              }
                            </p>
                            <p>
                              {allPcosts.filter(
                                (pc) =>
                                  pc.id ===
                                  allProducts.filter(
                                    (p) => p.id === el.productoId
                                  )[0].pcostId
                              )[0].costoFinal
                                ? `$${
                                    allPcosts.filter(
                                      (pc) =>
                                        pc.id ===
                                        allProducts.filter(
                                          (p) => p.id === el.productoId
                                        )[0].pcostId
                                    )[0].costoFinal
                                  }`
                                : "-"}
                            </p>
                            <p>{el.total !== null ? `$${el.total}` : "-"}</p>
                          </div>
                        );
                      })}
                    <div className={s.line}>
                      <p id={s.cant}></p>
                      <p id={s.producto}></p>
                      <p>Total</p>
                      <p>
                        {!isNaN(
                          Math.ceil(
                            facturaObj.subPedidos
                              .filter((s) => !s.deleted)
                              .reduce((acc, el) => {
                                return parseInt(el.total) + acc;
                              }, 0)
                          )
                        )
                          ? `$${Math.ceil(
                              facturaObj.subPedidos
                                .filter((s) => !s.deleted)
                                .reduce((acc, el) => {
                                  return parseInt(el.total) + acc;
                                }, 0)
                            )}`
                          : "-"}
                      </p>
                    </div>
                    <div className={s.line}>
                      <p id={s.cant}></p>
                      <p id={s.producto}></p>
                      <p>Total sin Seña</p>
                      <p>
                        {!isNaN(
                          Math.ceil(
                            facturaObj.subPedidos
                              .filter((s) => !s.deleted)
                              .reduce((acc, el) => {
                                return parseInt(el.total) + acc;
                              }, 0) - facturaObj.seña
                          )
                        )
                          ? `$${Math.ceil(
                              facturaObj.subPedidos
                                .filter((s) => !s.deleted)
                                .reduce((acc, el) => {
                                  return parseInt(el.total) + acc;
                                }, 0) - facturaObj.seña
                            )}`
                          : "-"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className={s.lines}>
                  <div className={s.tel}>
                    <h3>
                      Seña:{" "}
                      {facturaObj.seña ? `$${facturaObj.seña}` : "_________"}
                    </h3>
                    <h3>
                      Fecha de Entrega: {facturaObj.entregaDate || "__________"}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {editBtnState && (
        <div className={s.modal}>
          <div className={s.modalContainer}>
            <p id={s.xProducto} onClick={() => setEditBtnState(false)}>
              ✖
            </p>
            <form>
              <div className={s.lineForm}>
                <label>Fecha de Pedido</label>
                <input
                  onChange={(e) => handleEditInputChange(e)}
                  type="date"
                  name="pedidoDate"
                  value={editBtnObj.pedidoDate || ""}
                />
                <label>Fecha de Entrega</label>
                <input
                  onChange={(e) => handleEditInputChange(e)}
                  type="date"
                  name="entregaDate"
                  value={editBtnObj.entregaDate || ""}
                />
                <label>Seña</label>
                <input
                  onChange={(e) => handleEditInputChange(e)}
                  type="number"
                  name="seña"
                  value={editBtnObj.seña || ""}
                  min="0"
                />
              </div>
            </form>
            <button onClick={(e) => handleEdit(e)}>Editar Pedido</button>
          </div>
        </div>
      )}
    </div>
  );
}
