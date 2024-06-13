import { FC, PropsWithChildren } from "react";
import { useAppSelector } from "../services";
import { useNavigate } from "react-router-dom";
import { useHeaderForm } from "../hooks/useHeaderForm";
import { NAVIGATIONS } from "../const/constants";

const UnAuthLayout: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const isAuth = useAppSelector((s) => s.profile.isAuth);
  const setForm = useHeaderForm();

  if (isAuth) {
    navigate("/profile");
    setForm(NAVIGATIONS.PROFILE.ACTION);
  }

  return <>{children}</>;
};

export default UnAuthLayout;
