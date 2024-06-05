import { ChangeEvent, useState } from "react";

type FormData = { [key: string]: string };

export function useForm<T extends FormData>(
  values: T
): [T, (e: ChangeEvent<HTMLInputElement>) => void] {
  const [state, setState] = useState(values);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setState((prevValue) => {
      return { ...prevValue, [e.target.name]: e.target.value };
    });
  }

  return [state, onChange];
}

/**
 * const [values, onChange] = useForm({email: "", password: "", repeatPassword: ""})
 *
 * return <>
 *    <input onChange={onChange} value={values.email} name="email" />
 *  </>
 */
