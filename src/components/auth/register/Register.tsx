import { FC, FormEvent } from "react";
import "./Register.css";
import { useForm } from "../../../hooks/useForm";
import { useAppDispatch, useAppSelector } from "../../../services";
import { registerUser } from "../../../services/thunk/register";
import { useNavigate } from "react-router-dom";
import FormLink from "../../../ui/FormLink";
import { NAVIGATIONS } from "../../../const/constants";

export const Register: FC = () => {
  const [values, onChange] = useForm({ email: "", password: "" });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // const error = useAppSelector((store) => store.auth.errorMessage);
  const isPending = useAppSelector((store) => store.auth.isPending);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    dispatch(registerUser(values)).then(() => {
      navigate("/login");
    });
  }

  return (
    <>
      <h2>Регистрация</h2>
      {/* {error && <p>{error}</p>} */}
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="email">пароль</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          value={values.email}
          onChange={onChange}
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
          Register
        </button>
        <FormLink route={NAVIGATIONS.LOGIN}>Есть аккаунт</FormLink>
      </form>
    </>
  );
};
