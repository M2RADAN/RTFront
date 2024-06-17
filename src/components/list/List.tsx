import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services";
import "./List.css";
import { findRoutes } from "../../services/thunk/findRoutes";

import { Card } from "../../ui/card/card";

const List = () => {
	const { isPending, routes } = useAppSelector((store) => store.routeLocal);
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector((s) => s.profile.isAuth);
	useEffect(() => {
		console.log("call useEffect");
		if (!isPending && routes) {
			console.log("routes", routes);
		}
	});

	function handleClick() {
		// dispatch(saveCard()).then(() => dispatch(getUser()))
		dispatch(findRoutes());
	}
	return (
		<div>
			{routes && (
				<div className='list'>
					{routes.map((el) => (
						<Card card={el} key={el._id} />
					))}
				</div>
			)}
			{isAuth && <button onClick={handleClick}>показать</button>}
		</div>
	);
};

export default List;
