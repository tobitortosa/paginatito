import { useState } from "react";
import s from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import NavBar from "./components/NavBar";
import FacturasDeCompras from "./components/pages/FacturasDeCompras";
import AportesYGastos from "./components/pages/AportesYGastos";
import Clientes from "./components/pages/Clientes";
import Pedidos from "./components/pages/Pedidos";
import SubPedidos from "./components/pages/SubPedidos";
import Productos from "./components/pages/Productos";
import DateComponent from "./components/DateComponent";
import ProductoComponent from "./components/ProductoComponent";
import SubPedidoComponent from "./components/SubPedidoComponent";

function App() {
  return (
    <div className={s.container}>
      <NavBar />
      <Routes>
        <Route path="/" element={<FacturasDeCompras />} />
        <Route path="/Facturas de Compras" element={<FacturasDeCompras />} />
        <Route path="/Aportes y Gastos" element={<AportesYGastos />} />
        <Route path="/Clientes" element={<Clientes />} />
        <Route path="/Pedidos" element={<Pedidos />} />
        <Route path="/Sub Pedidos" element={<SubPedidos />} />
        <Route path="/Productos" element={<Productos />} />
        <Route path="/Productos/:productoId" element={<ProductoComponent />} />
        <Route path="/Pedidos/:pedidoId" element={<SubPedidoComponent />} />
      </Routes>
    </div>
  );
}

export default App;
