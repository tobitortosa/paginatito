import s from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AportesYGastos from "./components/pages/AportesYGastos";
import Clientes from "./components/pages/Clientes";
import Pedidos from "./components/pages/Pedidos";
import Productos from "./components/pages/Productos";
import ProductoComponent from "./components/ProductoComponent";
import Login from "./components/pages/Login";
import Stock from "./components/pages/Stock";
import StockComponent from "./components/StockComponent";
import StockCantidadComponente from "./components/StockCantidadComponente";

function App() {
  let logged = localStorage.getItem("logged");
  logged = JSON.parse(logged);

  return (
    <div className={s.container}>
      <>
        {logged ? (
          <>
            <NavBar />
            <Routes>
              <Route path="/" element={<Pedidos />} />
              <Route path="/aportesygastos" element={<AportesYGastos />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/pedidos" element={<Pedidos />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/stock" element={<Stock />} />
              <Route
                path="/productos/:productName"
                element={<ProductoComponent />}
              />
              <Route path="/stock/:productName" element={<StockComponent />} />
              <Route
                path="/stock/:productName/:color"
                element={<StockCantidadComponente />}
              />
              <Route path="/login" element={<Login />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        )}
      </>
    </div>
  );
}

export default App;
