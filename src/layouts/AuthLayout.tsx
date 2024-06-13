import { FC, PropsWithChildren, useEffect } from "react";
import "./AuthLayout.css";
import { useAppDispatch } from "../services";
import { getUser } from "../services/thunk/profile";
import { useLocation } from "react-router-dom";
import { useHeaderForm } from "../hooks/useHeaderForm";
import { NAVIGATIONS } from "../const/constants";

export const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const setForm = useHeaderForm();

  useEffect(() => {
    dispatch(getUser());
    const route = Object.values(NAVIGATIONS).find(
      (el) => el.ROUTE === location.pathname
    );
    console.log(location.pathname, route);

    if (route) setForm(route.ACTION);
  }, []);

  return <>{children}</>;
};
