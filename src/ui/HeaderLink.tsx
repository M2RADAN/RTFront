import { FC, forwardRef } from "react";
import { Link, LinkProps } from "react-router-dom";
import { NAVIGATIONS } from "../const/constants";
import { useAppSelector } from "../services";
import { useHeaderForm } from "../hooks/useHeaderForm";

import clsx from "classnames";

interface IHeaderLink extends Omit<LinkProps, "to"> {
  route: (typeof NAVIGATIONS)[keyof typeof NAVIGATIONS];
  activeClassName?: string;
}

const HeaderLink: FC<IHeaderLink> = ({
  children,
  route,
  onClick,
  activeClassName,
  className,
  ...props
}) => {
  const active = useAppSelector((store) => store.navigation.active);
  const setForm = useHeaderForm();

  return (
    <Link
      to={route.ROUTE}
      onClick={(e) => (setForm(route.ACTION), onClick?.(e))}
      className={clsx(
        { [activeClassName || ""]: active === route.ACTION },
        className
      )}
      {...props}
      data-action={route.ACTION}
    >
      {children}
    </Link>
  );
};

export default HeaderLink;
