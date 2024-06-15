import { FC } from "react";
import { IRoute } from "../../services/slices/routeLocal.slice";

import "./card.css";
import { useAppDispatch, useAppSelector } from "../../services";
import { checkoutRoute } from "../../services/thunk/checkoutRoute";

export const Card: FC<{ card: IRoute }> = ({ card }) => {
  const dispatch = useAppDispatch();
  const selectedRouteId = useAppSelector((s) => s.route.selectedRouteId);
  const checkoutRouteInfo = useAppSelector((s) => s.route.checkoutRouteInfo);

  function handleClick() {
    dispatch(checkoutRoute(card._id));
  }

  return (
    <button className="route__card" onClick={handleClick}>
      {selectedRouteId === card._id && (
        <p>{checkoutRouteInfo?.[0].ui_total_duration}</p> // Запускай
      )}
      <p>{card.name}</p>
      <ul>
        {card.points.map((el, i) => (
          <li key={i}>
            <span>{el.lat}</span>
            <span>{el.lon}</span>
          </li>
        ))}
      </ul>
    </button>
  );
};
