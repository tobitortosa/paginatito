import React from "react";
import s from "./Login.module.css";
import { useState } from "react";
import { login, clearLogin } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";

export default function Login() {
  const dispatch = useDispatch();
  const loginObj = useSelector((state) => state.loginObj);
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    name: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setLoading(false);
    dispatch(clearLogin());
  };

  const handleLogin = () => {
    if (input.name.length < 1 || input.password.length < 1) {
      alert("Ingrese su nombre y contraseña");
    } else {
      setLoading(true);
      setTimeout(() => {
        dispatch(login(input));
      }, 3000);
    }
  };

  if (loginObj.logged) {
    localStorage.setItem("logged", true);
    location.reload();
  }

  return (
    <div className={s.container}>
      <div className={s.formContainer}>
        <form>
          <label>Nombre</label>
          <input
            name="name"
            onChange={(e) => handleInputChange(e)}
            type="text"
          />
          <label>Contraseña</label>
          <input
            name="password"
            onChange={(e) => handleInputChange(e)}
            type="password"
          />
        </form>
        <button onClick={() => handleLogin()}>Iniciar Sesion</button>
        {loading && loginObj.logged === undefined ? <Loader /> : null}
        {loginObj.logged === false && (
          <p id={s.in}>Nombre o contraseña incorrecto</p>
        )}
      </div>
    </div>
  );
}
