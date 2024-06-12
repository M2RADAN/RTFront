import { FC } from "react";
import { Link, LinkProps } from "react-router-dom";
import { NAVIGATIONS } from "../const/constants";
import { useAppSelector } from "../services";
import { useHeaderForm } from "../hooks/useHeaderForm";

import clsx from "classnames";

interface IFormLink extends Omit<LinkProps, "to"> {
  route: (typeof NAVIGATIONS)[keyof typeof NAVIGATIONS];
  activeClassName?: string;
}

const FormLink: FC<IFormLink> = ({
  children,
  route,
  activeClassName,
  className,
  ...props
}) => {
  const active = useAppSelector((store) => store.navigation.active);

  return (
    <Link
      to={route.ROUTE}
      className={clsx(
        { [activeClassName || ""]: active === route.ACTION },
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export default FormLink;
