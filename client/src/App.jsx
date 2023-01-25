import { useState } from "react";
import s from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import NavBar from "./components/NavBar";
import FacturasDeCompras from "./components/pages/FacturasDeCompras";
import AportesYGastos from "./components/pages/AportesYGastos";
import Clientes from "./components/pages/Clientes";
import Costos from "./components/pages/Costos";
import DateComponent from "./components/DateComponent";
import PrendaComponent from "./components/PrendaComponent";

function App() {
  return (
    <div className={s.container}>
      <NavBar />
      <Routes>
        <Route path="/" element={<FacturasDeCompras />} />
        <Route path="/Facturas de Compras" element={<FacturasDeCompras />} />
        <Route path="/Aportes y Gastos" element={<AportesYGastos />} />
        <Route path="/Clientes" element={<Clientes />} />
        <Route path="/Costos" element={<Costos />} />
        <Route path="/Costos/:dateId" element={<DateComponent />} />
        <Route path="/Costos/:dateId/:prendaId" element={<PrendaComponent />} />
      </Routes>
    </div>
  );
}

export default App;
