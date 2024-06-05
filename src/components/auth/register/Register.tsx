import { FC, FormEvent } from "react";
import "./Register.css";
import { useForm } from "../../../hooks/useForm";
import { useAppDispatch, useAppSelector } from "../../../services";
import { registerUser } from "../../../services/thunk/register";
import { useNavigate } from "react-router-dom";

export const Register: FC = () => {
  const [values, onChange] = useForm({ email: "", password: "" });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const error = useAppSelector((store) => store.auth.errorMessage);
  const isPending = useAppSelector((store) => store.auth.isPending);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    dispatch(registerUser(values)).then((res) => {
      navigate("/login");
    });
  }

  return (
    <>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} className="form">
        <input
          type="email"
          required
          value={values.email}
          name="email"
          onChange={onChange}
        />
        <input
          type="password"
          required
          value={values.password}
          name="password"
          onChange={onChange}
        />
        <button type="submit" disabled={isPending}>
          Register
        </button>
      </form>
    </>
  );
};
