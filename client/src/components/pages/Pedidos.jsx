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
} from "../../redux/actions";

export default function Pedidos() {
  const dispatch = useDispatch();

  const allPedidos = useSelector((state) =>
    state.allPedidos.filter((c) => !c.deleted)
  );
  const allClients = useSelector((state) =>
    state.allClients.filter((c) => !c.deleted)
  );
  const allProducts = useSelector((state) =>
    state.allProducts.filter((c) => !c.deleted)
  );
  console.log(allPedidos);

  const [searchBarInput, setSearchBarInput] = useState("");
  const handleClientSearchInput = (e) => {
    setSearchBarInput(e.target.value);
  };

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

  const [btnEntrego, setBtnEntrego] = useState();
  const [btnState, setBtnState] = useState(false);
  const [editBtnState, setEditBtnState] = useState(false);
  const [editProductBtnState, setEditProductBtnState] = useState(false);
  const [editBtnObj, setEditBtnObj] = useState({});
  const [editBtnProductObj, setEditBtnProductObj] = useState({});
  const [btnProductoState, setBtnProductoState] = useState(false);
  const [btnProductoStateContainer, setBtnProductoStateContainer] =
    useState(false);

  const [stockInsuficiente, setStockInsuficiente] = useState(false);

  console.log(subInput);
  const [reload, setReload] = useState(0);

  const handleEntrego = (el, entrego) => {
    console.log(!entrego);
    setBtnEntrego(!entrego);
    dispatch(
      editPedido({
        ...el,
        entrego: !entrego,
      })
    );
  };

  useEffect(() => {
    dispatch(getAllClients());
    dispatch(getAllPedidos());
    dispatch(getAllProducts());
  }, [reload, btnEntrego, btnState]);

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
    setReload(1);
    dispatch(
      createPedido({
        ...input,
        subPedido: subInput,
      })
    );
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setEditBtnState(false);
    dispatch(editPedido(editBtnObj));
    setReload(2);
  };

  const handleProductEdit = (e) => {
    e.preventDefault();
    setEditProductBtnState(false);
    let totalstr;
    totalstr =
      editBtnProductObj.cantidad *
      allProducts.filter((p) => p.id === editBtnProductObj.productoId)[0].costs
        .costoFinal;
    totalstr = totalstr.toString();
    dispatch(editSubPedido({ ...editBtnProductObj, total: totalstr }));
    setReload(3);
  };

  const handleAddProductoState = (e) => {
    e.preventDefault();
    setBtnProductoStateContainer(true);
  };

  const handleAddProducto = (e) => {
    if (
      allProducts.filter((p) => p.id !== subInput.idProducto)[0].stock -
        subInput.cantidad <
      1
    ) {
      e.preventDefault();
      setBtnProductoStateContainer(false);
      dispatch(
        createSubPedido({
          ...subInput,
          total:
            subInput.cantidad *
            allProducts.filter((p) => p.id === subInput.idProducto)[0].costs
              .costoFinal,
        })
      );
      dispatch(editProductStock(subInput.idProducto, subInput.cantidad));
      setReload(4);
    } else {
      console.log("!");
      setStockInsuficiente(true);
    }
  };

  const handleDeleteBtn = (id) => {
    setEditBtnObj({});
    dispatch(deletePedido(id));
    setReload(5);
  };

  const handleDeleteProductBtn = (id) => {
    dispatch(deleteSubPedido(id));
    setEditBtnObj({});
    setReload(6);
  };

  console.log(allProducts);

  const handleAddInputState = (id) => {
    setBtnProductoState(true);
    subInput.idPedido = id;
  };

  const handleEditProductList = (id, pedidoId) => {
    setEditProductBtnState(true);
    setEditBtnProductObj({
      ...allPedidos
        .filter((p) => p.id === pedidoId)[0]
        .subPedidos.filter((s) => s.id === id)[0],
    });
  };

  console.log(editBtnProductObj);

  const handleEditBtn = (id) => {
    setEditBtnState(true);
    setEditBtnObj(allPedidos.filter((p) => p.id === id)[0]);
  };

  return (
    <div className={s.container}>
      <div className={s.searchContainer}>
        <div className={s.sbar}>
          <input type="text" onChange={(e) => handleClientSearchInput(e)} />
          <button>Buscar Pedido</button>
        </div>
        <button onClick={() => setBtnState(true)} id={s.addBtn}>
          Agregar Nuevo Pedido
        </button>
      </div>
      <div className={s.grid}>
        <div className={s.gridTitles}>
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
        {allPedidos.length
          ? allPedidos.map((el, index) => {
              console.log(el);
              return (
                <div key={index} className={s.gridLines}>
                  <p>{el.cliente?.redSocial || "-"}</p>
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
                    {`$${el.subPedidos
                      .filter((sp) => !sp.deleted)
                      .reduce((acc, el) => {
                        return el.total * el.cantidad + acc;
                      }, 0)}` || "-"}
                  </p>
                  <p>{el.seña !== "" ? `$${el.seña}` : "-"}</p>
                  <p>
                    {el.subPedidos.length
                      ? `$${
                          el.subPedidos
                            .filter((sp) => !sp.deleted)
                            .reduce((acc, el) => {
                              return el.total * el.cantidad + acc;
                            }, 0) - el.seña
                        }`
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
                    onClick={() => handleDeleteBtn(el.id)}
                  >
                    Eliminar
                  </button>
                </div>
              );
            })
          : null}
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
                    allClients.map((el, index) => {
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
                    <p>Cantidad</p>
                    <p>Precio</p>
                    <p></p>
                    <p></p>
                    <p></p>
                  </div>
                  {allPedidos
                    .filter((p) => p.id === subInput.idPedido)[0]
                    .subPedidos.filter((sp) => !sp.deleted)
                    .map((el) => {
                      console.log(el);
                      return (
                        <div className={s.productsLine}>
                          <div className={s.txtContainer}>
                            <p>
                              {
                                allProducts.filter(
                                  (p) => p.id === el.productoId
                                )[0].name
                              }
                            </p>
                            <p>{el.cantidad}</p>
                            <p>
                              {`$${
                                allProducts.filter(
                                  (p) => p.id === el.productoId
                                )[0].costs.costoFinal
                              }`}
                            </p>
                          </div>
                          <div className={s.btnContainer}>
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
                              onClick={() => handleDeleteProductBtn(el.id)}
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
                <label>Producto</label>
                <select
                  onChange={(e) => handleEditProductInputChange(e)}
                  defaultValue="Elegir Producto..."
                  name="productoId"
                  value={editBtnProductObj.productoId || ""}
                >
                  <option disabled>Elegir Producto...</option>
                  {allProducts.length &&
                    allProducts.map((el, index) => {
                      return (
                        <option key={index} value={el.id}>
                          {el.name}
                        </option>
                      );
                    })}
                </select>
                <label>Cantidad</label>
                <input
                  onChange={(e) => handleEditProductInputChange(e)}
                  type="number"
                  name="cantidad"
                  value={editBtnProductObj.cantidad || ""}
                />
              </div>
            </form>
            <button onClick={(e) => handleProductEdit(e)}>Editar Pedido</button>
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
                  name="idProducto"
                >
                  <option disabled>Elegir Producto...</option>
                  {allProducts.length &&
                    allProducts.map((el, index) => {
                      return (
                        <option key={index} value={el.id}>
                          {el.name}
                        </option>
                      );
                    })}
                </select>
                <label>Cantidad</label>
                <input
                  onChange={(e) => handleProductoInputChange(e)}
                  type="number"
                  name="cantidad"
                />
                <p>{`Stock: ${
                  allProducts.filter((p) => p.id === subInput.idProducto)[0]
                    ?.stock
                    ? allProducts.filter((p) => p.id === subInput.idProducto)[0]
                        .stock
                    : "..."
                }`}</p>
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
