import { FC, PropsWithChildren, useEffect } from "react";
import "./AuthLayout.css";
import { useAppDispatch } from "../services";
export const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(me);
  }, []);

  return <>{children}</>;
};
