import { MouseEvent, useEffect, useLayoutEffect, useRef, useState } from "react";

import "./header.css";
import { Pencil } from "lucide-react";
import { Outlet } from "react-router-dom";

import { NAVIGATIONS } from "../../const/constants";

import HeaderLink from "../../ui/HeaderLink";
import { useAppSelector } from "../../services";

const Header = () => {
	const [style, setStyle] = useState<React.CSSProperties>({});
	const isAuth = useAppSelector((s) => s.profile.isAuth);
	const active = useAppSelector((store) => store.navigation.active);

	function openOutlet(el: HTMLElement) {
		const anchor = el;
		const top = (anchor?.offsetTop || 0) + 70;
		const left = (anchor?.offsetLeft || 0) + 36;
		setStyle({ transform: `translate(${left}px, ${top}px)` });
	}

	useEffect(() => {
		const el = document.querySelector(`[data-action="${active}"]`);
		if (active && el) {
			openOutlet(el as HTMLElement);
		}
	}, [active, isAuth]);

	const linkProps = { activeClassName: "header__link" };
	return (
		<div className='Header'>
			<HeaderLink route={NAVIGATIONS.EDIT} {...linkProps}>
				<Pencil width={"30px"} />
			</HeaderLink>
			<HeaderLink route={NAVIGATIONS.LIST} {...linkProps}>
				<Pencil width={"30px"} />
			</HeaderLink>
			<HeaderLink route={NAVIGATIONS.INFO} {...linkProps}>
				<Pencil width={"30px"} />
			</HeaderLink>
			<HeaderLink route={isAuth ? NAVIGATIONS.PROFILE : NAVIGATIONS.LOGIN} {...linkProps}>
				<Pencil width={"30px"} />
			</HeaderLink>
			<div className='form__outlet' style={style}>
				<Outlet />
			</div>
		</div>
	);
};

export default Header;
