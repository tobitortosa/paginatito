import { useState } from "react";
import s from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import NavBar from "./components/NavBar";
import FacturasDeCompras from "./components/pages/FacturasDeCompras";
import AportesYGastos from "./components/pages/AportesYGastos";
import Clientes from "./components/pages/Clientes";
import Pedidos from "./components/pages/Pedidos";
import Productos from "./components/pages/Productos";
import DateComponent from "./components/DateComponent";
import ProductoComponent from "./components/ProductoComponent";
import SubPedidoComponent from "./components/SubPedidoComponent";
import Login from "./components/pages/Login";
import Stock from "./components/pages/Stock";

function App() {
  let logged = localStorage.getItem("logged");
  logged = JSON.parse(logged);

  return (
    <div className={s.container}>
      {logged ? (
        <>
          <NavBar />
          <Routes>
            <Route path="/" element={<FacturasDeCompras />} />
            <Route
              path="/Facturas de Compras"
              element={<FacturasDeCompras />}
            />
            <Route path="/Aportes y Gastos" element={<AportesYGastos />} />
            <Route path="/Clientes" element={<Clientes />} />
            <Route path="/Pedidos" element={<Pedidos />} />
            <Route path="/Productos" element={<Productos />} />
            <Route path="/Stock" element={<Stock />} />
            <Route
              path="/Productos/:productoId"
              element={<ProductoComponent />}
            />
            <Route path="/Pedidos/:pedidoId" element={<SubPedidoComponent />} />
            <Route path="/login" element={<Login />} />
          </Routes>{" "}
        </>
      ) : (
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
