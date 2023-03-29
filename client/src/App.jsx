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
      <>
        <NavBar />
        <Routes>
          <Route path="/" element={<FacturasDeCompras />} />
          <Route path="/facturas" element={<FacturasDeCompras />} />
          <Route path="/aportesygastos" element={<AportesYGastos />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/stock" element={<Stock />} />
          <Route
            path="/productos/:productoId"
            element={<ProductoComponent />}
          />
          <Route path="/pedidos/:pedidoId" element={<SubPedidoComponent />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
