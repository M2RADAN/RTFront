import { FC, FormEvent } from "react";
import { useForm } from "../../../hooks/useForm";
import { useAppDispatch, useAppSelector } from "../../../services";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/thunk/login";

export const Login: FC = () => {
  const [values, onChange] = useForm({ email: "", password: "" });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector((store) => store.auth.isAuth);
  const error = useAppSelector((store) => store.auth.errorMessage);
  const isPending = useAppSelector((store) => store.auth.isPending);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    dispatch(loginUser(values)).then((res) => {
      // navigate("/");
      console.log(res);
    });
  }
  //
  ///aaaa бля точно боляяяя , ну я пока протестил впринцапе свой код, работает, збс / ok
  //? Если пользователь авторизован, то в AuthLayout его можно переводить
  // на
  // другую страницу
  //? Главное не забудь обернуть Login в AuthLayout
  // хорошо
  return (
    <>
      {error && <p>{error}</p>}
      {isAuth ? <p>авторизован</p> : <p>не авторизован</p>}
      <h2>Авторизация</h2>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="email">email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Введите ваш email"
          required
          onChange={onChange}
          value={values.email}
        />
        <label htmlFor="password">пароль</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Пароль"
          required
          value={values.password}
          onChange={onChange}
        />
        <button type="submit" disabled={isPending}>
          Логин
        </button>
      </form>
    </>
  );
};
