import "./Register.css";
import { FC, useEffect, useState } from "react";
export const Register: FC = () => {
  const [email, SetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailD, SetEmailD] = useState(false);
  const [passwordD, SetPasswordD] = useState(false);
  const [emailE, SetEmailE] = useState("пустой email");
  const [passwordE, SetPasswordE] = useState("пустой пароль");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (emailE || passwordE) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailE, passwordE]);
  const emailHandler = (e: any) => {
    SetEmail(e.target.value);
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      SetEmailE("Не настоящий email");
    } else {
      SetEmailE("");
    }
  };

  const passwordHandler = (e: any) => {
    setPassword(e.target.value);

    if (e.target.value < 3) {
      SetPasswordE("Слишком короткий");
    } else {
      SetPasswordE("");
    }
  };

  const blurHandler = (e: any) => {
    switch (e.target.name) {
      case "email":
        SetEmailD(true);
        break;
      case "password":
        SetPasswordD(true);
        break;
    }
  };
  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(email);
    const userData = {
      email,
      password,
    };

    const user = await fetch("mongodb://localhost:3000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .catch((err) => console.error("error", err));
    console.log(user);
  };

  return (
    <div>
      <h2>Регистрация</h2>
      <form className="Form" onSubmit={submitHandler}>
        <label>email</label>
        {emailD && emailE && <div style={{ color: "red" }}>{emailE} </div>}
        <input
          onChange={(e) => emailHandler(e)}
          value={email}
          onBlur={(e) => blurHandler(e)}
          name="email"
          type="text"
          placeholder="Введите ваш email"
        ></input>
        <label>пароль</label>
        {passwordD && passwordE && (
          <div style={{ color: "red" }}>{passwordE} </div>
        )}
        <input
          onChange={(e) => passwordHandler(e)}
          value={password}
          onBlur={(e) => blurHandler(e)}
          name="password"
          type="password"
          placeholder="Пароль"
        ></input>
        <button disabled={!formValid} type="submit">
          Зарегестрироваться
        </button>
      </form>
    </div>
  );
};
