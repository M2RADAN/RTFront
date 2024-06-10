import { MouseEvent, useState } from "react";

import "./header.css";
import { Pencil } from "lucide-react";
import { Outlet } from "react-router-dom";

import { NAVIGATIONS } from "../../const/constants";

import HeaderLink from "../../ui/HeaderLink";
import { useAppSelector } from "../../services";

const Header = () => {
  const [style, setStyle] = useState<React.CSSProperties>({});
  const isAuth = useAppSelector((s) => s.auth.isAuth);

  function openOutlet(event: MouseEvent<HTMLAnchorElement>) {
    const anchor = (event.target as HTMLElement).closest("a");
    const top = (anchor?.offsetTop || 0) + 70;
    const left = (anchor?.offsetLeft || 0) + 10;

    setStyle({ transform: `translate(${left}px, ${top}px)` });
  }

  const linkProps = { onClick: openOutlet, activeClassName: "header__link" };
  return (
    <div className="Header">
      <HeaderLink route={NAVIGATIONS.EDIT} {...linkProps}>
        <Pencil width={"30px"} />
      </HeaderLink>
      <HeaderLink route={NAVIGATIONS.LIST} {...linkProps}>
        <Pencil width={"30px"} />
      </HeaderLink>
      <HeaderLink route={NAVIGATIONS.INFO} {...linkProps}>
        <Pencil width={"30px"} />
      </HeaderLink>
      <HeaderLink
        route={isAuth ? NAVIGATIONS.PROFILE : NAVIGATIONS.LOGIN}
        {...linkProps}
      >
        <Pencil width={"30px"} />
      </HeaderLink>
      <div className="form__outlet" style={style}>
        <Outlet />
      </div>
    </div>
  );
};

export default Header;
