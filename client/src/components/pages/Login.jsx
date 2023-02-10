import React from "react";
import s from "./Login.module.css";
import { useState } from "react";
import { login } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Login() {
  const dispatch = useDispatch();
  const loginObj = useSelector((state) => state.loginObj);

  const [input, setInput] = useState({
    name: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  console.log(loginObj);
  console.log(input);
  const handleLogin = () => {
    if (input.name.length < 1 || input.password.length < 1) {
      alert("Ingrese su nombre y contraseña");
    } else {
      dispatch(login(input));
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
            type="text"
          />
        </form>
        <button onClick={() => handleLogin()}>Iniciar Sesion</button>
      </div>
    </div>
  );
}
